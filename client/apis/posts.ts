import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)
const postsURL = `${rootURL}/posts`

// GET all posts
export async function getPosts() {
  const response = await request.get(postsURL)
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
