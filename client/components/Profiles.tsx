import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router'
import { getPostsByCreator, getFavouritePosts } from '../apis/posts'
import { getFavourites } from '../apis/favourites'
import { getFollows, getFollowStatus, toggleFollow } from '../apis/follows'
import { Follow } from '../../models/follow.ts'
import PostCard from './PostCard'
import Hero from './Hero'
import toast from 'react-hot-toast'
import Loading from './Loading' // Add this import
import NoResults from './NoResults'

export default function Profiles() {
  const { name } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    getAccessTokenSilently,
  } = useAuth0()

  const currentUserName = user?.name || ''
  const isOwnProfile = !name || name === currentUserName
  const profileName = name || currentUserName

  // Fetch posts for the profile being viewed
  const {
    data: profilePosts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ['posts', 'creator', profileName],
    queryFn: () => getPostsByCreator(profileName),
    enabled: !!profileName,
  })

  // Get the user ID of the profile owner from their first post
  const profileOwnerId = profilePosts?.[0]?.user_id
  const profileOwnerImage = profilePosts?.[0]?.created_by_image

  // Check if following this user
  const { data: isFollowingUser } = useQuery({
    queryKey: ['follows', 'status', profileOwnerId],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getFollowStatus(profileOwnerId!, token)
    },
    enabled: isAuthenticated && !isOwnProfile && !!profileOwnerId,
  })

  const followMutation = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently()
      return toggleFollow(
        {
          followed_id: profileOwnerId!,
          followed_username: profileName,
          followed_image: profileOwnerImage,
        },
        token,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follows'] })
      toast.success(
        isFollowingUser
          ? `Unfollowed ${profileName}`
          : `Following ${profileName}`,
      )
    },
  })

  // Favourites (only for own profile)
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

  // Follows list (only for own profile)
  const { data: followingList, isLoading: followingLoading } = useQuery({
    queryKey: ['follows', 'list', user?.sub],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getFollows(token)
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

  if (
    authLoading ||
    postsLoading ||
    (isOwnProfile && (favouritesLoading || followingLoading))
  ) {
    return <Loading />
  }
  if (postsError || (isOwnProfile && favouritesError)) {
    return (
      <div className="p-8 text-center text-red-500">Failed to load data.</div>
    )
  }

  return (
    <div>
      <Hero
        showLogo={false}
        showBackButton={true}
        title={
          <div className="flex flex-col items-center gap-4">
            <div>
              {isOwnProfile ? 'Welcome,' : ''}{' '}
              <span className="block text-teal-600 md:inline">
                {profileName}
              </span>
            </div>
            {!isOwnProfile && isAuthenticated && profileOwnerId && (
              <button
                onClick={() => followMutation.mutate()}
                disabled={followMutation.isPending}
                className={`rounded-full px-8 py-2 text-lg font-bold transition-all ${
                  isFollowingUser
                    ? 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600'
                    : 'bg-teal-600 text-white shadow-lg hover:bg-teal-700'
                }`}
              >
                {followMutation.isPending
                  ? '...'
                  : isFollowingUser
                    ? 'Following'
                    : 'Follow'}
              </button>
            )}
          </div>
        }
        subtitle={
          isOwnProfile
            ? 'Your corner of HiddenGemz'
            : `Explore ${profileName}'s HiddenGemz`
        }
        secondarySubtitle={
          isOwnProfile
            ? 'Manage your posts and favourite spots'
            : `Discover all the local gemz shared by ${profileName}`
        }
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Following Section (Only shown on own profile) */}
        {isOwnProfile && followingList && followingList.length > 0 && (
          <section className="border-b py-8">
            <h2 className="mb-6 text-3xl font-bold text-teal-700">
              Users You Follow
            </h2>
            <div className="flex flex-wrap gap-6">
              {followingList.map((follow: Follow) => (
                <div
                  key={follow.followed_id}
                  className="group flex cursor-pointer flex-col items-center gap-2"
                  onClick={() => navigate(`/user/${follow.followed_username}`)}
                >
                  <div className="relative">
                    <img
                      src={follow.followed_image}
                      alt={follow.followed_username}
                      className="h-20 w-20 rounded-full border-4 border-transparent object-cover transition-all group-hover:border-teal-600"
                    />
                  </div>
                  <span className="font-semibold transition-colors group-hover:text-teal-700">
                    {follow.followed_username}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* My Posts Section */}
        <section className="py-8">
          <h2 className="mb-6 text-3xl font-bold text-teal-700">
            {isOwnProfile ? 'My Posts' : `${profileName}'s Posts`}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profilePosts && profilePosts.length > 0 ? (
              profilePosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isFavourite={favouriteIds?.includes(post.id) ?? false}
                />
              ))
            ) : (
              <NoResults
                message={
                  isOwnProfile
                    ? "You haven't created any posts yet"
                    : `${profileName} hasn't created any posts yet`
                }
                subMessage={
                  isOwnProfile
                    ? 'Share your first local gem with the community!'
                    : 'Check back later for some local gemz!'
                }
              />
            )}
          </div>
        </section>

        {/* Favourite Posts Section - Only shown on own profile */}
        {isOwnProfile && (
          <section className="border-t py-8">
            <h2 className="mb-6 text-3xl font-bold text-teal-700">
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
                <NoResults
                  message="You haven't favourited any gemz yet"
                  subMessage="Browse the home page to find and save your favourite spots!"
                />
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
