import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { useLenis } from "lenis/react";

/**
 * Lenis owns scroll on `ReactLenis root`; default router scroll restoration does not run.
 * Snap to top on real navigations (pathname / search / key changes).
 */
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
