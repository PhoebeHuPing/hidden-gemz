import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
import logo from '../public/logo.webp'

function Nav() {
  const navigate = useNavigate()
  const auth = useAuth0()
  const user = auth.user
  const logout = auth.logout
  const loginWithRedirect = auth.loginWithRedirect

  const handleClick = (route: string) => {
    navigate(route)
  }

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    })
  }

  return (
    <nav className="flex  justify-between border-b-2 p-3">
      <div className="flex items-center gap-2">
        <img src={logo} alt="HiddenGemz Logo" className="h-12" />
        <h2 className="cursor-pointer text-xl font-bold text-blue-800">
          Hidden<span className="text-teal-400">Gemz</span>
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {!user ? (
          <p
            className="cursor-pointer text-teal-400 transition hover:text-teal-600"
            onClick={handleSignIn}
          >
            Login/Sign Up
          </p>
        ) : (
          <>
            <button
              className="rounded-xl bg-teal-400 px-4 py-2 font-bold text-white transition hover:bg-teal-600"
              onClick={() => handleClick('/add-event')}
            >
              + Post
            </button>

            <button
                onClick={() => handleClick(`/user/${user.name}`)} 
            >
                <img 
                    src={user.picture} 
                    alt={user.given_name} 
                    className='rounded-full h-12'
                />
            </button>

            <p
              className="cursor-pointer transition text-teal-400 hover:text-teal-600"
              onClick={handleSignOut}
            >
              Logout
            </p>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
