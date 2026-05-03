import { Link } from "react-router";
import FullWidthSection from "../ui/FullWidthSection";
import LazyImage from "../ui/LazyImage";

const COLLECTION_IMG =
  "https://sanipexgroup.com/cdn-cgi/image/format=webp,width=auto,height=auto/https://sanipexgroup.com/media/catalog/category/HOME_PAGE_COLLECTION_OF_THE_MONTH_SQUARE_OPTION_4__2.webp";
const NEW_ARRIVALS_IMG =
  "https://sanipexgroup.com/cdn-cgi/image/format=webp,width=auto,height=auto/https://sanipexgroup.com/media/catalog/category/Untitled_design_29_.png";
const SALE_IMG =
  "https://sanipexgroup.com/cdn-cgi/image/format=webp,width=auto,height=auto/https://sanipexgroup.com/media/catalog/category/Untitled_design_28_.png";

const tileLinkClass =
  "group relative block overflow-hidden rounded-2xl ring-1 ring-black/5 outline-offset-2 transition-shadow focus-visible:outline focus-visible:ring-2 focus-visible:ring-neutral-900";

const imgClass =
  "absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]";

const badgeBase =
  "absolute bottom-0 left-0 z-10 rounded-sm px-4 py-1 text-left text-[11px] font-semibold leading-tight text-white sm:text-xs";

export default function RecommendedForYou({
  link = "/brands",
}) {
  return (
    <FullWidthSection className="py-10 md:py-14">
      <section aria-labelledby="recommended-for-you-heading">
        <h2
          id="recommended-for-you-heading"
          className="mb-6 text-center text-lg font-semibold tracking-tight text-neutral-700 md:mb-8 md:text-xl"
        >
          Recommended for you
        </h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-4 md:min-h-[min(520px,72vh)]">
          <Link
            to={link}
            className={`${tileLinkClass} min-h-[min(280px,55vw)] md:row-span-2 md:min-h-0`}
            aria-label="Collection of the Month — view collection"
          >
            <LazyImage
              src={COLLECTION_IMG}
              alt="Modern interior wall lighting — Collection of the Month"
              className={imgClass}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <span className={`${badgeBase} bg-[var(--accent)]`}>Collection of the Month</span>
          </Link>

          <Link
            to={link}
            className={`${tileLinkClass} min-h-[min(200px,40vw)] md:min-h-0`}
            aria-label="New Arrivals — view latest products"
          >
            <LazyImage
              src={NEW_ARRIVALS_IMG}
              alt="Outdoor patio furniture by the sea — New Arrivals"
              className={imgClass}
            />
            <span className={`${badgeBase} bg-[var(--template-color-primary)]`}>New Arrivals</span>
          </Link>

          <Link
            to={link}
            className={`${tileLinkClass} min-h-[min(200px,40vw)] md:min-h-0`}
            aria-label="Sale — view promotional offers"
          >
            <LazyImage
              src={SALE_IMG}
              alt="Sale — promotional offers"
              className={imgClass}
            />

          </Link>
        </div>
      </section>
    </FullWidthSection>
  );
}
