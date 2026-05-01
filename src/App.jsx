import { Outlet } from "react-router";
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css';

function App() {
  return (
      <ReactLenis root>
      <Outlet />
    </ReactLenis>
  )
}

export default App
