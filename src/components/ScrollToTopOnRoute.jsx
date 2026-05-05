import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { useLenis } from "lenis/react";

export default function ScrollToTopOnRoute() {
  const { pathname, search, key } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, search, key, lenis]);

  return null;
}
