import Hero from './Hero'
import ciaran from '../public/headshots/ciaran.webp'
import phoebe from '../public/headshots/phoebe.webp'
import johnny from '../public/headshots/johnny.webp'
import melia from '../public/headshots/melia.webp'
import jay from '../public/headshots/jay.webp'
import { FaGithub } from 'react-icons/fa6'
import { FaLinkedin } from 'react-icons/fa'

function AboutPage() {
  return (
    <>
      <Hero
        showLogo={true}
        title={
          <>
            About the{' '}
            <span className="block text-teal-400 md:inline">Developers</span>
          </>
        }
        subtitle="Meet the team behind HiddenGemz"
        secondarySubtitle="We're passionate about finding the best local spots"
      />
      <div className="bg-white p-6 text-gray-800">
        <div className="mx-auto max-w-4xl">
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
            <div className="rounded-lg bg-gray-100 p-4 text-center flex flex-col items-center shadow-xl">
              <img src={ciaran} alt="Ciaran S headshot" className='rounded-full border-4 border-teal-400 mb-3 h-60 w-60 object-cover object-top'/>
              <p className="font-semibold mb-3">Ciaran S</p>
              <p className="text-sm text-left">I’m a full-stack dev who enjoys building web apps that are clean, fast, and actually enjoyable to use. I spend most of my time working with React and APIs, turning ideas into real projects and figuring things out as I go. I like keeping things simple, experimenting with new tech, and improving UI/UX along the way—basically just trying to build cool stuff that works well and looks good doing it.</p>
              <div className="flex gap-4 text-5xl text-teal-400 mt-auto pt-4">
                <a
                  href="https://github.com/ciaran-slow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/ciaran-slow-1a740a87/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center flex flex-col items-center shadow-xl">
              <img src={johnny} alt="Johnny C headshot" className='rounded-full border-4 border-teal-400 mb-3 h-60 w-60 object-cover object-top'/>
              <p className="font-semibold">Johnny C</p>
              <p className="text-sm text-left">I am a junior full-stack developer with a passion for technology. My background in building computers and getting into the nitty-gritty of data and analytics has led me to pursue my goal of becoming a software engineer. During my time at Dev Academy Aotearoa, I worked with Databases, APIs, React and various Javascript technologies.</p>
              <div className="flex gap-4 text-5xl text-teal-400 mt-auto pt-4">
                <a
                  href="https://github.com/johnny-cassin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/johnny-cassin-82bb414a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center flex flex-col items-center shadow-xl">
              <img src={jay} alt="Jay H headshot" className='rounded-full border-4 border-teal-400 mb-3 h-60 w-60 object-cover object-top'/>
              <p className="font-semibold">Jay H</p>
              <p className="text-sm text-left">I’m a junior full-stack developer who enjoys building clean, functional web apps that are simple to use and actually useful. I like experimenting with new tech, improving UI/UX, and figuring things out as I go—always aiming to build projects that work well, look good, and keep getting better each time.</p>
              <div className="flex gap-4 text-5xl text-teal-400 mt-auto pt-4">
                <a
                  href="https://github.com/JayHuston-Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaGithub />
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center flex flex-col items-center shadow-xl">
              <img src={phoebe} alt="Phoebe H headshot" className='rounded-full border-4 border-teal-400 mb-3 h-60 w-60 object-cover object-top'/>
              <p className="font-semibold">Phoebe H</p>
              <p className="text-sm text-left">I’m a junior full-stack developer wrapping up my training, focused on building simple, functional web apps that actually make sense to use. I’ve been working with React, APIs, and databases, turning concepts into working features while learning how everything connects end to end. I enjoy keeping things clean, solving problems step by step, and improving both the logic and the user experience—just trying to build things that work well and keep getting better each time.</p>
              <div className="flex gap-4 text-5xl text-teal-400 mt-auto pt-4">
                <a
                  href="https://github.com/PhoebeHuPing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/phoebe-hu-1a8a3b346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center flex flex-col items-center shadow-xl">
              <img src={melia} alt="Melia G headshot" className='rounded-full border-4 border-teal-400 mb-3 h-60 w-60 object-cover object-top'/>
              <p className="font-semibold">Melia G</p>
              <p className="text-sm text-left">I am a junior full-stack developer who enjoys focusing on building simple, functional web apps that are useful. I have been working with React, APIs and databases and enjoy working on the backend of projects. I enjoy aesthetic projects and working on things that are simple.</p>
              <div className="flex gap-4 text-5xl text-teal-400 mt-auto pt-4">
                <a
                  href="https://github.com/melia-gratsounas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/melia-gratsounas-11a895364/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='cursor-pointer hover:text-teal-600 transition'
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
