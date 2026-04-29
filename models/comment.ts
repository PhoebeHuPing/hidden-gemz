export interface CommentData {
  post_id: number
  user_id: string
  author: string
  author_image: string
  content: string
  created_at?: string
}

export interface Comment extends CommentData {
  id: number
}
