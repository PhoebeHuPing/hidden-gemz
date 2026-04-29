import herobg from '../public/hero.webp'
import logo from '../public/logo.webp'

type Props = {
  showLogo?: boolean
  title?: React.ReactNode
  subtitle?: string
  secondarySubtitle?: string
}

function Hero({
  showLogo = true,
  title = (
    <>
      Hidden<span className="text-teal-400">Gemz</span>
    </>
  ),
  subtitle = 'Find your next spot!',
  secondarySubtitle = (
    <>
      Reviews of all the best local <span className="text-teal-400">gemz</span>
    </>
  ),
}: Props) {
  return (
    <div
      className="flex h-[500px] items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url(${herobg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center">
        {showLogo && <img src={logo} alt="HiddenGemz Logo" className="h-60" />}
        <h2 className="cursor-pointer text-6xl font-bold text-blue-800">
          {title}
        </h2>
        <h2 className="mt-2 text-4xl text-white">{subtitle}</h2>
        <h3 className="mt-2 text-2xl font-thin text-white">
          {secondarySubtitle}
        </h3>
      </div>
    </div>
  )
}

export default Hero
