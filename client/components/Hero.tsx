import herobg from '../public/hero.webp'
import logo from '../public/logo.webp'

function Hero() {
  return (
    <div 
      className="h-[500px] flex justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: 'center'
      }}
    >
      <div className='flex flex-col items-center'>
        <img src={logo} alt="HiddenGemz Logo" className="h-60"/>
        <h2 className="font-bold cursor-pointer text-blue-800 text-6xl">Hidden<span className="text-teal-400">Gemz</span></h2>
        <h2  className='text-white text-4xl mt-2'>Find your next spot!</h2>
        <h3  className='text-white text-2xl font-thin mt-2'>Reviews of all the best local <span className='text-teal-400'>gemz</span></h3>
      </div>
    </div>
  )
}

export default Hero