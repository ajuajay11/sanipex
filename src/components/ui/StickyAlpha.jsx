export default function StickyAlpha({ letter }) {
    const safe = letter != null ? String(letter) : "";
    return (
        <div className="sticky-alpha-bar pointer-events-none z-10 lg:mb-6 mb-3">
            <h2 className="stickyAlpha" aria-label={safe ? `Brands starting with ${safe}` : "Brand section"}>
                {letter}
            </h2>
        </div>
    );
}