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
}

function PostCard({ post }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [fav, setFav] = useState(post.favourite)
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
    navigate('/')
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

  const postAuthor = user ? user.given_name + ' ' + user.family_name : ''

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative block w-full cursor-pointer rounded-xl border-4 border-transparent p-6 text-left shadow-xl transition ease-linear hover:scale-105 hover:border-4 hover:border-teal-400 focus:border-teal-400 focus:outline-none"
      >
        <div>
          {/* Post Image & CRUD Icons - Edit & Delete*/}
          {post.created_by === postAuthor && (
            <>
              <button
                aria-label="Edit post"
                className="absolute left-12 top-12 z-10 flex items-center justify-center rounded-full bg-teal-400 p-4 transition-transform hover:scale-110"
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
                className="absolute right-12 top-12 z-10 flex items-center justify-center rounded-full bg-teal-400 p-4 transition-transform hover:scale-110"
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
            <div className="absolute bottom-4 right-4 z-10">
              <Favourite post={post} fav={fav} setFav={setFav} />
            </div>
          </div>

          {/* Business Details */}
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">{post.business_name}</h2>
            <h2 className="font-bold text-teal-400">{post.business_suburb}</h2>
          </div>
          <h2 className="text-left font-bold capitalize text-teal-400">
            {post.venue_type}
          </h2>
          <p className="text-left font-light">{post.review}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.split(',').map((tag) => (
              <span
                key={tag.trim()}
                className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <div className="my-6 flex items-center justify-between">
            <div className="flex items-center gap-2 transition hover:text-teal-600">
              <button onClick={handleAuthorClick}>
                <img
                  src={post.created_by_image}
                  alt={post.created_by + ' avatar'}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </button>
              <h2 className="font-semibold">{post.created_by}</h2>
            </div>

            <p className="font-light text-sm">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </button>

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
                alt={post.business_name}
                className="mb-6 h-80 w-full rounded-xl object-cover"
              />

              <div className="absolute bottom-4 right-4 z-10">
                <Favourite post={post} fav={fav} setFav={setFav} />
              </div>

              <button
                className="absolute right-[12px] top-[12px] rounded-lg bg-teal-400 px-4 py-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold">{post.business_name}</h2>
              <p>
                {post.business_street}, {post.business_suburb},{' '}
                {post.business_city}
              </p>
            </div>

            <h2 className="mb-3 font-bold capitalize text-teal-400">
              {post.venue_type}
            </h2>

            <div className="mt-3 mb-3 flex flex-wrap gap-2">
              {post.tags.split(',').map((tag) => (
                <span
                  key={tag.trim()}
                  className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            <p className="mb-4 text-lg">{post.review}</p>

            <GoogleMap
              street={post.business_street}
              suburb={post.business_suburb}
              city={post.business_city}
            />

            <div className="mt-3">
              <h2 className="text-center text-xl font-bold uppercase">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={post.created_by_image}
                  alt={post.created_by}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <p className="font-semibold">{post.created_by}</p>
              </div>

              <p className="font-light">
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