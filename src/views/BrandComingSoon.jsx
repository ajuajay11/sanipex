import { Link, useParams } from "react-router";
import brandsData from "../data/brand.json";
import FullWidthSection from "../components/ui/FullWidthSection";
import LazyImage from "../components/ui/LazyImage";
import LazyPicture from "../components/ui/LazyPicture";
import { logo } from "../common";

 function findBrandFromJson(param) {
  if (!param) return null;
  let key;
  try {
    key = decodeURIComponent(param);
  } catch {
    key = param;
  }
  for (const section of brandsData.sections) {
    for (const b of section.brands) {
      if (b.slug === key || b.id === key) return b;
    }
  }
  return null;
}

function formatBrandTitle(slug) {
  if (!slug) return "Brand";
  try {
    return decodeURIComponent(slug).replace(/-/g, " ");
  } catch {
    return slug.replace(/-/g, " ");
  }
}

export default function BrandComingSoon() {
  const { name } = useParams();
  const brand = findBrandFromJson(name);
  const displayName = brand?.name ?? formatBrandTitle(name);
  const heroSrc = brand?.image || brand?.logo || null;

  return (
    <div className="min-h-screen brands-page">
      <FullWidthSection bg="bg-[#f8f8f8]" className="py-1">
        <nav className="flex flex-wrap items-center gap-2 text-gray-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/brands" className="hover:text-gray-700 transition-colors">
            Brands
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-700" aria-current="page">
            {displayName}
          </span>
        </nav>
      </FullWidthSection>

      <FullWidthSection className="py-12">
        <main className="mx-auto flex max-w-lg flex-col items-center text-center">
          <LazyImage
            src={logo}
            alt="Sanipex Group"
            className="mb-8 h-12 w-auto max-w-[280px] object-contain md:h-14"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {heroSrc ? (
            <LazyPicture
              webpSrc={heroSrc}
              alt=""
              pictureClassName="mb-8 block h-40 w-full max-w-md overflow-hidden rounded-2xl shadow-md"
              imgClassName="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : null}
          <h1 className="m-0 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
            Coming soon
          </h1>
          <p className="mt-3 text-pretty text-gray-600">
            The <span className="font-medium text-gray-800">{displayName}</span> page is under
            construction. Check back later for full brand details.
          </p>
          <Link
            to="/brands"
            className="mt-8 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Back to all brands
          </Link>
        </main>
      </FullWidthSection>
    </div>
  );
}
