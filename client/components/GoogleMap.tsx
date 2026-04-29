interface Props {
  street: string
  suburb: string
  city: string
}

export default function GoogleMap({ street, suburb, city }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const query = `${street}, ${suburb}, ${city}, New Zealand`
  
  if (!apiKey) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
        Google Maps API key is missing. Please add it to your .env file.
      </div>
    )
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <iframe
        width="100%"
        height="250"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`}
      ></iframe>
    </div>
  )
}
