import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getPostsByCreator, getFavouritePosts } from '../apis/posts'
import PostCard from './PostCard'
import Hero from './Hero'

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
      <Hero
        showLogo={true}
        title={`Welcome, ${userName}`}
        subtitle="Your corner of HiddenGemz"
        secondarySubtitle="Manage your posts and favourite spots"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* My Posts Section */}
        <section className="py-8">
          <h2 className="mb-6 text-3xl font-bold text-teal-500">My Posts</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myPosts && myPosts.length > 0 ? (
              myPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="col-span-full">
                You haven&apos;t created any posts yet.
              </p>
            )}
          </div>
        </section>
        {/* Favourite Posts Section */}
        <section className="py-8">
          <h2 className="mb-6 text-3xl font-bold text-teal-500">
            My Favourites
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favouritePosts && favouritePosts.length > 0 ? (
              favouritePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="col-span-full">
                You haven&apos;t favourited any posts yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
