import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getPostsByCreator, getFavouritePosts } from '../apis/posts'
import PostCard from './PostCard'

export default function Profiles() {
  const { name } = useParams()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0()
  const userName =
    name || user?.name || `${user?.given_name}${user?.family_name}`

  const {
    data: myPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ['posts', 'creator', userName],
    queryFn: () => getPostsByCreator(userName),
    enabled: !!userName,
  })

  const {
    data: favouritePosts,
    isLoading: favouritesLoading,
    error: favouritesError,
  } = useQuery({
    queryKey: ['posts', 'favourites'],
    queryFn: getFavouritePosts,
  })

  if (authLoading || postsLoading || favouritesLoading) {
    return <div>Loading...</div>
  }
  if (postsError || favouritesError) {
    return <div>Failed to load data.</div>
  }
  if (!isAuthenticated) {
    return <div>Please log in first.</div>
  }

  return (
    <div>
      <header>
        <h1>Welcome, {userName}!</h1>
      </header>
      {/* My Posts Section */}
      <section>
        <h2>My Posts</h2>
        <div>
          {myPosts && myPosts.length > 0 ? (
            myPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>
      {/* Favourite Posts Section */}
      <section>
        <h2>My Favourites</h2>
        <div>
          {favouritePosts && favouritePosts.length > 0 ? (
            favouritePosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p>No favourite posts available.</p>
          )}
        </div>
      </section>
    </div>
  )
}
