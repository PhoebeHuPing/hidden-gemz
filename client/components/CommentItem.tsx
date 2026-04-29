import { useState } from 'react'
import { Comment } from '../../models/comment'
import { formatDistanceToNow } from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateComment, deleteComment } from '../apis/comments'
import toast from 'react-hot-toast'
import { FaPen, FaTrash, FaCheck, FaXmark } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

interface Props {
  comment: Comment
}

export default function CommentItem({ comment }: Props) {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const isAuthor = isAuthenticated && user?.sub === comment.user_id

  const handleAuthorClick = () => {
    navigate(`/user/${comment.author}`)
  }

  const updateMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      const token = await getAccessTokenSilently()
      return updateComment(id, content, token)
    },
    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', comment.post_id] })
      const previousComments = queryClient.getQueryData<Comment[]>(['comments', comment.post_id])

      if (previousComments) {
        queryClient.setQueryData<Comment[]>(
          ['comments', comment.post_id],
          previousComments.map((c) => (c.id === id ? { ...c, content } : c)),
        )
      }

      return { previousComments }
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', comment.post_id], context.previousComments)
      }
      toast.error('Failed to update comment')
    },
    onSuccess: () => {
      setIsEditing(false)
      toast.success('Comment updated')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', comment.post_id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = await getAccessTokenSilently()
      return deleteComment(id, token)
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['comments', comment.post_id] })
      const previousComments = queryClient.getQueryData<Comment[]>(['comments', comment.post_id])

      if (previousComments) {
        queryClient.setQueryData<Comment[]>(
          ['comments', comment.post_id],
          previousComments.filter((c) => c.id !== id),
        )
      }

      return { previousComments }
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', comment.post_id], context.previousComments)
      }
      toast.error('Failed to remove comment')
    },
    onSuccess: () => {
      toast.success('Comment removed')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', comment.post_id] })
    },
  })

  const handleUpdate = () => {
    if (editContent.trim() === '') return
    updateMutation.mutate({ id: comment.id, content: editContent })
  }

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-sm">Delete this comment?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id)
                deleteMutation.mutate(comment.id)
              }}
              className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: 'top-center',
      },
    )
  }

  return (
    <div className="flex gap-3 py-4 border-b last:border-0">
      <img
        src={comment.author_image}
        alt={comment.author}
        className="h-10 w-10 rounded-full object-cover shrink-0 cursor-pointer transition hover:opacity-80"
        onClick={handleAuthorClick}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-sm cursor-pointer hover:text-teal-500 hover:underline"
              onClick={handleAuthorClick}
            >
              {comment.author}
            </span>
            <span className="text-xs text-gray-500">
              {comment.created_at && formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          {isAuthor && !isEditing && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-teal-500 transition-colors"
                aria-label="Edit comment"
              >
                <FaPen size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete comment"
                disabled={deleteMutation.isPending}
              >
                <FaTrash size={14} />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              maxLength={200}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
              rows={2}
            />
            <div className="flex justify-between items-center mt-1">
              <span className={`text-xs ${editContent.length >= 190 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                {editContent.length}/200
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditContent(comment.content)
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <FaXmark size={18} />
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={updateMutation.isPending}
                  className="p-1 text-teal-600 hover:text-teal-700"
                >
                  <FaCheck size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700 mt-1 break-words whitespace-pre-wrap">{comment.content}</p>
        )}
      </div>
    </div>
  )
}
