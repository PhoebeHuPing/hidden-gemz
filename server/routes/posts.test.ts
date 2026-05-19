import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/posts'
import { StatusCodes } from 'http-status-codes'

vi.mock('../db/posts')
vi.mock('../auth0', () => ({
  default: (req: any, res: any, next: any) => {
    req.auth = { sub: 'auth0|testuser' }
    next()
  }
}))

describe('posts routes', () => {
  it('GET /api/v1/posts returns all posts', async () => {
    vi.mocked(db.getAllPosts).mockResolvedValue([
      { id: 1, business_name: 'Test', favourite_count: 5 }
    ] as any)

    const res = await request(server).get('/api/v1/posts')
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].business_name).toBe('Test')
  })

  it('GET /api/v1/posts/:id returns a single post', async () => {
    vi.mocked(db.getPostById).mockResolvedValue({ id: 1, business_name: 'Test' } as any)

    const res = await request(server).get('/api/v1/posts/1')
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body.business_name).toBe('Test')
  })

  it('POST /api/v1/posts creates a new post', async () => {
    vi.mocked(db.addPost).mockResolvedValue(123)

    const res = await request(server)
      .post('/api/v1/posts')
      .send({ business_name: 'New', created_by: 'User' })

    expect(res.status).toBe(StatusCodes.CREATED)
    expect(res.headers.location).toContain('/123')
  })

  it('POST /api/v1/posts returns 400 if data is missing', async () => {
    const res = await request(server)
      .post('/api/v1/posts')
      .send({ business_name: '' })

    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('PATCH /api/v1/posts/:id updates a post if user is authorized', async () => {
    vi.mocked(db.getPostById).mockResolvedValue({ id: 1, user_id: 'auth0|testuser' } as any)
    vi.mocked(db.updatePost).mockResolvedValue(1)

    const res = await request(server)
      .patch('/api/v1/posts/1')
      .send({ business_name: 'Updated', created_by: 'User' })

    expect(res.status).toBe(StatusCodes.OK)
  })

  it('PATCH /api/v1/posts/:id returns 403 if user is not the owner', async () => {
    vi.mocked(db.getPostById).mockResolvedValue({ id: 1, user_id: 'auth0|otheruser' } as any)

    const res = await request(server)
      .patch('/api/v1/posts/1')
      .send({ business_name: 'Updated', created_by: 'User' })

    expect(res.status).toBe(StatusCodes.FORBIDDEN)
  })

  it('DELETE /api/v1/posts/:id removes a post if user is authorized', async () => {
    vi.mocked(db.getPostById).mockResolvedValue({ id: 1, user_id: 'auth0|testuser' } as any)
    vi.mocked(db.deletePost).mockResolvedValue(1)

    const res = await request(server).delete('/api/v1/posts/1')
    expect(res.status).toBe(StatusCodes.NO_CONTENT)
  })
})
