import { useToggleFavourite } from '../hooks/use-toggle-favourites'
import type { Post } from '../../models/post'

type Props = {
  post: Post
  fav: boolean
  setFav: React.Dispatch<React.SetStateAction<boolean>>
}

function Favourite({ post, fav, setFav }: Props) {
  const { mutate, isError } = useToggleFavourite()

  function handleFavourite(e: React.MouseEvent) {
    e.stopPropagation()
    const newFav = !fav
    setFav(newFav)
    mutate({ id: post.id, isFavourite: newFav })
  }

  return (
    <div>
      {isError && <p>Error favouriting</p>}
      <div
        onClick={handleFavourite}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition duration-150 hover:scale-110 active:scale-125"
      >
        <svg
          className="h-6 w-6 text-red-500"
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
      </div>
    </div>
  )
}

export default Favourite