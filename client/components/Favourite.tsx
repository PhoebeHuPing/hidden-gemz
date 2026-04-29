import { useToggleFavourite } from '../hooks/use-toggle-favourites'
import { useState } from 'react'
import type { Post } from '../../models/post'

function Favourite({ post }: { post: Post }) {
  const [fav, setFav] = useState(post.favourite)
  const { mutate, isError } = useToggleFavourite()

  function handleFavourite() {
    const newFav = !fav
    setFav(newFav)
    mutate({ id: post.id, isFavourite: newFav })
  }

  return (
    <div>
      {isError && <p>Error favouriting</p>}
      <button onClick={handleFavourite}>
        <svg
          className="w-[31px] h-[31px]"
          role="img"
          aria-label={`favourite-${post.id}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill={fav ? 'red' : 'none'}
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
      </button>
    </div>
  )
}

export default Favourite