import { useEffect, useMemo, useState } from "react";
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

    const toggleCategory = (id) => {
        setActiveCategories((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen">
            <BrandsHero />

            <FullWidthSection className="py-2 lg:py-5 flex flex-col items-start gap-8 lg:flex-row">
                <FilterNav search={search} setSearch={setSearch} categories={categories} activeCategories={activeCategories} setActiveCategories={setActiveCategories} toggleCategory={toggleCategory} alphabet={alphabet} activeLetter={activeLetter} setActiveLetter={setActiveLetter} />
                <main className="flex-1 w-full min-w-0">
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