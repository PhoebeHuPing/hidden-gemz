import herobg from '../public/hero.webp'
import logo from '../public/logo.webp'
import { useNavigate } from 'react-router'
import { IoIosArrowBack } from 'react-icons/io' // Using IoIosArrowBack for iOS style

type Props = {
  showLogo?: boolean
  title?: React.ReactNode
  subtitle?: string
  secondarySubtitle?: React.ReactNode
  showBackButton?: boolean // New prop for back button
}

function Hero({
  showLogo = true,
  title = (
    <>
      Hidden<span className="text-teal-600">Gemz</span>
    </>
  ),
  subtitle = 'Find your next spot!',
  secondarySubtitle = (
    <>
      Reviews of all the best local <span className="text-teal-600">Gemz</span>
    </>
  ),
  showBackButton = false, // Default to false
}: Props) {
  const navigate = useNavigate()

  return (
    <div
      className="relative flex h-[560px] items-center justify-center md:h-[500px]" // Add relative for absolute positioning of back button
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url(${herobg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center text-lg text-white transition-colors hover:text-teal-300"
        >
          <IoIosArrowBack className="mr-2 text-2xl" />{' '}
          {/* Use IoIosArrowBack */}
          Back
        </button>
      )}
      <div className="flex flex-col items-center px-4 text-center">
        {showLogo && <img src={logo} alt="" className="h-60" />}
        <h1 className="cursor-pointer text-6xl font-bold text-blue-800">
          {title}
        </h1>
        <h2 className="mt-2 text-4xl text-white">{subtitle}</h2>
        <h3 className="mt-2 text-2xl text-white">
          {secondarySubtitle}
        </h3>
      </div>
    </div>
  )
}

export default Hero
