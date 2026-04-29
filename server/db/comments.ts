import { CommentData } from '../../models/comment.ts'
import db from './connection.ts'

// GET comments by post id
export async function getCommentsByPostId(postId: number) {
  return db('comments')
    .where('post_id', postId)
    .select()
    .orderBy('created_at', 'asc')
}

// GET comment by id
export async function getCommentById(id: number) {
  return db('comments').where({ id }).first()
}

// CREATE comment
export async function addComment(data: CommentData) {
  const [id] = await db('comments').insert({
    ...data,
    created_at: new Date().toISOString(),
  })
  return getCommentById(id)
}

// UPDATE comment
export async function updateComment(id: number, content: string) {
  await db('comments').where({ id }).update({ content })
  return getCommentById(id)
}

// DELETE comment
export async function deleteComment(id: number) {
  return db('comments').where({ id }).delete()
}
