import { FaPenToSquare, FaTrash } from 'react-icons/fa6'
import AmmenitiesIcon from './AmmenitiesIcon'
import Favourite from './Favourite'
import { useNavigate } from 'react-router'
import { Post } from '../../models/post'
import { formatDistanceToNow } from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../apis/posts'
import toast from 'react-hot-toast'
import EditPostForm from './EditPostForm'
import CommentList from './CommentList'
import GoogleMap from './GoogleMap'

type Props = {
  post: Post
  isFavourite: boolean
}

function PostCard({ post, isFavourite }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const queryClient = useQueryClient()
  const auth = useAuth0()
  const { getAccessTokenSilently } = auth
  const user = auth.user
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  function handleAuthorClick(event: React.MouseEvent) {
    event.stopPropagation()
    navigate(`/user/${post.created_by}`)
  }

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = await getAccessTokenSilently()
      await deletePost(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Hidden gem removed successfully')
    },
    onError: () => {
      toast.error('Failed to remove the hidden gem')
    },
  })

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()

    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Are you sure you want to delete this?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id)
                deleteMutation.mutate(post.id)
              }}
              className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
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
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        className="relative block w-full cursor-pointer rounded-xl border-4 border-transparent p-6 text-left shadow-xl transition ease-linear hover:scale-105 hover:border-4 hover:border-teal-700 focus:border-teal-700 focus:outline-none bg-white"
      >
        <div>
          {/* Post Image & CRUD Icons - Edit & Delete*/}
          {user?.sub === post.user_id && (
            <>
              <button
                aria-label="Edit post"
                className="absolute left-12 top-12 z-10 flex items-center justify-center rounded-full bg-teal-700 p-4 transition-transform hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditOpen(true)
                }}
              >
                <FaPenToSquare className="text-2xl text-white" />
              </button>
              <button
                aria-label="Delete post"
                onClick={handleDelete}
                className="absolute right-12 top-12 z-10 flex items-center justify-center rounded-full bg-teal-700 p-4 transition-transform hover:scale-110"
                disabled={deleteMutation.isPending}
              >
                <FaTrash className="text-2xl text-white" />
              </button>
            </>
          )}

          {/* Post Image */}
          <div className="relative mb-6">
            <img
              src={post.image_url}
              alt={post.business_name + ' avatar'}
              className="h-[400px] w-full rounded-xl object-cover"
            />
            <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-1">
              <Favourite post={post} isFavourite={isFavourite} />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 shadow-md backdrop-blur-sm">
                <span className="text-sm font-bold text-white">
                  {post.favourite_count}
                </span>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{post.business_name}</h2>
            <h2 className="font-bold text-teal-700">{post.business_suburb}</h2>
          </div>
          <h2 className="text-left font-bold capitalize text-teal-700">
            {post.venue_type}
          </h2>
          <p className="text-left text-gray-800">{post.review}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.split(',').map((tag) => (
              <span
                key={tag.trim()}
                className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-900"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <div className="my-6 flex items-center justify-between">
            <div className="flex items-center gap-2 transition hover:text-teal-800">
              <button onClick={handleAuthorClick}>
                <img
                  src={post.created_by_image}
                  alt={post.created_by + ' avatar'}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </button>
              <h2
                className="cursor-pointer font-semibold text-gray-900 hover:underline hover:text-teal-700"
                onClick={handleAuthorClick}
              >
                {post.created_by}
              </h2>
            </div>

            <p className="text-sm font-medium text-gray-700">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-scroll max-h-[90vh] w-full max-w-3xl rounded-xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={post.image_url}
                alt={`Photo of ${post.business_name}`}
                className="mb-6 h-80 w-full rounded-xl object-cover"
              />

              <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-1">
                <Favourite post={post} isFavourite={isFavourite} />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 shadow-md backdrop-blur-sm">
                  <span className="text-sm font-bold text-white">
                    {post.favourite_count}
                  </span>
                </div>
              </div>

              <button
                className="absolute right-[12px] top-[12px] rounded-lg bg-teal-700 px-4 py-2 text-white font-bold"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold text-gray-900">{post.business_name}</h2>
              <p className="text-gray-800 font-semibold">
                {post.business_street}, {post.business_suburb},{' '}
                {post.business_city}
              </p>
            </div>

            <h2 className="mb-3 font-bold capitalize text-teal-700">
              {post.venue_type}
            </h2>

            <div className="mb-3 mt-3 flex flex-wrap gap-2">
              {post.tags.split(',').map((tag) => (
                <span
                  key={tag.trim()}
                  className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-900"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            <p className="mb-4 text-lg text-gray-800">{post.review}</p>

            <GoogleMap
              street={post.business_street}
              suburb={post.business_suburb}
              city={post.business_city}
            />

            <div className="mt-3">
              <h2 className="text-center text-xl font-bold uppercase text-gray-900">
                Ammenities Available
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] justify-items-center gap-6 p-6">
                {!!post.pet_friendly && <AmmenitiesIcon type="pet" />}
                {!!post.kid_friendly && <AmmenitiesIcon type="kids" />}
                {!!post.vegan && <AmmenitiesIcon type="vegan" />}
                {!!post.gluten_free && <AmmenitiesIcon type="gluten" />}
                {!!post.smoking && <AmmenitiesIcon type="smoking" />}
                {!!post.outdoor && <AmmenitiesIcon type="outdoor" />}
                {!!post.indoor && <AmmenitiesIcon type="indoor" />}
                {!!post.parking && <AmmenitiesIcon type="parking" />}
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <img
                  src={post.created_by_image}
                  alt={`${post.created_by}'s avatar`}
                  className="h-12 w-12 cursor-pointer rounded-full object-cover transition-opacity hover:opacity-80"
                  onClick={handleAuthorClick}
                />
                <p
                  className="cursor-pointer font-bold text-gray-900 transition-colors hover:text-teal-700 hover:underline"
                  onClick={handleAuthorClick}
                >
                  {post.created_by}
                </p>
              </div>

              <p className="font-semibold text-gray-700">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>

            <CommentList postId={post.id} />
          </div>
        </div>
      )}

      {isEditOpen && (
        <EditPostForm
          post={post}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  )
}

export default PostCard
