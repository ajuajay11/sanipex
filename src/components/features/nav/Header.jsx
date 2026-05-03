import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import TopHeader from "./TopHeader";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import HeaderCategories from "./HeaderCategories";
import FullWidthSection from "../../ui/FullWidthSection";
import MobileDrawer from "./MobileDrawer";
import { logo } from "../../../common";
import headerData from "../../../data/headerCategories";
const { countries } = headerData;

const cartCount = 3;

const DRAWER_MS = 320;

export default function Header() {
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerEntered, setDrawerEntered] = useState(false);
  const [languageDrawerOpen, setLanguageDrawerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("AE");
const headerRef = useRef(null);

useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const closeMenu = useCallback(() => {
    setDrawerEntered(false);
    setLanguageDrawerOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setDrawerMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawerEntered(true));
    });
  }, []);

  const toggleLanguageDrawer = useCallback(() => {
    setLanguageDrawerOpen((open) => !open);
  }, []);

  const closeLanguageDrawer = useCallback(() => {
    setLanguageDrawerOpen(false);
  }, []);

  const handleSelectCountry = useCallback((code) => {
    setSelectedCountry(code);
    setLanguageDrawerOpen(false);
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
    if (!drawerEntered) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerEntered]);

  useEffect(() => {
    if (!drawerMounted || !drawerEntered) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerMounted, drawerEntered, closeMenu]);

  useEffect(() => {
    if (!languageDrawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLanguageDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [languageDrawerOpen, closeLanguageDrawer]);

  return (
    <>
      <div className="hidden border-b border-gray-100 lg:block">
        <FullWidthSection bg="bg-white">
          <TopHeader />
        </FullWidthSection>
      </div>

      <header className="topheader sticky top-0 z-50 w-full bg-white shadow-sm" ref={headerRef}>

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
              width={160}
              height={48}
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          <div role="search">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <div className="flex items-center gap-2  bg-[var(--template-color-tertiary)] rounded-full border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400">
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

          <div className="flex items-center justify-end gap-3">
            <Link
              to="/showrooms"
              className="flex items-center gap-2 text-xs text-gray-700 hover:text-black"
              aria-label="Showrooms"
            >
              <img
                src="https://sanipexgroup.com/media/wysiwyg/Showroom_Icon.svg"
                alt=""
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>Showrooms</span>
            </Link>

            <Link
              to="/brochures"
              className="flex items-center gap-2 rounded text-xs hover:text-black"
              aria-label="Download Brochures"
            >
              <img
                src="https://sanipexgroup.com/media/wysiwyg/Brochure_Icon.svg"
                alt=""
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>Brochures</span>
            </Link>

            <div className="flex items-center justify-end gap-1">
               <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={toggleLanguageDrawer}
                  aria-expanded={languageDrawerOpen}
                  aria-haspopup="true"
                >
                  <span>{countries.find((c) => c.code === selectedCountry)?.flag}</span>
                </button>
                {languageDrawerOpen ? (
                  <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ">
                    <div className="flex flex-col">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleSelectCountry(country.code)}
                          className="flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span>{country.flag}</span>
                          <span>{country.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <Link to="/account" aria-label="My account" className="text-gray-700 hover:text-black p-1">
                <User size={18} aria-hidden="true" strokeWidth={2} />
              </Link>

              <span aria-hidden="true" className="text-lg font-light text-gray-300">|</span>

              <Link
                to="/cart"
                aria-label={`Shopping cart, ${cartCount} items`}
                className="flex items-center gap-1.5 text-gray-700 hover:text-black"
              >
                <ShoppingCart size={18} aria-hidden="true" strokeWidth={2} />
                <span className="text-sm font-medium">{cartCount}</span>
              </Link>
            </div>



          </div>
        </div>
      </FullWidthSection>

      {drawerMounted ? (
        <MobileDrawer
          drawerMounted={drawerMounted}
          drawerEntered={drawerEntered}
          DRAWER_MS={DRAWER_MS}
          closeMenu={closeMenu}
          handlePanelTransitionEnd={handlePanelTransitionEnd}
          toggleLanguageDrawer={toggleLanguageDrawer}
          languageDrawerOpen={languageDrawerOpen}
          selectedCountry={selectedCountry}
          handleSelectCountry={handleSelectCountry}
          countries={countries}
        />
      ) : null}
    </header>

    <div className="hidden border-b border-gray-100 lg:block">
      <FullWidthSection bg="bg-white">
        <HeaderCategories />
      </FullWidthSection>
    </div>
    </>
  );
}
