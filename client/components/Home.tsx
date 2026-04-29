import { Post } from '../../models/post'
import PostCard from './PostCard'
import FilterBar from './FilterBar'
import { useState } from 'react'
import Hero from './Hero'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../apis/posts'
import toast from 'react-hot-toast'

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
  const [cuisine, setCuisine] = useState('All')
  const [tags, setTags] = useState<string[]>([])

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

  const handleTagToggle = (tag: string) => {
    setTags((prev) => {
      return prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    })
  }

  function matchSuburb(post: Post, suburb: string) {
    return suburb === 'All' || post.business_suburb === suburb
  }

  function matchCuisine(post: Post, cuisine: string): boolean {
    if (cuisine === 'All') {
      return true
    }

    const searchStr = cuisine.toLowerCase()

    const venueTypeMatch = post.venue_type.toLowerCase() === searchStr

    const tagMatch = post.tags.toLowerCase().includes(searchStr)

    return venueTypeMatch || tagMatch
  }

  function matchTags(post: Post, selectedTags: string[]) {
    return selectedTags.every((tagName) => post[tagMap[tagName]] === true)
  }

  const filteredPosts = allPosts?.filter(
    (post: Post) =>
      matchSuburb(post, suburb) &&
      matchCuisine(post, cuisine) &&
      matchTags(post, tags),
  )

  return (
    <main>
      <Hero />
      <div className="px-6 pt-4">
        <button
          onClick={() => toast.success('Toast is working')}
          className="rounded-xl bg-teal-400 px-4 py-2 font-semibold text-white"
        >
          Test Toast
        </button>
      </div>
      <FilterBar
        selectedSuburb={suburb}
        onSuburbChange={setSuburb}
        selectedCuisine={cuisine}
        onCuisineChange={setCuisine}
        selectedTags={tags}
        onTagsChange={handleTagToggle}
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
