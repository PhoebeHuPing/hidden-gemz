import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import * as db from '../db/favourites.ts'

const router = Router()

// GET /api/v1/favourites
// Get all favourite post IDs for the authenticated user
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub

  if (!userId) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  try {
    const favourites = await db.getFavourites(userId)
    // Return just the post_id array
    res.json(favourites.map((f) => f.post_id))
  } catch (error) {
    console.error('Error in GET /api/v1/favourites:', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to fetch favourites',
      details: error instanceof Error ? error.message : String(error),
    })
  }
})

// GET /api/v1/favourites/posts
// Get all favourite post objects for the authenticated user
router.get('/posts', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  if (!userId) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  try {
    const posts = await db.getFavouritePosts(userId)
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// POST /api/v1/favourites/:postId
// Toggle favourite status
router.post('/:postId', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  const postId = Number(req.params.postId)

  if (!userId) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  if (isNaN(postId)) {
    return res.sendStatus(StatusCodes.BAD_REQUEST)
  }

  try {
    const existing = await db.getFavourites(userId)
    const isFavourite = existing.some((f) => f.post_id === postId)

    if (isFavourite) {
      await db.removeFavourite(userId, postId)
      res.json({ isFavourite: false })
    } else {
      await db.addFavourite(userId, postId)
      res.json({ isFavourite: true })
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
