import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import db from './connection'
import * as favourites from './favourites'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('favourites database functions', () => {
  it('getFavourites returns post_ids for a user', async () => {
    // In seeds, nobody has favourites yet, so we add one
    await favourites.addFavourite('auth0|testuser', 1)
    const favs = await favourites.getFavourites('auth0|testuser')
    expect(favs).toHaveLength(1)
    expect(favs[0].post_id).toBe(1)
  })

  it('addFavourite adds a favourite', async () => {
    await favourites.addFavourite('auth0|user2', 5)
    const favs = await favourites.getFavourites('auth0|user2')
    expect(favs.some(f => f.post_id === 5)).toBe(true)
  })

  it('removeFavourite removes a favourite', async () => {
    await favourites.addFavourite('auth0|user3', 2)
    await favourites.removeFavourite('auth0|user3', 2)
    const favs = await favourites.getFavourites('auth0|user3')
    expect(favs.some(f => f.post_id === 2)).toBe(false)
  })

  it('getFavouritePosts returns full post objects with counts', async () => {
    await favourites.addFavourite('auth0|testuser', 1)
    await favourites.addFavourite('auth0|otheruser', 1) // 2 people fav post 1
    
    const posts = await favourites.getFavouritePosts('auth0|testuser')
    expect(posts).toHaveLength(1)
    expect(posts[0].id).toBe(1)
    expect(Number(posts[0].favourite_count)).toBe(2)
  })
})
