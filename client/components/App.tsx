import { Outlet } from 'react-router'
import ToastProvider from './ToastProvider'
import Footer from './Footer'
import Nav from './Nav'
import { useState } from 'react'
import AddPostForm from './AddPostForm'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
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
