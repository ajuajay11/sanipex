import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import FullWidthSection from "../components/ui/FullWidthSection";
import brandsData from "../data/brand.json";
import Skeleton from "../components/skeleton/Skeleton";
import useDebounce from "../components/hooks/Debounce";
import { filterSections } from "../components/hooks/FilterSection";
import BrandCard from "../components/ui/BrandCard";
import FilterNav from "../components/features/FilterNav";
import BrandsHero from "../components/features/BrandsHero";

const sections = brandsData.sections;
const alphabet = brandsData.filters.alphabet;
const categories = brandsData.filters.categories;

export default function Brands() {
    const [search, setSearch] = useState("");
    const [activeCategories, setActiveCategories] = useState([]);
    const [activeLetter, setActiveLetter] = useState(null);
    const [loading, setLoading] = useState(true);
    const debouncedSearch = useDebounce(search, 1000);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredSections = useMemo(() => {
        return filterSections({ sections, debouncedSearch, activeLetter, activeCategories });
    }, [debouncedSearch, activeLetter, activeCategories]);

    const filteredBrandCount = useMemo(
        () => filteredSections.reduce((n, s) => n + s.brands.length, 0),
        [filteredSections],
    );

    const toggleCategory = (id) => {
        setActiveCategories((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const lenis = useLenis();
    const brandsMainRef = useRef(null);
    const prevFilterSigRef = useRef(null);

    const userFilterSignature = useMemo(
        () =>
            `${activeLetter ?? ""}|${debouncedSearch}|${[...activeCategories].sort().join(",")}`,
        [activeLetter, debouncedSearch, activeCategories],
    );

    const clampLenisToContent = useCallback(() => {
        if (lenis) {
            lenis.resize();
            const el = document.documentElement;
            const nativeMax = Math.max(0, el.scrollHeight - el.clientHeight);
            const max = Math.min(lenis.limit, nativeMax);
            if (nativeMax <= 0.5 && lenis.scroll > 0.5) {
                lenis.scrollTo(0, { immediate: true });
                return;
            }
            if (lenis.scroll > max + 0.5) {
                lenis.scrollTo(max, { immediate: true });
            }
            return;
        }
        const el = document.documentElement;
        const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
        if (window.scrollY > maxScroll) {
            window.scrollTo(0, maxScroll);
        }
    }, [lenis]);

    const scrollBrandsSectionIntoView = useCallback(() => {
        const anchor = document.getElementById("brands-content");
        if (!anchor) return;
        const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim();
        const headerPx = parseFloat(raw);
        const offset = -(Number.isFinite(headerPx) ? headerPx : 0) - 12;

        if (lenis) {
            lenis.resize();
            lenis.scrollTo(anchor, { offset, immediate: true });
            return;
        }
        const top = anchor.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo(0, Math.max(0, top));
    }, [lenis]);

    useLayoutEffect(() => {
        if (loading) return;

        const prev = prevFilterSigRef.current;
        const isUserFilterChange = prev !== null && prev !== userFilterSignature;
        prevFilterSigRef.current = userFilterSignature;

        let canceled = false;
        const clamp = () => {
            if (!canceled) clampLenisToContent();
        };

        const runScroll = () => {
            if (canceled) return;
            if (isUserFilterChange) {
                const sparse = filteredBrandCount <= 8;
                if (sparse) {
                    if (lenis) {
                        lenis.resize();
                        lenis.scrollTo(0, { immediate: true });
                    } else {
                        window.scrollTo(0, 0);
                    }
                }
                scrollBrandsSectionIntoView();
            }
            clamp();
        };

        let innerRaf = 0;
        const outerRaf = requestAnimationFrame(() => {
            innerRaf = requestAnimationFrame(runScroll);
        });
        const t150 = window.setTimeout(clamp, 150);
        const t320 = window.setTimeout(clamp, 320);
        const t480 = window.setTimeout(clamp, 480);

        return () => {
            canceled = true;
            cancelAnimationFrame(outerRaf);
            cancelAnimationFrame(innerRaf);
            clearTimeout(t150);
            clearTimeout(t320);
            clearTimeout(t480);
        };
    }, [loading, userFilterSignature, filteredBrandCount, lenis, clampLenisToContent, scrollBrandsSectionIntoView]);

    useLayoutEffect(() => {
        const el = brandsMainRef.current;
        if (!el) return;
        let raf = 0;
        const schedule = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                clampLenisToContent();
            });
        };
        const ro = new ResizeObserver(schedule);
        ro.observe(el);
        return () => {
            ro.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [clampLenisToContent]);

    return (
        <div className="min-h-screen">
            <BrandsHero />

            <FullWidthSection className="py-2 lg:py-5 flex flex-col items-start gap-8 lg:flex-row" id="brands-content">
                <FilterNav search={search} setSearch={setSearch} categories={categories} activeCategories={activeCategories} setActiveCategories={setActiveCategories} toggleCategory={toggleCategory} alphabet={alphabet} activeLetter={activeLetter} setActiveLetter={setActiveLetter} />
                <main ref={brandsMainRef} className="overflow-anchor-none flex-1 w-full min-w-0">
                    {loading ? (
                        <Skeleton feature={2} standard={10} />
                    ) : filteredSections.length > 0 ? (
                        filteredSections.map((section) => {
                            const featured = section.brands.filter((b) => b.type === "featured");
                            const standard = section.brands.filter((b) => b.type === "standard");
                            return (
                                <BrandCard key={section?.letter} section={section} featured={featured} standard={standard} />
                            );
                        })
                    ) : (
                        <p className="text-neutral-500 py-20 text-center" role="status">
                            No brands match "{search}".
                        </p>
                    )}
                </main>

            </FullWidthSection>
        </div>
    );
}