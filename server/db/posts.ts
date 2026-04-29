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
export async function addPost(data: { owner: string; name: string }) {
  const [id] = await db('post').insert(data)
  return id
}

// UPDATE favourite
export async function updateFavourite(id: number, isFavourite: boolean) {
  await db('post').where({ id }).update({ isFavourite })

  const updatedPost = await db('post').where({ id }).first()
  return updatedPost
}
