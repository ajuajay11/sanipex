 import RecommendedForYou from "../components/features/RecommendedForYou";
import FeaturedCollections from "../components/features/FeaturedCollections";
import Hero from "../components/features/Hero";

export default function Landing() {
  return (
    <main>
      <Hero />
      <RecommendedForYou />
      <FeaturedCollections />
    </main>
  );
}
