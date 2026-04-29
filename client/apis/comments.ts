import request from 'superagent'
import { Comment, CommentData } from '../../models/comment'

const rootUrl = '/api/v1/comments'

export async function getComments(postId: number): Promise<Comment[]> {
  const res = await request.get(`${rootUrl}/${postId}`)
  return res.body
}

export async function addComment(comment: CommentData, token: string): Promise<Comment> {
  const res = await request
    .post(rootUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(comment)
  return res.body
}

export async function updateComment(id: number, content: string, token: string): Promise<Comment> {
  const res = await request
    .patch(`${rootUrl}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ content })
  return res.body
}

export async function deleteComment(id: number, token: string): Promise<void> {
  await request
    .delete(`${rootUrl}/${id}`)
    .set('Authorization', `Bearer ${token}`)
}
