import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment } from '../apis/comments'
import toast from 'react-hot-toast'
import { Comment, CommentData } from '../../models/comment'

interface Props {
  postId: number
}

export default function CommentForm({ postId }: Props) {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (newComment: CommentData) => {
      const token = await getAccessTokenSilently()
      return addComment(newComment, token)
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] })
      const previousComments = queryClient.getQueryData<Comment[]>(['comments', postId])

      if (previousComments) {
        queryClient.setQueryData<Comment[]>(['comments', postId], [
          ...previousComments,
          {
            ...newComment,
            id: Date.now(), // Temporary ID
            created_at: new Date().toISOString(),
          } as Comment,
        ])
      }

      return { previousComments }
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', postId], context.previousComments)
      }
      toast.error('Failed to post comment')
    },
    onSuccess: () => {
      setContent('')
      toast.success('Comment added')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('You must be logged in to comment')
      return
    }

    if (content.trim() === '') return

    const commentData: CommentData = {
      post_id: postId,
      user_id: user?.sub || '',
      author: user?.name || user?.nickname || 'Anonymous',
      author_image: user?.picture || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      content: content.trim(),
    }

    addMutation.mutate(commentData)
  }

  if (!isAuthenticated) {
    return (
      <div className="py-4 border-t mt-6">
        <p className="text-sm text-gray-500 italic text-center">
          Please log in to leave a comment.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="py-4 border-t mt-6">
      <div className="flex gap-3">
        <img
          src={user?.picture}
          alt={user?.name}
          className="h-10 w-10 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            maxLength={200}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all resize-none"
            rows={2}
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-xs ${content.length >= 190 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
              {content.length}/200
            </span>
            <button
              type="submit"
              disabled={addMutation.isPending || content.trim() === ''}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
