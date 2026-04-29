import { Outlet, useLocation } from 'react-router'
import ToastProvider from './ToastProvider'
import Footer from './Footer'
import Nav from './Nav'
import { useState, useEffect, useLayoutEffect } from 'react'
import AddPostForm from './AddPostForm'
import toast from 'react-hot-toast'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { pathname } = useLocation()

  // Use useLayoutEffect to scroll to top before the browser paints
  // to avoid the "jumpy" effect when navigating.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    const shouldShowLogoutToast = localStorage.getItem('showLogoutToast')

    if (shouldShowLogoutToast === 'true') {
      toast.success('Logged out successfully')
      localStorage.removeItem('showLogoutToast')
    }
  }, [])

  return (
    <>
      <Nav onAddPostClick={() => setIsModalOpen(true)} />
      <AddPostForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ToastProvider />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
