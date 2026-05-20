import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="mt-6 border-t-2 bg-white p-6 text-teal-700 font-medium">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} HiddenGemz
        </p>
        <Link to="/about" className="text-sm hover:underline md:text-base">
          About Developers
        </Link>
      </div>
    </footer>
  )
}

export default Footer
