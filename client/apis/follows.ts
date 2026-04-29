import request from 'superagent'

const rootUrl = '/api/v1/follows'

export async function getFollows(token: string) {
  const response = await request
    .get(rootUrl)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function getFollowStatus(followedId: string, token: string) {
  const response = await request
    .get(`${rootUrl}/${followedId}/status`)
    .set('Authorization', `Bearer ${token}`)
  return response.body.isFollowing
}

export async function toggleFollow(
  data: {
    followed_id: string
    followed_username: string
    followed_image?: string
  },
  token: string,
) {
  const response = await request
    .post(rootUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
  return response.body
}

export async function unfollowUser(followedId: string, token: string) {
  await request
    .delete(`${rootUrl}/${followedId}`)
    .set('Authorization', `Bearer ${token}`)
}
