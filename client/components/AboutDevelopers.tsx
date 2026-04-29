import Hero from './Hero'

function AboutPage() {
  return (
    <div className="bg-white p-6 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <Hero
          showLogo={true}
          title="About the Developers"
          subtitle="Meet the team behind HiddenGemz"
          secondarySubtitle="We're passionate about finding the best local spots"
        />
        <br></br>
        <p className="mb-4">
          Welcome to the developer&apos;s corner of HiddenGemz! This prject is
          brought to you by a passionate team of developers dedicated to
          uncovering and sharing the best local spots.
        </p>
        <p className="mb-4">
          Our mission is to create a platform that connects people with unique
          and authentic local businesses.
        </p>
        <h2 className="mb-4 mt-8 text-2xl font-semibold text-teal-500">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add team member profiles here */}
          <div className="rounded-lg bg-gray-100 p-4 text-center">
            <p className="font-semibold">Ciaran S</p>
            <p className="text-sm">Project Lead</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 text-center">
            <p className="font-semibold">Johnny C</p>
            <p className="text-sm">Junior developer</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 text-center">
            <p className="font-semibold">Jay H</p>
            <p className="text-sm">Junior developer</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 text-center">
            <p className="font-semibold">Phoebe H</p>
            <p className="text-sm">Junior developer</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 text-center">
            <p className="font-semibold">Melia G</p>
            <p className="text-sm">Junior developer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
