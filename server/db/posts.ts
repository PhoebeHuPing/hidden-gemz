import { PostData } from '../../models/post.ts'
import db from './connection.ts'

// GET all posts
export async function getAllPosts() {
  const posts = await db('post')
    .leftJoin('favourites', 'post.id', 'favourites.post_id')
    .select('post.*')
    .count('favourites.id as favourite_count')
    .groupBy('post.id')
    .orderBy('post.created_at', 'desc')
  return posts
}

// GET post by id
export async function getPostById(id: number | string) {
  const post = await db('post')
    .leftJoin('favourites', 'post.id', 'favourites.post_id')
    .where('post.id', id)
    .select('post.*')
    .count('favourites.id as favourite_count')
    .groupBy('post.id')
    .first()
  return post
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
    .leftJoin('favourites', 'post.id', 'favourites.post_id')
    .where({ created_by: name })
    .select('post.*')
    .count('favourites.id as favourite_count')
    .groupBy('post.id')
    .orderBy('post.created_at', 'desc')
}
