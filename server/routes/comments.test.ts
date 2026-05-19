import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/comments'
import { StatusCodes } from 'http-status-codes'

vi.mock('../db/comments')
vi.mock('../auth0', () => ({
  default: (req: any, res: any, next: any) => {
    req.auth = { sub: 'auth0|testuser' }
    next()
  }
}))

describe('comments routes', () => {
  it('GET /api/v1/comments/:postId returns comments', async () => {
    vi.mocked(db.getCommentsByPostId).mockResolvedValue([{ id: 1, content: 'Test' }] as any)
    const res = await request(server).get('/api/v1/comments/1')
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body[0].content).toBe('Test')
  })

  it('POST /api/v1/comments creates a comment', async () => {
    vi.mocked(db.addComment).mockResolvedValue({ id: 1, content: 'New' } as any)
    const res = await request(server)
      .post('/api/v1/comments')
      .send({ post_id: 1, author: 'Me', author_image: 'img', content: 'New' })
    expect(res.status).toBe(StatusCodes.CREATED)
    expect(res.body.content).toBe('New')
  })

  it('PATCH /api/v1/comments/:id updates a comment', async () => {
    vi.mocked(db.getCommentById).mockResolvedValue({ id: 1, user_id: 'auth0|testuser' } as any)
    vi.mocked(db.updateComment).mockResolvedValue({ id: 1, content: 'Updated' } as any)
    const res = await request(server)
      .patch('/api/v1/comments/1')
      .send({ content: 'Updated' })
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body.content).toBe('Updated')
  })

  it('DELETE /api/v1/comments/:id deletes a comment', async () => {
    vi.mocked(db.getCommentById).mockResolvedValue({ id: 1, user_id: 'auth0|testuser' } as any)
    vi.mocked(db.deleteComment).mockResolvedValue(1)
    const res = await request(server).delete('/api/v1/comments/1')
    expect(res.status).toBe(StatusCodes.NO_CONTENT)
  })
})
