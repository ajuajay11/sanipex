import { Link } from "react-router";
import StickyAlpha from "./StickyAlpha";
import LazyImage from "./LazyImage";
import LazyPicture from "./LazyPicture";
import { categoryLogoById, categoryLabelById } from "../../common";

const categoryIconClass =
  "h-9 w-9 shrink-0 object-contain bg-[var(--template-color-secondary)] p-2 rounded-full";

 const brandPagePath = (brand) => `/brands/${brand.slug ?? brand.id}`;

function CategoryBadges({ categories, brandName, wrapperClassName, variant = "standard" }) {
  const featured = variant === "featured";
  return (
    <div className={wrapperClassName}>
      {(categories ?? []).map((catId) => {
        const src = categoryLogoById[catId];
        if (!src) return null;
        const catTitle = categoryLabelById[catId] ?? "Category";
        const alt = `${catTitle} category`;
        if (featured) {
          return (
            <span
              key={catId}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-gray-900/5"
              aria-label={`${brandName}: ${alt}`}
            >
              <LazyImage src={src} alt="" className="h-6 w-6 object-contain opacity-70" />
            </span>
          );
        }
        return (
          <LazyImage key={catId} src={src} alt={alt} className={categoryIconClass} title={catTitle} />
        );
      })}
    </div>
  );
}

export default function BrandCard({ section, featured, standard, sectionTransition = "idle" }) {
  const sectionAnimClass =
    sectionTransition === "enter"
      ? "brand-section--enter"
      : sectionTransition === "exit"
        ? "brand-section--exit pointer-events-none"
        : "";

  return (
    <>
      <article
        id={`section-${section.letter}`}
        className={`brand-section relative mb-12 ${sectionAnimClass}`.trim()}
      >
        <StickyAlpha letter={section?.letter} />
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {featured.map((brand) => (
              <Link
                to={brandPagePath(brand)}
                key={brand.id}
                aria-label={`${brand.name}: view brand details`}
                className="brand-card group flex min-w-0 flex-row items-center gap-4 rounded-3xl border border-gray-100 bg-white p-3 shadow-sm"
              >
                <div className="relative w-2/5 shrink-0 h-44 rounded-2xl overflow-hidden">
                  <LazyPicture
                    webpSrc={brand.image || brand.logo}
                    alt={`${brand.name} featured image`}
                    pictureClassName="block h-full w-full"
                    imgClassName="brand-card-img h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2 py-1 pr-2">
                  <LazyPicture
                    webpSrc={brand.logo}
                    alt=""
                    pictureClassName="block h-6 max-w-[100px]"
                    imgClassName="h-6 max-w-[100px] object-contain"
                  />
                   <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{brand.description}</p>
                  <CategoryBadges
                    brandName={brand.name}
                    categories={brand.categories}
                    wrapperClassName="flex flex-wrap gap-1 [&>*]:bg-gray-100 [&>*]:text-gray-600 [&>*]:text-[11px] [&>*]:rounded-full [&>*]:px-2 [&>*]:py-0.5"
                    variant="featured"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
        {standard.length > 0 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-4">
            {standard.map((brand) => (
              <Link
                to={brandPagePath(brand)}
                key={brand.id}
                aria-labelledby={`brand-card-standard-${brand.id}`}
                className="brand-card brand-card--standard relative group flex min-h-[180px] min-w-0 flex-col items-center justify-between px-3 py-5 sm:min-h-[220px] sm:px-4 md:min-h-[240px] lg:min-h-[260px]"
              >
                <div className="relative flex-1 flex items-center justify-center w-full">
                  <LazyPicture
                    webpSrc={brand.logo}
                    alt=""
                    pictureClassName="brand-card__logo block h-[60%] w-[60%] sm:h-[65%] sm:w-[65%] md:h-[70%] md:w-[70%]"
                    imgClassName="h-full w-full object-contain"
                  />
                  <span
                    id={`brand-card-standard-${brand.id}`}
                    className="brand-card__name text-xs sm:text-sm font-semibold text-gray-800 text-center"
                  >
                    {brand.name}
                  </span>
                  <CategoryBadges
                    brandName={brand.name}
                    categories={brand.categories}
                    wrapperClassName="absolute -bottom-3.5 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
