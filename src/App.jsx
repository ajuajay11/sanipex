import { Outlet } from "react-router";
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css';
import Header from "./components/features/nav/Header";

function App() {
  return (
      <ReactLenis root>
        <Header/>
      <Outlet />
      {/* <Footer/> */}
    </ReactLenis>
  )
}

export default App
