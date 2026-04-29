import { Outlet } from 'react-router'
import Footer from './Footer'
import Nav from './Nav'

function App() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
