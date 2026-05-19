import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import db from './connection'
import * as comments from './comments'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('comments database functions', () => {
  let firstId: number

  beforeEach(async () => {
    await db.seed.run()
    const comment = await db('comments').first()
    firstId = comment.id
  })

  it('getCommentsByPostId returns comments for a post', async () => {
    const comment = await db('comments').where({ id: firstId }).first()
    const postComments = await comments.getCommentsByPostId(comment.post_id)
    expect(postComments.length).toBeGreaterThan(0)
    expect(postComments.some(c => c.id === firstId)).toBe(true)
  })

  it('getCommentById returns a single comment', async () => {
    const comment = await comments.getCommentById(firstId)
    expect(comment).toBeDefined()
    expect(comment?.id).toBe(firstId)
  })

  it('addComment creates a new comment', async () => {
    const newComment = {
      post_id: 1,
      user_id: 'auth0|test',
      author: 'Tester',
      author_image: 'img',
      content: 'Hello'
    }
    const created = await comments.addComment(newComment)
    expect(created?.content).toBe('Hello')
    expect(created?.id).toBeDefined()
  })

  it('updateComment updates comment content', async () => {
    await comments.updateComment(firstId, 'Updated Content')
    const updated = await comments.getCommentById(firstId)
    expect(updated).toBeDefined()
    expect(updated?.content).toBe('Updated Content')
  })

  it('deleteComment removes a comment', async () => {
    await comments.deleteComment(firstId)
    const deleted = await comments.getCommentById(firstId)
    expect(deleted).toBeUndefined()
  })
})
