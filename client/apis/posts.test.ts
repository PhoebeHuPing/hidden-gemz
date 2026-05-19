import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'superagent'
import * as posts from './posts'

vi.mock('superagent')

describe('posts api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getPosts returns all posts', async () => {
    const mockPosts = [{ id: 1, business_name: 'Test' }]
    vi.mocked(request.get).mockReturnValue({
      body: mockPosts
    } as any)

    const result = await posts.getPosts()
    expect(result).toEqual(mockPosts)
    expect(request.get).toHaveBeenCalledWith(expect.stringContaining('/api/v1/posts'))
  })

  it('addPost sends a post and returns the result', async () => {
    const mockPost = { business_name: 'New' }
    vi.mocked(request.post).mockReturnValue({
      set: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnValue({ body: { id: 1 } })
    } as any)

    const result = await posts.addPost(mockPost as any, 'token')
    expect(result).toEqual({ id: 1 })
  })
})
