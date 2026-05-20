import { FaSearch } from 'react-icons/fa'
import { Tags } from '../../models/tags'

interface FilterBarProps {
  availableSuburbs: string[]
  selectedSuburb: string
  onSuburbChange: (value: string) => void
  availableVenues: string[]
  selectedVenue: string
  onVenueChange: (value: string) => void
  availableTags: string[]
  selectedTag: string
  onTagChange: (value: string) => void
  selectedTags: string[]
  onTagsChange: (tag: string) => void
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function FilterBar({
  availableSuburbs,
  selectedSuburb,
  onSuburbChange,
  availableVenues,
  availableTags,
  selectedTag,
  onTagChange,
  selectedTags,
  onTagsChange,
  selectedVenue,
  onVenueChange,
  searchTerm,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className='border-b-2 pb-3'>
      {/* Top Filters */}
      <div className="flex flex-col items-center justify-center gap-4 p-6 pb-0 md:flex-row md:flex-wrap lg:gap-6">
        {/* Suburb */}
        <div className="flex w-full items-center gap-2 md:w-auto">
          <label
            htmlFor="suburb"
            className="w-20 shrink-0 text-sm font-medium text-gray-700 md:w-auto md:shrink"
          >
            Suburb
          </label>
          <select
            id="suburb"
            value={selectedSuburb}
            onChange={(e) => onSuburbChange(e.target.value)}
            className="w-full flex-1 rounded-xl border-2 border-teal-600 px-4 py-2 text-sm transition-focus focus:border-teal-600 focus:outline-none md:w-auto md:flex-none"
          >
            <option value="All">All Suburbs</option>
            {availableSuburbs.map((suburb) => (
              <option key={suburb} value={suburb}>
                {suburb}
              </option>
            ))}
          </select>
        </div>

        {/* Venue Type */}
        <div className="flex w-full items-center gap-2 md:w-auto">
          <label
            htmlFor="venue"
            className="w-20 shrink-0 text-sm font-medium text-gray-700 md:w-auto md:shrink"
          >
            Venue Type
          </label>
          <select
            id="venue"
            value={selectedVenue}
            onChange={(e) => onVenueChange(e.target.value)}
            className="w-full flex-1 rounded-xl border-2 border-teal-600 px-4 py-2 text-sm transition-focus focus:border-teal-600 focus:outline-none md:w-auto md:flex-none"
          >
            <option value="All">All Types</option>
            {availableVenues.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </select>
        </div>

        {/* Tag / Cuisine Filter */}
        <div className="flex w-full items-center gap-2 md:w-auto">
          <label
            htmlFor="tag"
            className="w-20 shrink-0 text-sm font-medium text-gray-700 md:w-auto md:shrink"
          >
            Tags
          </label>
          <select
            id="tag"
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full flex-1 rounded-xl border-2 border-teal-600 px-4 py-2 text-sm transition-focus focus:border-teal-600 focus:outline-none md:w-auto md:flex-none"
          >
            <option value="All">All Cuisines</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input Field */}
        <div className="relative w-full md:w-64 lg:w-80">
          <input
            id="search"
            type="text"
            aria-label="Search gemz"
            placeholder="Search gemz..."
            className="w-full rounded-xl border-2 border-teal-600 py-2 pl-4 pr-10 text-sm transition-focus focus:border-teal-600 focus:outline-none"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        </div>

        {/* Amenities (Pills) */}
        <div className="flex w-full flex-col items-center justify-center gap-3 py-4 md:mt-2 md:flex-row">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
            Amenities
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {Tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagsChange(tag)}
                className={`whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'border-teal-600 bg-teal-600 text-white shadow-md'
                    : 'border-teal-600 bg-white text-teal-700 hover:bg-teal-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
