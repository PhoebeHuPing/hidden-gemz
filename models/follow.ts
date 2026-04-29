export interface Follow {
  id: number
  follower_id: string
  followed_id: string
  followed_username: string
  followed_image?: string
}

export interface FollowData {
  follower_id: string
  followed_id: string
  followed_username: string
  followed_image?: string
}
