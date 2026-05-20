import { useToggleFavourite } from '../hooks/use-toggle-favourites'
import type { Post } from '../../models/post'
import { useAuth0 } from '@auth0/auth0-react'
import toast from 'react-hot-toast'

type Props = {
  post: Post
  isFavourite: boolean
}

function Favourite({ post, isFavourite }: Props) {
  const { isAuthenticated } = useAuth0()
  const { mutate } = useToggleFavourite()

  function handleFavourite(e: React.MouseEvent) {
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.error('You must be logged in to Favourite posts')
      return
    }

    mutate(post.id)
  }

  return (
    <div>
      <button
        aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        onClick={handleFavourite}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-teal-600 shadow-md transition duration-150 hover:scale-110 active:scale-125 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <svg
          className="h-6 w-6"
          role="img"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFavourite ? 'white' : 'none'}
          stroke="white"
          strokeWidth="1.6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
      </button>
    </div>
  )
}

export default Favourite