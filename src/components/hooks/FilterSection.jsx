export function filterSections({ sections, debouncedSearch, activeLetter, activeCategories }) {
    return sections
        .filter((s) => !activeLetter || s.letter === activeLetter)
        .map((s) => ({
            ...s,
            brands: s.brands.filter((b) => {
                const matchSearch = !debouncedSearch || b.name.toLowerCase().includes(debouncedSearch.toLowerCase());
                const matchCat = activeCategories.length === 0 || b.categories.some((c) => activeCategories.includes(c));
                return matchSearch && matchCat;
            }),
        }))
        .filter((s) => s.brands.length > 0);
}