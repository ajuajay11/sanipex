import FullWidthSection from "../ui/FullWidthSection";
import LazyImage from "../ui/LazyImage";
import { collections } from "../../data/collections";
import { Link } from "react-router";

const collectionItemClass =
  "group relative block overflow-hidden rounded-2xl ring-1 ring-black/5 outline-offset-2 transition-shadow focus-visible:outline focus-visible:ring-2 focus-visible:ring-neutral-900";

const imgClass =
  "absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]";

export default function FeaturedCollections() {
  return (
    <FullWidthSection className="py-10 md:py-14">
      <section aria-labelledby="featured-collections-heading">
        <h2
          id="featured-collections-heading"
          className="mb-6 text-center text-lg font-semibold tracking-tight text-neutral-700 md:mb-8 md:text-xl"
        >
          Featured Collections
        </h2>

        <div className="scrollbar-hide overflow-x-auto overscroll-contain">
          <div className="flex gap-3 pb-2 md:gap-4">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to="/brands"
                className={`${collectionItemClass} h-32 w-32 flex-shrink-0 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56`}
                aria-label={`${collection.label} collection`}
              >
              <LazyImage
                src={collection.image}
                alt={collection.label}
                className={imgClass}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
                <span className="px-4 py-3 text-sm font-semibold text-white">
                  {collection.label}
                </span>
              </div>
            </Link>
            ))}
          </div>
        </div>
      </section>
    </FullWidthSection>
  );
}
