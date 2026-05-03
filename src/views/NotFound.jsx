import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import FullWidthSection from "../components/ui/FullWidthSection";

export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prev = document.title;
    document.title = "Page not found — Sanipex Group";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-[min(70vh,32rem)]">
      <FullWidthSection bg="bg-[#f8f8f8]" className="py-1">
        <nav className="flex items-center gap-2 text-gray-400" aria-label="Breadcrumb">
          <Link to="/" className="transition-colors hover:text-gray-700">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-700">Not found</span>
        </nav>
      </FullWidthSection>

      <FullWidthSection className="py-16 md:py-24">
        <main className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="m-0 text-7xl font-bold tabular-nums tracking-tight text-[var(--template-color-primary)] md:text-8xl">
            404
          </p>
          <h1 className="mt-4 text-xl font-semibold text-gray-900 md:text-2xl">
            Page not found
          </h1>
          <p className="mt-3 text-pretty text-sm text-neutral-600 md:text-base">
            We couldn&apos;t find a page at{" "}
            <span className="break-all font-medium text-gray-800">{pathname}</span>
            . It may have been moved or the link might be wrong.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[var(--template-color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Back to home
            </Link>
            <Link
              to="/brands"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50"
            >
              View brands
            </Link>
          </div>
        </main>
      </FullWidthSection>
    </div>
  );
}
