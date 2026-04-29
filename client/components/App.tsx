import { Outlet, useLocation } from 'react-router'
import ToastProvider from './ToastProvider'
import Footer from './Footer'
import Nav from './Nav'
import { useState, useEffect } from 'react'
import AddPostForm from './AddPostForm'
import toast from 'react-hot-toast'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
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
