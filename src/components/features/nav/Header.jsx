import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import TopHeader from "./TopHeader";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Store,
  BookOpen,
} from "lucide-react";
import HeaderCategories from "./HeaderCategories";
import FullWidthSection from "../../ui/FullWidthSection";
import { logo } from "../../../common";

const countries = [
  { code: "AE", label: "UAE", flag: "🇦🇪" },
  { code: "GB", label: "UK", flag: "🇬🇧" },
  { code: "US", label: "USA", flag: "🇺🇸" },
];
const cartCount = 3;

const DRAWER_MS = 320;

export default function Header() {
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerEntered, setDrawerEntered] = useState(false);

  const closeMenu = useCallback(() => {
    setDrawerEntered(false);
  }, []);

  const openMenu = useCallback(() => {
    setDrawerMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawerEntered(true));
    });
  }, []);

  const handlePanelTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "transform") return;
      if (!drawerEntered) setDrawerMounted(false);
    },
    [drawerEntered],
  );

  useEffect(() => {
    if (!drawerMounted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerMounted]);

  useEffect(() => {
    if (!drawerMounted || !drawerEntered) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerMounted, drawerEntered, closeMenu]);

  return (
    <header className="topheader sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="hidden border-b border-gray-100 lg:block">
        <FullWidthSection bg="bg-white">
          <TopHeader />
        </FullWidthSection>
      </div>

      <FullWidthSection bg="bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-2 lg:hidden">
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-800 transition-colors hover:bg-gray-100"
            aria-expanded={drawerMounted && drawerEntered}
            aria-controls="header-mobile-drawer"
            onClick={openMenu}
          >
            <Menu size={22} aria-hidden="true" strokeWidth={2} />
            <span className="sr-only">Open menu</span>
          </button>
          <Link
            to="/"
            aria-label="Sanipex Group — Home"
            className="flex min-h-[44px] min-w-0 flex-1 justify-center"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="Sanipex Group"
              className="h-10 w-auto max-w-[200px] object-contain sm:h-12"
              width={180}
              height={48}
              decoding="async"
              fetchPriority="high"
            />
          </Link>
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="flex h-11 min-w-[44px] items-center justify-center gap-1 text-gray-800 hover:text-black"
          >
            <ShoppingCart size={20} aria-hidden="true" strokeWidth={2} />
            <span className="text-sm font-medium">{cartCount}</span>
          </Link>
        </div>

        <div
          className="border-b border-gray-100 px-0 pb-3 pt-1 lg:hidden"
          role="search"
        >
          <label htmlFor="site-search-mobile-bar" className="sr-only">
            Search products
          </label>
          <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400">
            <input
              id="site-search-mobile-bar"
              type="search"
              placeholder="Search"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              aria-label="Submit search"
              className="shrink-0 text-gray-500 hover:text-gray-800"
            >
              <Search size={14} aria-hidden="true" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="hidden gap-4 border-b border-gray-100 py-2 lg:grid lg:grid-cols-3 lg:items-center">
          <Link
            to="/"
            aria-label="Sanipex Group — Home"
            className="inline-flex min-h-[44px] min-w-[44px] items-center"
          >
            <img
              src={logo}
              alt="Sanipex Group"
              className="h-12 w-auto"
              width={180}
              height={48}
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          <div role="search">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400">
              <input
                id="site-search"
                type="search"
                placeholder="Search"
                autoComplete="off"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                aria-label="Submit search"
                className="text-gray-500 hover:text-gray-800"
              >
                <Search size={14} aria-hidden="true" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-5">
            <Link
              to="/showrooms"
              className="flex flex-col items-center gap-0.5 text-xs text-gray-700 hover:text-black"
              aria-label="Showrooms"
            >
              <Store size={22} aria-hidden="true" strokeWidth={2} />
              <span>Showrooms</span>
            </Link>

            <Link
              to="/brochures"
              className="flex flex-col items-center gap-0.5 rounded text-xs hover:text-black"
              aria-label="Download Brochures"
            >
              <BookOpen size={20} aria-hidden="true" strokeWidth={2} />
              <span>Brochures</span>
            </Link>

            <div>
              <label htmlFor="country-select" className="sr-only">
                Select country
              </label>
              <select
                id="country-select"
                defaultValue="AE"
                className="cursor-pointer border-none bg-transparent text-sm outline-none"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.label}
                  </option>
                ))}
              </select>
            </div>

            <Link
              to="/account"
              aria-label="My account"
              className="text-gray-700 hover:text-black"
            >
              <User size={18} aria-hidden="true" strokeWidth={2} />
            </Link>

            <div className="flex items-center gap-2 text-gray-700">
              <span
                aria-hidden="true"
                className="text-lg font-light text-gray-300"
              >
                |
              </span>
              <Link
                to="/cart"
                aria-label={`Shopping cart, ${cartCount} items`}
                className="flex items-center gap-1.5 hover:text-black"
              >
                <ShoppingCart size={18} aria-hidden="true" strokeWidth={2} />
                <span className="text-sm font-medium">{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </FullWidthSection>

      <div className="hidden border-b border-gray-100 lg:block">
        <FullWidthSection bg="bg-white">
          <HeaderCategories />
        </FullWidthSection>
      </div>

      {drawerMounted ? (
        <>
          <button
            type="button"
            className={`fixed inset-0 z-[60] bg-black/40 lg:hidden ${drawerEntered ? "opacity-100" : "pointer-events-none opacity-0"}`}
            style={{
              transitionProperty: "opacity",
              transitionDuration: `${DRAWER_MS}ms`,
              transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            id="header-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={`fixed inset-y-0 left-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl lg:hidden ${drawerEntered ? "translate-x-0" : "-translate-x-full"}`}
            style={{
              transitionProperty: "transform",
              transitionDuration: `${DRAWER_MS}ms`,
              transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            onTransitionEnd={handlePanelTransitionEnd}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3">
              <span className="text-sm font-semibold tracking-wide text-gray-900">
                Menu
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-800 hover:bg-gray-100"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={22} aria-hidden="true" strokeWidth={2} />
              </button>
            </div>
            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-8"
              data-lenis-prevent
            >
              <TopHeader forDrawer />

              <div className="mt-6 border-b border-gray-100 pb-6" role="search">
                <label htmlFor="site-search-drawer" className="sr-only">
                  Search products
                </label>
                <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 focus-within:ring-2 focus-within:ring-gray-400">
                  <input
                    id="site-search-drawer"
                    type="search"
                    placeholder="Search"
                    autoComplete="off"
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Submit search"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <Search size={14} aria-hidden="true" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <nav
                className="mt-6 flex flex-col gap-3 border-b border-gray-100 pb-6"
                aria-label="Quick links"
              >
                <Link
                  to="/showrooms"
                  className="flex items-center gap-3 py-2 text-sm font-medium text-gray-800 hover:text-black"
                  onClick={closeMenu}
                >
                  <Store size={22} aria-hidden="true" strokeWidth={2} />
                  Showrooms
                </Link>
                <Link
                  to="/brochures"
                  className="flex items-center gap-3 py-2 text-sm font-medium text-gray-800 hover:text-black"
                  onClick={closeMenu}
                >
                  <BookOpen size={20} aria-hidden="true" strokeWidth={2} />
                  Brochures
                </Link>
                <Link
                  to="/account"
                  className="flex items-center gap-3 py-2 text-sm font-medium text-gray-800 hover:text-black"
                  onClick={closeMenu}
                >
                  <User size={18} aria-hidden="true" strokeWidth={2} />
                  My account
                </Link>
              </nav>

              <div className="mt-6 border-b border-gray-100 pb-6">
                <label
                  htmlFor="country-select-drawer"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  Country
                </label>
                <select
                  id="country-select-drawer"
                  defaultValue="AE"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Categories
                </h2>
                <HeaderCategories variant="drawer" onNavigate={closeMenu} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
