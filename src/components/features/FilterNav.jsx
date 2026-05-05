import { useCallback, useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X, FilterX } from "lucide-react";
import SearchField from "../ui/SearchField";
import SectionLabel from "../ui/SectionLabel";
import FilterCategoryTile from "../ui/FilterCategoryTile";
import { categoryLogoById } from "../../common";

const clearFiltersBtnClass =
    "flex cursor-pointer items-center gap-2 text-left text-xs text-black underline underline-offset-2 hover:text-gray-700";

function ClearFiltersButton({ onClick, className = "", compact = false }) {
    if (compact) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-700 underline decoration-neutral-400 underline-offset-2 hover:bg-neutral-100 hover:text-neutral-900 ${className}`.trim()}
                aria-label="Clear all filters"
            >
                <FilterX size={14} aria-hidden strokeWidth={2} />
                Clear
            </button>
        );
    }
    return (
        <button type="button" onClick={onClick} className={`${clearFiltersBtnClass} ${className}`}>
            <FilterX size={16} aria-hidden strokeWidth={2} />
            Clear all filters
        </button>
    );
}

function FilterDrawerBody({
    showSearch = true,
    hideClear = false,
    search,
    setSearch,
    categories,
    activeCategories,
    toggleCategory,
    alphabet,
    activeLetter,
    setActiveLetter,
    clearAllFilters,
    hasActiveFilters,
}) {
    return (
        <>
            {showSearch ? (
                <div className="filter-nav">
                    <SectionLabel as="label" htmlFor="brands-filter-search">
                        SEARCH BRANDS
                    </SectionLabel>
                    <SearchField
                        id="brands-filter-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search brands by name"
                    />
                </div>
            ) : null}
            <div className="filter-nav">
                <SectionLabel as="h2">CATEGORIES</SectionLabel>
                <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
                    {categories.map((cat) => (
                        <FilterCategoryTile
                            key={cat.id}
                            categoryId={cat.id}
                            label={cat.label}
                            iconSrc={categoryLogoById[cat.id]}
                            checked={activeCategories.includes(cat.id)}
                            onToggle={() => toggleCategory(cat.id)}
                        />
                    ))}
                </ul>
            </div>
            <div className="filter-nav mt-4">
                <div
                    className={`mb-3 flex items-center gap-2 ${
                        hasActiveFilters && !hideClear ? "justify-between" : ""
                    }`}
                >
                    <SectionLabel as="h2" className="!mb-0">
                        A-Z FILTER
                    </SectionLabel>
                    {hasActiveFilters && !hideClear ? (
                        <ClearFiltersButton onClick={clearAllFilters} className="shrink-0" />
                    ) : null}
                </div>
                <ul className="grid grid-cols-4 gap-1.5 content-center">
                    {alphabet.map(({ id, letter, disabled }) => {
                        const active = activeLetter === letter;
                        return (
                            <li key={id}>
                                <button
                                    type="button"
                                    disabled={disabled}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => setActiveLetter(active ? null : letter)}
                                    aria-pressed={disabled ? undefined : active}
                                    aria-label={
                                        disabled
                                            ? `No brands for letter ${letter}`
                                            : active
                                                ? `Remove letter ${letter} filter`
                                                : `Filter brands by letter ${letter}`
                                    }
                                    className={`alpha-btn flex h-9 w-full items-center justify-center rounded
            ${active ? "alpha-btn--active" : ""}
            ${disabled ? "alpha-btn--disabled" : ""}
          `}
                                >
                                    <span aria-hidden="true">{letter}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

function FilterNav({
    search,
    setSearch,
    categories,
    activeCategories,
    setActiveCategories,
    toggleCategory,
    alphabet,
    activeLetter,
    setActiveLetter,
}) {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const popoverRef = useRef(null);
    const togglePopover = useCallback(() => {
        setMobileFilterOpen((o) => !o);
    }, []);
    const closePopover = useCallback(() => setMobileFilterOpen(false), []);

    const clearAllFilters = () => {
        setActiveLetter(null);
        setActiveCategories([]);
        setSearch("");
    };

    const hasActiveFilters =
        activeLetter != null ||
        search.trim().length > 0 ||
        activeCategories.length > 0;

    const drawerProps = {
        search,
        setSearch,
        categories,
        activeCategories,
        toggleCategory,
        alphabet,
        activeLetter,
        setActiveLetter,
        clearAllFilters,
        hasActiveFilters,
    };

    useEffect(() => {
        if (!mobileFilterOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") closePopover();
        };
        const onPointerDown = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                closePopover();
            }
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("touchstart", onPointerDown, { passive: true });
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("touchstart", onPointerDown);
        };
    }, [mobileFilterOpen, closePopover]);

    return (
        <>
            <aside
                className="filter-nav filternav_scroll sticky top-[var(--header-height)] hidden w-1/4 shrink-0 flex-col gap-1 self-start p-3 lg:flex overflow-y-auto"
                aria-label="Brand search and filters" style={{ height: "85dvh" }}
                data-lenis-prevent
            >
                <FilterDrawerBody {...drawerProps} />
            </aside>

            <div className="brands-mobile-filter-bar sticky top-[var(--header-height)] z-40 w-full bg-white lg:hidden">
                <div className="flex items-center gap-2">
                    <div className="relative shrink-0" ref={popoverRef}>
                        <button
                            type="button"
                            className="filter-nav flex shrink-0 items-center justify-center rounded-lg p-2.5 text-neutral-800 transition-colors hover:bg-neutral-200/60 data-[open=true]:bg-neutral-200/80"
                            data-open={mobileFilterOpen}
                            onClick={togglePopover}
                            aria-expanded={mobileFilterOpen}
                            aria-haspopup="true"
                            aria-controls="mobile-filter-popover"
                            aria-label={mobileFilterOpen ? "Close brand filters" : "Open brand filters"}
                        >
                            {mobileFilterOpen ? (
                                <X size={24} aria-hidden className="text-neutral-900" strokeWidth={2} />
                            ) : (
                                <SlidersHorizontal size={24} aria-hidden className="text-neutral-800" strokeWidth={2} />
                            )}
                        </button>
                        {mobileFilterOpen ? (
                            <div
                                id="mobile-filter-popover"
                                role="region"
                                aria-label="Brand filters"
                                className="absolute top-full left-0 z-[100] mt-1.5 flex max-h-[min(86dvh,28rem)] w-[min(calc(100vw-1.5rem),18rem)] flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-[#f8f8f8] shadow-lg"
                            >
                                <div
                                    className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 pb-14"
                                    data-lenis-prevent
                                >
                                    <FilterDrawerBody {...drawerProps} showSearch={false} hideClear />
                                </div>
                                {hasActiveFilters ? (
                                    <div className="pointer-events-none absolute bottom-0 left-0 p-3 pt-8 bg-gradient-to-t from-[#f8f8f8] from-50% to-transparent">
                                        <ClearFiltersButton
                                            onClick={clearAllFilters}
                                            className="pointer-events-auto"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                    {hasActiveFilters ? (
                        <ClearFiltersButton compact onClick={clearAllFilters} />
                    ) : null}
                    <SearchField
                        id="brands-filter-search-mobile"
                        className="min-w-0 flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search brands by name"
                    />
                </div>
            </div>
        </>
    );
}

export default FilterNav;
