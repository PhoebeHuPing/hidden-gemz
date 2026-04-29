import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { addPost } from '../apis/posts'
import { PostData } from '../../models/post'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: { cloudName: string; uploadPreset: string },
        callback: (error: Error | null, result: CloudinaryResult) => void,
      ) => { open: () => void }
    }
  }
}

interface CloudinaryResult {
  event: string
  info: {
    secure_url: string
  }
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

type BooleanPostKeys = {
  [K in keyof typeof initialState]: (typeof initialState)[K] extends boolean
    ? K
    : never
}[keyof typeof initialState]

const booleanFields: BooleanPostKeys[] = [
  'pet_friendly',
  'kid_friendly',
  'vegan',
  'gluten_free',
  'favourite',
  'outdoor',
  'indoor',
  'smoking',
  'parking',
]

const initialState: Omit<
  PostData,
  'created_by' | 'created_at' | 'created_by_image'
> = {
  business_name: '',
  business_street: '',
  business_suburb: '',
  business_city: '',
  tags: '',
  pet_friendly: false,
  kid_friendly: false,
  vegan: false,
  gluten_free: false,
  favourite: false,
  outdoor: false,
  indoor: false,
  smoking: false,
  venue_type: '',
  parking: false,
  image_url: '',
  review: '',
}

function AddPostForm({ isOpen, onClose }: Props) {
  const { user, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const [form, setForm] = useState(initialState)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target

    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const addPostMutation = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently()

      if (!user?.sub) return

      const newPost: PostData = {
        ...form,
        created_by: user?.given_name + ' ' + user?.family_name,
        created_at: new Date().toISOString(),
        created_by_image: user.picture || '',
      }

      await addPost(newPost, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setForm(initialState)
      toast.success('New Gem Added')
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addPostMutation.mutate()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg border-4 border-teal-400">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add a New Hidden Gem</h2>
          <button onClick={onClose} className="text-3xl text-gray-500">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Name */}
          <input
            name="business_name"
            value={form.business_name}
            onChange={handleChange}
            placeholder="Business name"
            className="w-full rounded border p-2"
          />

          {/* Address */}
          <input
            name="business_street"
            value={form.business_street}
            onChange={handleChange}
            placeholder="Number and Street"
            className="w-full rounded border p-2"
          />

          <input
            name="business_suburb"
            value={form.business_suburb}
            onChange={handleChange}
            placeholder="Suburb"
            className="w-full rounded border p-2"
          />

          <input
            name="business_city"
            value={form.business_city}
            onChange={handleChange}
            placeholder="City"
            className="w-full rounded border p-2"
          />

          {/* Venue type */}
          <select
            name="venue_type"
            value={form.venue_type}
            onChange={handleChange}
            className="w-full rounded border p-2 bg-white"
            required
          >
            <option value="" disabled>Select a venue type...</option>
            <option value="Cafe">Cafe</option>
            <option value="Bar">Bar</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Foodtruck">Foodtruck</option>
          </select>

          {/* Tags */}
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full rounded border p-2"
          />

          {/* Review */}
          <div className="relative">
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              maxLength={200}
              placeholder="Your review..."
              className="w-full rounded border p-2 min-h-[100px]"
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {form.review.length}/200 characters
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                const widget = window.cloudinary.createUploadWidget(
                  {
                    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
                    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
                  },
                  (error: Error | null, result: CloudinaryResult) => {
                    if (!error && result && result.event === 'success') {
                      setForm((prev) => ({
                        ...prev,
                        image_url: result.info.secure_url,
                      }))
                    }
                  },
                  )

                widget.open()
              }}
              className="w-full rounded bg-teal-500 py-2 text-white hover:bg-teal-600 transition-colors"
            >
              Upload Photo
            </button>

            {form.image_url && (
              <div className="relative h-[400px] w-full overflow-hidden rounded border">
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, image_url: '' }))}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {booleanFields.map((key) => (
              <label key={key} className="flex items-center gap-2 capitalize">
                <input
                  type="checkbox"
                  name={key}
                  checked={form[key]}
                  onChange={handleChange}
                />
                {key.replace('_', ' ')}
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-200 px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={addPostMutation.isPending}
              className="rounded bg-teal-400 px-4 py-2 text-white"
            >
              {addPostMutation.isPending ? 'Adding...' : 'Add Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPostForm
