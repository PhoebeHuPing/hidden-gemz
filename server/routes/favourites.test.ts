import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/favourites'
import { StatusCodes } from 'http-status-codes'

vi.mock('../db/favourites')
vi.mock('../auth0', () => ({
  default: (req: any, res: any, next: any) => {
    req.auth = { sub: 'auth0|testuser' }
    next()
  }
}))

describe('favourites routes', () => {
  it('GET /api/v1/favourites returns post_id array', async () => {
    vi.mocked(db.getFavourites).mockResolvedValue([{ post_id: 1 }, { post_id: 2 }] as any)
    
    const res = await request(server).get('/api/v1/favourites')
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toEqual([1, 2])
  })

  it('GET /api/v1/favourites/posts returns favourite post objects', async () => {
    vi.mocked(db.getFavouritePosts).mockResolvedValue([{ id: 1, business_name: 'Fav' }] as any)
    
    const res = await request(server).get('/api/v1/favourites/posts')
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body[0].business_name).toBe('Fav')
  })

  it('POST /api/v1/favourites/:postId toggles favourite status (adds)', async () => {
    vi.mocked(db.getFavourites).mockResolvedValue([])
    vi.mocked(db.addFavourite).mockResolvedValue([1] as any)
    
    const res = await request(server).post('/api/v1/favourites/1')
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body.isFavourite).toBe(true)
    expect(db.addFavourite).toHaveBeenCalledWith('auth0|testuser', 1)
  })

  it('POST /api/v1/favourites/:postId toggles favourite status (removes)', async () => {
    vi.mocked(db.getFavourites).mockResolvedValue([{ post_id: 1 }] as any)
    vi.mocked(db.removeFavourite).mockResolvedValue(1)
    
    const res = await request(server).post('/api/v1/favourites/1')
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body.isFavourite).toBe(false)
    expect(db.removeFavourite).toHaveBeenCalledWith('auth0|testuser', 1)
  })
})
