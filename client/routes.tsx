import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Home from './components/Home.tsx'
import AboutDevelopers from './components/AboutDevelopers.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/about" element={<AboutDevelopers />} />
  </Route>,
)
