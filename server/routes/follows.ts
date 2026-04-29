import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import * as db from '../db/follows.ts'

const router = Router()

// GET /api/v1/follows
// Get all users the authenticated user follows
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

  try {
    const follows = await db.getFollows(userId)
    res.json(follows)
  } catch (error) {
    console.error(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// GET /api/v1/follows/:followedId/status
// Check if the authenticated user is following a specific user
router.get('/:followedId/status', checkJwt, async (req: JwtRequest, res) => {
  const followerId = req.auth?.sub
  const followedId = req.params.followedId

  if (!followerId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

  try {
    const isFollowing = await db.isFollowing(followerId, followedId)
    res.json({ isFollowing })
  } catch (error) {
    console.error(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// POST /api/v1/follows
// Follow or unfollow a user
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const followerId = req.auth?.sub
  if (!followerId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

  const { followed_id, followed_username, followed_image } = req.body

  if (!followed_id || !followed_username) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required data' })
  }

  try {
    const existing = await db.isFollowing(followerId, followed_id)

    if (existing) {
      await db.removeFollow(followerId, followed_id)
      res.json({ isFollowing: false })
    } else {
      await db.addFollow({
        follower_id: followerId,
        followed_id,
        followed_username,
        followed_image
      })
      res.json({ isFollowing: true })
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// DELETE /api/v1/follows/:followedId
// Unfollow a user
router.delete('/:followedId', checkJwt, async (req: JwtRequest, res) => {
  const followerId = req.auth?.sub
  const followedId = req.params.followedId

  if (!followerId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

  try {
    await db.removeFollow(followerId, followedId)
    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (error) {
    console.error(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
