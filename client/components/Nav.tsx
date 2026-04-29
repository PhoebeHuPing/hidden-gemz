import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
import logo from '../public/logo.webp'
import toast from 'react-hot-toast'
import { useEffect, useRef } from 'react'

interface Props {
  onAddPostClick: () => void
}

function Nav({ onAddPostClick }: Props) {
  const navigate = useNavigate()
  const auth = useAuth0()
  const user = auth.user
  const userNameForUrl = user?.name || `${user?.given_name}${user?.family_name}`
  const logout = auth.logout
  const loginWithRedirect = auth.loginWithRedirect
  const isAuthenticated = auth.isAuthenticated
  const isLoading = auth.isLoading

  const hasShownLoginToast = useRef(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated && user && !hasShownLoginToast.current) {
      toast.success(
        `Logged in successfully. Welcome ${user.given_name || user.name}!`,
      )
      hasShownLoginToast.current = true
    }

    if (!isAuthenticated) {
      hasShownLoginToast.current = false
    }
  }, [isAuthenticated, isLoading, user])

  const handleClick = (route: string) => {
    navigate(route)
  }

  const handleSignOut = () => {
    localStorage.setItem('showLogoutToast', 'true')

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    })
  }

  console.log('Given name: ' + user?.given_name)
  console.log('Family name: ' + user?.family_name)

  return (
    <nav className="flex  justify-between border-b-2 p-6">
      <div className="flex items-center gap-2">
        <img src={logo} alt="HiddenGemz Logo" className="h-12" />
        <button
          onClick={() => handleClick('/')}
          className="text-xl font-bold text-blue-800"
        >
          Hidden<span className="text-teal-400">Gemz</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        {!user ? (
          <button
            className="text-teal-400 transition hover:text-teal-600"
            onClick={handleSignIn}
          >
            Login/Sign Up
          </button>
        ) : (
          <>
            <button
              className="rounded-xl bg-teal-400 px-4 py-2 font-bold text-white transition hover:bg-teal-600"
              onClick={onAddPostClick}
            >
              + Post
            </button>

            <button
              onClick={() =>
                handleClick(`/user/${encodeURIComponent(userNameForUrl)}`)
              }
            >
              <img
                src={user.picture}
                alt={user.given_name}
                className="h-12 rounded-full"
              />
            </button>

            <button
              className="font-medium text-teal-400 transition hover:text-teal-600"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
