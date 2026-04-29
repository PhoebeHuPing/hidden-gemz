import { Tags } from '../../models/tags'

interface FilterBarProps {
  selectedSuburb: string
  onSuburbChange: (value: string) => void
  selectedCuisine: string
  onCuisineChange: (value: string) => void
  selectedTags: string[]
  onTagsChange: (tag: string) => void
  searchTerm: string
  onSearchChange: (value: string) => void
}

const suburbOptions = [
  'All',
  'Te Aro',
  'Newtown',
  'Johnsonville',
  'Petone',
  'Thorndon',
  'Aro Valley',
  'Berhampore',
  'Breaker Bay',
  'Broadmeadows',
  'Brooklyn',
  'Churton Park',
  'Crofton Downs',
  'Glenside',
  'Grenada North',
  'Grenada Village',
  'Hataitai',
  'Highbury',
  'Horokiwi',
  'Houghton Bay',
  'Island Bay',
  'Kaiwharawhara',
  'Karaka Bays',
  'Karori',
  'Kelburn',
  'Khandallah',
  'Kilbirnie',
  'Kingston',
  'Lyall Bay',
  'Maupuia',
  'Melrose',
  'Miramar',
  'Moa Point',
  'Mornington',
  'Mount Cook',
  'Mount Victoria',
  'Newlands',
  'Ngaio',
  'Ngauranga',
  'Northland',
  'Ōhāriu',
  'Oriental Bay',
  'Owhiro Bay',
  'Paparangi',
  'Pipitea',
  'Rongotai',
  'Roseneath',
  'Seatoun',
  'Southgate',
  'Strathmore Park',
  'Takapū Valley',
  'Tawa',
  'Vogeltown',
  'Wadestown',
  'Wellington Central',
  'Wilton',
  'Woodridge',
]
const cuisineOptions = [
  'All',
  'Cafe',
  'Chinese',
  'Italian',
  'Mexican',
  'Burgers',
  'Restaurant',
  'Bar',
]

export default function FilterBar({
  selectedSuburb,
  onSuburbChange,
  selectedTags,
  onTagsChange,
  selectedCuisine,
  onCuisineChange,
  searchTerm,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div>
      {/* Top Filters */}
      <div className="flex flex-col justify-center gap-3 p-6 pb-0 md:flex-row md:flex-wrap">
        {/* Search Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or review..."
        />

        {/* Suburb */}
        <div className="flex w-full items-center gap-2 md:w-auto">
          <label
            htmlFor="suburb"
            className="whitespace-nowrap text-sm font-medium"
          >
            Suburb
          </label>

          <select
            id="suburb"
            value={selectedSuburb}
            onChange={(e) => onSuburbChange(e.target.value)}
            className="w-full rounded-xl border-2 px-4 py-2 md:w-auto"
          >
            {suburbOptions.map((suburb) => (
              <option key={suburb} value={suburb}>
                {suburb}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine */}
        <div className="flex w-full items-center gap-2 md:w-auto">
          <label
            htmlFor="cuisine"
            className="whitespace-nowrap text-sm font-medium"
          >
            Cuisine
          </label>

          <select
            id="cuisine"
            value={selectedCuisine}
            onChange={(e) => onCuisineChange(e.target.value)}
            className="w-full rounded-xl border-2 px-4 py-2 md:w-auto"
          >
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="flex w-full flex-wrap justify-center gap-2 md:w-auto">
          {Tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagsChange(tag)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 ${
                selectedTags.includes(tag)
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-400 text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
