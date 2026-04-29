import request from 'superagent'
import { Post, PostData } from '../../models/post'

const rootURL = new URL('/api/v1', document.baseURI)
const postsURL = `${rootURL}/posts`

// GET all posts
export async function getPosts(): Promise<Post[]> {
  const response = await request.get(postsURL)
  return response.body
}

// Create post
export async function addPost(post: PostData, token: string) {
  const response = await request
    .post(postsURL)
    .set('Authorization', `Bearer ${token}`)
    .send(post)
  return response.body
}

// Edit post
export async function editPost(id: number, post: PostData, token: string) {
  const response = await request
    .patch(`${postsURL}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(post)
  return response.body
}

// DELETE post
export async function deletePost(id: number, token: string) {
  const response = await request
    .delete(`${postsURL}/${id}`)
    .set('Authorization', `Bearer ${token}`)

  return response.body
}

// Feature: Favoriting Posts
export async function toggleFavourite({
  id,
  isFavourite,
}: {
  id: number
  isFavourite: boolean
}) {
  const url = `${postsURL}/${id}/favourite`

  const res = await request.patch(url).send({ isFavourite })

  return res.body
}

// Fetch posts created by a specific user
export async function getPostsByCreator(name: string): Promise<Post[]> {
  const response = await request.get(`${postsURL}/user/${name}`)
  return response.body
}

// Fetch all posts marked as favourites for current user
export async function getFavouritePosts(token: string): Promise<Post[]> {
  const response = await request
    .get('/api/v1/favourites/posts')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
