import logo from '../public/logo.webp'

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] py-10">
      <img
        src={logo} // Relative to the public directory
        alt="Loading"
        className="h-24 w-24 animate-spin-slow"
      />
      <p className="mt-4 text-lg text-teal-400 font-bold">Finding gems...</p>
    </div>
  );
}

export default Loading;
