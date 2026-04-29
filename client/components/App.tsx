import { Outlet } from 'react-router'
import ToastProvider from './ToastProvider'
import Footer from './Footer'
import Nav from './Nav'

function App() {
  return (
    <>
      <ToastProvider />
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
