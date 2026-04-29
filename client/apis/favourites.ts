import request from 'superagent'

const rootUrl = '/api/v1/favourites'

export async function getFavourites(token: string): Promise<number[]> {
  const res = await request
    .get(rootUrl)
    .set('Authorization', `Bearer ${token}`)
  return res.body
}

export async function toggleFavourite(postId: number, token: string): Promise<{ isFavourite: boolean }> {
  const res = await request
    .post(`${rootUrl}/${postId}`)
    .set('Authorization', `Bearer ${token}`)
  return res.body
}
