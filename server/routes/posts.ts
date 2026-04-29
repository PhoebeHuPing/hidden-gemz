import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/posts.ts'

const router = Router()

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPosts()

    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET post by id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await db.getPostById(req.params.id)
    res.json(post)
  } catch (err) {
    next(err)
  }
})

// CREATE post
router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const postDataForDb = req.body

    if (!postDataForDb.business_name || !postDataForDb.created_by) {
      return res
        .status(400)
        .json({ message: 'Missing business name or creator ID' })
    }

    const id = await db.addPost(postDataForDb)

    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

// UPDATE post
router.patch('/:id', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const id = Number(req.params.id)
    const postDataForDb = req.body

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }

    if (!postDataForDb.business_name || !postDataForDb.created_by) {
      return res
        .status(400)
        .json({ message: 'Missing business name or creator ID' })
    }

    await db.updatePost(id, postDataForDb)

    res.sendStatus(StatusCodes.OK)
  } catch (err) {
    next(err)
  }
})

// DELETE post
router.delete('/:id', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }

    // You might want to check if the user is the creator before deleting.
    // For now, let's just delete by ID.
    await db.deletePost(id)

    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
})

/**
 * PATCH /api/v1/posts/:id/favourite
 * Toggle the favourite status of a post
 */
router.patch('/:id/favourite', async (req, res) => {
  try {
    const postId = Number(req.params.id)
    const { isFavourite } = req.body

    if (isNaN(postId) || typeof isFavourite !== 'boolean') {
      return res
        .status(400)
        .json({ error: 'Invalid post ID or favourite status' })
    }

    const updatedPost = await db.updateFavourite(postId, isFavourite)

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.status(200).json(updatedPost)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Unknown error')
    }

    res.status(500).json({
      error: 'Something went wrong.',
    })
  }
})

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  try {
    await db.deletePost(id)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete this post' })
  }
})

export default router
