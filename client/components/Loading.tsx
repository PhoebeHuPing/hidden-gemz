import logo from '../public/logo.webp'

function Loading() {
  return (
    <div className="flex h-full min-h-[300px] flex-col items-center justify-center py-10">
      <img
        src={logo} // Relative to the public directory
        alt="Loading"
        className="h-24 w-24 animate-spin-slow"
      />
      <p className="mt-4 text-lg font-bold text-teal-600">Finding gemz...</p>
    </div>
  )
}

export default Loading
