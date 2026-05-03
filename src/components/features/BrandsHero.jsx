import { Link } from "react-router";
import FullWidthSection from "../ui/FullWidthSection";
import LazyImage from "../ui/LazyImage";

const HERO_SRC =
  "https://sanipexgroup.com/cdn-cgi/image/format=webp,width=2200,height=500/https://sanipexgroup.com/media/catalog/category/CARLYLE_HERO_BANNER.webp";

const crumbLinkClass =
  "text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm";
 
export default function BrandsHero() {
  return (
    <FullWidthSection bg="bg-[#f8f8f8]" className="pb-3 pt-4 lg:pb-5">
      <div
        className="relative w-full overflow-hidden rounded-2xl ring-1 ring-black/10 lg:rounded-3xl"
        style={{ aspectRatio: "220 / 50" }}
      >
        <LazyImage
          src={HERO_SRC}
          alt="Sanipex Group — Carlyle hero banner"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45"
          aria-hidden
        />

        <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-between gap-6 p-4 sm:p-5 md:min-h-0 md:p-6 lg:p-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className={crumbLinkClass}>
              Home
            </Link>
            <span className="text-white/50" aria-hidden="true">
              /
            </span>
            <span className="font-medium text-white" aria-current="page">
              Brands
            </span>
          </nav>

          <header className="max-w-2xl text-center md:text-left">
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
              Brands
            </h1>
            <p className="mb-0 mt-2 text-pretty text-sm text-white/90 drop-shadow-sm sm:text-base">
              {"Shop 1000's of products from leading global brands."}
            </p>
          </header>
        </div>
      </div>
    </FullWidthSection>
  );
}
