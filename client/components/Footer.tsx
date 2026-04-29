function Footer() {
  return (
    <footer className="bg-white text-teal-400 p-6 border-t-2 mt-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} HiddenGemz</p>
      </div>
    </footer>
  )
}

export default Footer