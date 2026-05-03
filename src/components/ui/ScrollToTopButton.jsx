import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
}