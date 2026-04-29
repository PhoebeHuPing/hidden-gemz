import { Post } from '../../models/post'
import PostCard from './PostCard'
import FilterBar from './FilterBar'
import { useState } from 'react'
import Hero from './Hero'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../apis/posts'

const tagMap: Record<string, keyof Post> = {
  'Pet Friendly': 'pet_friendly',
  'Kid Friendly': 'kid_friendly',
  Vegan: 'vegan',
  'Gluten Free': 'gluten_free',
  Outdoor: 'outdoor',
  Indoor: 'indoor',
  Smoking: 'smoking',
  Parking: 'parking',
}

function Home() {
  const [suburb, setSuburb] = useState('All')
  const [venue, setVenue] = useState('All')
  const [selectedTag, setSelectedTag] = useState('All')
  const [amenities, setAmenities] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: allPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading posts</p>

  // Extract unique tags, suburbs, and venue types from all posts
  const allUniqueTags = Array.from(
    new Set(
      allPosts
        ?.flatMap((post) => post.tags.split(','))
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '') || [],
    ),
  ).sort()

  const allUniqueSuburbs = Array.from(
    new Set(allPosts?.map((post) => post.business_suburb) || []),
  ).sort()

  const allUniqueVenues = Array.from(
    new Set([
      'Cafe',
      'Bar',
      'Restaurant',
      'Foodtruck',
      ...(allPosts?.map((post) => post.venue_type) || []),
    ]),
  ).sort()

  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prev) => {
      return prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    })
  }

  function matchSuburb(post: Post, suburb: string) {
    return suburb === 'All' || post.business_suburb === suburb
  }

  function matchVenue(post: Post, cuisine: string): boolean {
    if (venue === 'All') {
      return true
    }

    const searchStr = cuisine.toLowerCase()

    const venueTypeMatch = post.venue_type.toLowerCase() === searchStr

    const tagMatch = post.tags.toLowerCase().includes(searchStr)

    return venueTypeMatch || tagMatch
  }

  function matchTag(post: Post, tag: string) {
    return (
      tag === 'All' ||
      post.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .includes(tag.toLowerCase())
    )
  }

  function matchAmenities(post: Post, selectedAmenities: string[]) {
    return selectedAmenities.every((amenityName) => !!post[tagMap[amenityName]])
  }

  function matchSearch(post: Post, searchTerm: string): boolean {
    if (!searchTerm) return true

    const lowerSearch = searchTerm.toLowerCase()

    const name = post.business_name?.toLowerCase() || ''
    const review = post.review?.toLowerCase() || ''

    return name.includes(lowerSearch) || review.includes(lowerSearch)
  }

  const filteredPosts = allPosts?.filter(
    (post: Post) =>
      matchSuburb(post, suburb) &&
      matchVenue(post, venue) &&
      matchTag(post, selectedTag) &&
      matchAmenities(post, amenities) &&
      matchSearch(post, searchTerm),
  )

  return (
    <main>
      <Hero />
      <FilterBar
        availableSuburbs={allUniqueSuburbs}
        selectedSuburb={suburb}
        onSuburbChange={setSuburb}
        availableVenues={allUniqueVenues}
        selectedVenue={venue}
        onVenueChange={setVenue}
        availableTags={allUniqueTags}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        selectedTags={amenities}
        onTagsChange={handleAmenityToggle}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <section className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts?.map((p: Post) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
    </main>
  )
}

export default Home
