import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'superagent'
import * as favourites from './favourites'

vi.mock('superagent')

describe('favourites api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getFavourites returns favourite IDs', async () => {
    vi.mocked(request.get).mockReturnValue({
      set: vi.fn().mockReturnThis(),
      body: [1, 2, 3]
    } as any)

    const result = await favourites.getFavourites('token')
    expect(result).toEqual([1, 2, 3])
  })

  it('toggleFavourite toggles and returns status', async () => {
    vi.mocked(request.post).mockReturnValue({
      set: vi.fn().mockReturnThis(),
      body: { isFavourite: true }
    } as any)

    const result = await favourites.toggleFavourite(1, 'token')
    expect(result).toEqual({ isFavourite: true })
  })
})
