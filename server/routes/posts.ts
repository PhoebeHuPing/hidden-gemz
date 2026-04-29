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
    console.error(error)
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
  const userId = req.auth?.sub
  if (!userId) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const id = Number(req.params.id)
    const postDataForDb = req.body

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }

    const post = await db.getPostById(id)
    if (!post) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    if (post.user_id !== userId) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You are not authorized to edit this gem' })
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
  const userId = req.auth?.sub
  if (!userId) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' })
    }

    const post = await db.getPostById(id)
    if (!post) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    if (post.user_id !== userId) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You are not authorized to remove this gem' })
    }

    await db.deletePost(id)

    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
})

// GET posts by creator name
router.get('/user/:name', async (req, res) => {
  try {
    const posts = await db.getPostsByCreator(req.params.name)
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user posts' })
  }
})

export default router
