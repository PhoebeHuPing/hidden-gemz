import { PostData } from '../../models/post.ts'
import db from './connection.ts'

// GET all posts
export async function getAllPosts() {
  const post = await db('post').select()
  return post
}

// GET post by id
export async function getPostById(id: number | string) {
  const post = await db('post').where({ id }).first()
  return post
}

// CREATE post
export async function addPost(data: PostData) {
  const [id] = await db('post').insert(data)
  return id
}

// UPDATE post
export async function updatePost(id: number, data: PostData) {
  return db('post').where({ id }).update(data)
}

// DELETE post by id
export async function deletePost(id: number | string) {
  return db('post').where({ id }).delete()
}

// UPDATE favourite
export async function updateFavourite(id: number, isFavourite: boolean) {
  await db('post').where({ id }).update({ favourite: isFavourite })

  const updatedPost = await db('post').where({ id }).first()
  return updatedPost
}

// GET posts by creator name
export async function getPostsByCreator(name: string) {
  return db('post').where({ created_by: name }).select()
}

// GET all posts marked as favorites
export async function getFavouritePosts() {
  return db('post').where({ favourite: true }).select()
}
