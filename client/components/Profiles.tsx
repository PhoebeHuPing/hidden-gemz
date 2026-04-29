import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getPostsByCreator, getFavouritePosts } from '../apis/posts'
import { getFavourites } from '../apis/favourites'
import PostCard from './PostCard'
import Hero from './Hero'

export default function Profiles() {
  const { name } = useParams()
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    getAccessTokenSilently,
  } = useAuth0()

  const currentUserName = user?.given_name + ' ' + user?.family_name
  const isOwnProfile = !name || name === currentUserName
  const profileName = name || currentUserName

  const {
    data: myPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ['posts', 'creator', profileName],
    queryFn: () => getPostsByCreator(profileName),
    enabled: !!profileName,
  })

  const {
    data: favouritePosts,
    isLoading: favouritesLoading,
    error: favouritesError,
  } = useQuery({
    queryKey: ['posts', 'favourites', user?.sub],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getFavouritePosts(token)
    },
    enabled: isAuthenticated && isOwnProfile,
  })

  const { data: favouriteIds } = useQuery({
    queryKey: ['favourites'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getFavourites(token)
    },
    enabled: isAuthenticated,
  })

  if (authLoading || postsLoading || (isOwnProfile && favouritesLoading)) {
    return <div>Loading...</div>
  }
  if (postsError || (isOwnProfile && favouritesError)) {
    return <div>Failed to load data.</div>
  }

  return (
    <div>
      <Hero
        showLogo={true}
        title={
          <>
            {isOwnProfile ? 'Welcome,' : ''}{' '}
            <span className="block text-teal-400 md:inline">{profileName}</span>
          </>
        }
        subtitle={
          isOwnProfile ? 'Your corner of HiddenGemz' : `Explore ${profileName}'s HiddenGemz`
        }
        secondarySubtitle={
          isOwnProfile
            ? 'Manage your posts and favourite spots'
            : `Discover all the local gems shared by ${profileName}`
        }
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* My Posts Section */}
        <section className="py-8">
          <h2 className="mb-6 text-3xl font-bold text-teal-500">
            {isOwnProfile ? 'My Posts' : `${profileName}'s Posts`}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myPosts && myPosts.length > 0 ? (
              myPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isFavourite={favouriteIds?.includes(post.id) ?? false}
                />
              ))
            ) : (
              <p className="col-span-full">
                {isOwnProfile
                  ? "You haven't created any posts yet."
                  : `${profileName} hasn't created any posts yet.`}
              </p>
            )}
          </div>
        </section>

        {/* Favourite Posts Section - Only shown on own profile */}
        {isOwnProfile && (
          <section className="py-8">
            <h2 className="mb-6 text-3xl font-bold text-teal-500">
              My Favourites
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favouritePosts && favouritePosts.length > 0 ? (
                favouritePosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isFavourite={favouriteIds?.includes(post.id) ?? false}
                  />
                ))
              ) : (
                <p className="col-span-full">
                  You haven&apos;t favourited any posts yet.
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
