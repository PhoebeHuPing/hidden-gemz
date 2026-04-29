import { FaPenToSquare, FaTrash } from 'react-icons/fa6'
import AmmenitiesIcon from './AmmenitiesIcon'
import { useNavigate } from 'react-router'
import { Post } from '../../models/post'
import { formatDistanceToNow } from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

type Props = {
  post: Post
}

function PostCard({ post }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }

  return () => {
    document.body.style.overflow = "auto"
  }
}, [isOpen])

  const navigate = useNavigate()
  const auth = useAuth0()
  const user = auth.user

  function handleAuthorClick(event: React.MouseEvent) {
    event.stopPropagation()
    navigate('/')
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer rounded-xl border-4 border-transparent p-6 shadow-xl transition ease-linear hover:scale-105 hover:border-4 hover:border-teal-400"
      >
        <div>
          {/* Post Image & CRUD Icons - Edit & Delete*/}
          {post.created_by === user?.sub && (
            <>
              <button className="absolute left-12 top-12 flex items-center justify-center rounded-full bg-teal-400 p-4">
                <FaPenToSquare className="text-2xl text-white" />
              </button>
              <button className="absolute right-12 top-12 flex items-center justify-center rounded-full bg-teal-400 p-4">
                <FaTrash className="text-2xl text-white" />
              </button>
            </>
          )}

          {/* Post Image */}
          <img
            src={post.image_url}
            alt={post.business_name + ' avatar'}
            className="mb-6 rounded-xl object-cover h-[400px] w-full"
          />

          {/* Business Details */}
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">{post.business_name}</h2>
            <h2 className="font-bold text-teal-400">{post.business_suburb}</h2>
          </div>
          <h2 className="text-left font-bold capitalize text-teal-400">
            {post.venue_type}
          </h2>
          {/* Review */}
          <p className="text-left font-light">{post.review}</p>
          {/* Author Info */}
          <div className="my-6 flex items-center justify-between">
            <div className="flex items-center gap-2  transition hover:text-teal-600">
              <button onClick={handleAuthorClick}>
                <img
                  src={post.created_by_image}
                  alt={post.created_by + ' avatar'}
                  className="h-16 w-16 rounded-full"
                />
              </button>
              <h2 className="text-xl font-semibold">{post.created_by}</h2>
            </div>
            {/* Posted Date */}
            <p className="font-light">
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
            className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] shadow-2xl modal-scroll"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={post.image_url}
              alt={post.business_name}
              className="mb-6 h-80 w-full rounded-xl object-cover"
            />

            <div className='flex items-end justify-between'>
                <h2 className="text-3xl font-bold">{post.business_name}</h2>
                <p>{post.business_street}, {post.business_suburb}, {post.business_city}</p>
            </div>
            <h2 className="font-bold text-teal-400 capitalize mb-3">{post.venue_type}</h2>

            <h2 className='capitalize mb-3 font-bold'>{post.tags}</h2>

            <p className="mb-4 text-lg">{post.review}</p>

            <div>
            <h2 className="text-center text-xl font-bold uppercase">
              Ammenities Available
            </h2>
            {/* Ammenities icons */}
            <div className="grid grid-cols-4 gap-6 p-6">
              {post.pet_friendly && <AmmenitiesIcon type="pet" />}
              {post.kid_friendly && <AmmenitiesIcon type="kids" />}
              {post.vegan && <AmmenitiesIcon type="vegan" />}
              {post.gluten_free && <AmmenitiesIcon type="gluten" />}
              {post.smoking && <AmmenitiesIcon type="smoking" />}
              {post.outdoor && <AmmenitiesIcon type="outdoor" />}
              {post.indoor && <AmmenitiesIcon type="indoor" />}
              {post.parking && <AmmenitiesIcon type="parking" />}
              {/* <FaMugSaucer/>
                        <FaUtensils/>
                        <FaUntappd/> */}
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

              <button
                className="rounded-lg bg-teal-400 px-4 py-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostCard
