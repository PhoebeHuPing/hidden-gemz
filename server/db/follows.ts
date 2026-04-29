import db from './connection.ts'
import { FollowData } from '../../models/follow.ts'

export async function getFollows(followerId: string) {
  return db('follows').where('follower_id', followerId).select('*')
}

export async function addFollow(data: FollowData) {
  return db('follows').insert(data)
}

export async function removeFollow(followerId: string, followedId: string) {
  return db('follows')
    .where({ follower_id: followerId, followed_id: followedId })
    .delete()
}

export async function isFollowing(followerId: string, followedId: string) {
  const follow = await db('follows')
    .where({ follower_id: followerId, followed_id: followedId })
    .first()
  return !!follow
}
