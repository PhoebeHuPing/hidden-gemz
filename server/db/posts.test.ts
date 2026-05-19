import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import db from './connection'
import * as posts from './posts'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('posts database functions', () => {
  it('getAllPosts returns all posts with favourite counts', async () => {
    const allPosts = await posts.getAllPosts()
    expect(allPosts).toHaveLength(10) // Based on seeds
    expect(allPosts[0]).toHaveProperty('favourite_count')
    expect(allPosts[0]).toHaveProperty('business_name')
  })

  it('getPostById returns a single post', async () => {
    const post = await posts.getPostById(1)
    expect(post?.business_name).toBe('Midnight Espresso')
    expect(post?.id).toBe(1)
  })

  it('addPost creates a new post', async () => {
    const newPost = {
      business_name: 'Test Business',
      business_street: '123 Test St',
      business_suburb: 'Test Suburb',
      business_city: 'Test City',
      user_id: 'auth0|testuser',
      created_by: 'Test User',
      venue_type: 'Cafe',
    }
    const id = await posts.addPost(newPost as any)
    expect(id).toBeDefined()
    
    const fetched = await posts.getPostById(id)
    expect(fetched?.business_name).toBe('Test Business')
  })

  it('updatePost updates an existing post', async () => {
    const updateData = {
      business_name: 'Updated Name',
      created_by: 'Alex Smith',
    }
    await posts.updatePost(1, updateData as any)
    const updated = await posts.getPostById(1)
    expect(updated?.business_name).toBe('Updated Name')
  })

  it('deletePost removes a post', async () => {
    await posts.deletePost(1)
    const deleted = await posts.getPostById(1)
    expect(deleted).toBeUndefined()
  })
})
