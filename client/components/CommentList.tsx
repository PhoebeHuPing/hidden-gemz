import { useQuery } from '@tanstack/react-query'
import { getComments } from '../apis/comments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

import Loading from './Loading'

interface Props {
  postId: number
}

export default function CommentList({ postId }: Props) {
  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  })

  if (isLoading) return <Loading />
  if (error) return <div className="py-4 text-center text-sm text-red-500">Error loading comments.</div>

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-bold mb-4">Comments ({comments?.length || 0})</h3>
      
      <div className="space-y-1">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      <CommentForm postId={postId} />
    </div>
  )
}
