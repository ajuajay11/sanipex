import { Link } from "react-router";
import { Search, User, X } from "lucide-react";
import TopHeader from "./TopHeader";
import HeaderCategories from "./HeaderCategories";

export default function MobileDrawer({
  drawerMounted,
  drawerEntered,
  DRAWER_MS,
  closeMenu,
  handlePanelTransitionEnd,
  toggleLanguageDrawer,
  languageDrawerOpen,
  selectedCountry,
  handleSelectCountry,
  countries,
}) {
  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-[60] bg-black/40 lg:hidden ${
          drawerEntered ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
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
        className={`fixed inset-y-0 left-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl lg:hidden ${
          drawerEntered ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          transitionProperty: "transform",
          transitionDuration: `${DRAWER_MS}ms`,
          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        onTransitionEnd={handlePanelTransitionEnd}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 p-1 relative">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-800 hover:bg-gray-100 absolute right-1 top-1"
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

          <div className="mt-2 border-b border-gray-100 pb-2" role="search">
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
                list="drawer-search-datalist"
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
              <img
                src="https://sanipexgroup.com/media/wysiwyg/Showroom_Icon.svg"
                alt=""
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              Showrooms
            </Link>
            <Link
              to="/brochures"
              className="flex items-center gap-3 py-2 text-sm font-medium text-gray-800 hover:text-black"
              onClick={closeMenu}
            >
              <img
                src="https://sanipexgroup.com/media/wysiwyg/Brochure_Icon.svg"
                alt=""
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
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
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Country
            </span>
            <div className="relative">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                onClick={toggleLanguageDrawer}
                aria-expanded={languageDrawerOpen}
                aria-haspopup="true"
              >
                <span className="flex items-center gap-2">
                  <span>{countries.find((c) => c.code === selectedCountry)?.flag}</span>
                  <span>{countries.find((c) => c.code === selectedCountry)?.label}</span>
                </span>
                <span className="text-gray-400">▾</span>
              </button>
              {languageDrawerOpen ? (
                <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
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
  );
}