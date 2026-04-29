import { Tags } from '../../models/tags'

interface FilterBarProps {
  selectedSuburb: string
  onSuburbChange: (value: string) => void
  selectedCuisine: string
  onCuisineChange: (value: string) => void
  selectedTags: string[]
  onTagsChange: (tag: string) => void
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
}: FilterBarProps) {
  return (
    <div>
      {/* Top Filters */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-3 justify-center p-6 pb-0">

        {/* Suburb */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="suburb" className="text-sm font-medium whitespace-nowrap">
            Suburb
          </label>

          <select
            id="suburb"
            value={selectedSuburb}
            onChange={(e) => onSuburbChange(e.target.value)}
            className="border-2 rounded-xl px-4 py-2 w-full md:w-auto"
          >
            {suburbOptions.map((suburb) => (
              <option key={suburb} value={suburb}>
                {suburb}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="cuisine" className="text-sm font-medium whitespace-nowrap">
            Cuisine
          </label>

          <select
            id="cuisine"
            value={selectedCuisine}
            onChange={(e) => onCuisineChange(e.target.value)}
            className="border-2 rounded-xl px-4 py-2 w-full md:w-auto"
          >
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
          {Tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagsChange(tag)}
              className={`rounded-full border px-4 py-2 whitespace-nowrap ${
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
