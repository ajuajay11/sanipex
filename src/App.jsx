import { Outlet } from "react-router";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Header from "./components/features/nav/Header";
import Footer from "./components/features/nav/Footer";
import ScrollToTopOnRoute from "./components/ScrollToTopOnRoute";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import "./App.css";

function App() {
  return (
    <ReactLenis root>
      <ScrollToTopOnRoute />
      <Header />
      <Outlet />
      <ScrollToTopButton />
      <Footer />
    </ReactLenis>
  );
}

export default App;
