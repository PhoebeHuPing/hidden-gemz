import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/comments.ts'

const router = Router()

// GET comments by post_id
router.get('/:postId', async (req, res) => {
  try {
    const postId = Number(req.params.postId)
    if (isNaN(postId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid Post ID' })
    }
    const comments = await db.getCommentsByPostId(postId)
    res.json(comments)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
  }
})

// CREATE comment
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  if (!userId) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  try {
    const { post_id, author, author_image, content } = req.body
    if (!post_id || !content) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' })
    }

    if (content.length > 200) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Comment too long (max 200 characters)' })
    }

    const newComment = await db.addComment({
      post_id,
      user_id: userId,
      author,
      author_image,
      content
    })

    res.status(StatusCodes.CREATED).json(newComment)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
  }
})

// UPDATE comment
router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  const id = Number(req.params.id)

  if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED)
  if (isNaN(id)) return res.sendStatus(StatusCodes.BAD_REQUEST)

  try {
    const comment = await db.getCommentById(id)
    if (!comment) return res.sendStatus(StatusCodes.NOT_FOUND)
    
    if (comment.user_id !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not authorized to edit this comment" })
    }

    const { content } = req.body
    if (content && content.length > 200) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Comment too long (max 200 characters)' })
    }

    const updatedComment = await db.updateComment(id, content)
    res.json(updatedComment)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
  }
})

// DELETE comment
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  const id = Number(req.params.id)

  if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED)
  if (isNaN(id)) return res.sendStatus(StatusCodes.BAD_REQUEST)

  try {
    const comment = await db.getCommentById(id)
    if (!comment) return res.sendStatus(StatusCodes.NOT_FOUND)

    if (comment.user_id !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not authorized to delete this comment" })
    }

    await db.deleteComment(id)
    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
  }
})

export default router
