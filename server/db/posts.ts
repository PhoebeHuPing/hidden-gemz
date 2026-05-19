import { PostData } from '../../models/post.ts'
import db from './connection.ts'

// GET all posts
export async function getAllPosts() {
  return db('post')
    .select('post.*')
    .select(
      db('favourites')
        .count('id')
        .whereRaw('favourites.post_id = post.id')
        .as('favourite_count'),
    )
    .orderBy('post.created_at', 'desc')
}

// GET post by id
export async function getPostById(id: number | string) {
  return db('post')
    .where('post.id', id)
    .select('post.*')
    .select(
      db('favourites')
        .count('id')
        .whereRaw('favourites.post_id = post.id')
        .as('favourite_count'),
    )
    .first()
}

// CREATE post
export async function addPost(data: PostData) {
  const [id] = await db('post').insert(data).returning('id')
  return typeof id === 'object' ? id.id : id
}

// UPDATE post
export async function updatePost(id: number, data: PostData) {
  return db('post').where({ id }).update(data)
}

// DELETE post by id
export async function deletePost(id: number | string) {
  return db('post').where({ id }).delete()
}

// GET posts by creator name
export async function getPostsByCreator(name: string) {
  return db('post')
    .where({ created_by: name })
    .select('post.*')
    .select(
      db('favourites')
        .count('id')
        .whereRaw('favourites.post_id = post.id')
        .as('favourite_count'),
    )
    .orderBy('post.created_at', 'desc')
}
