import BenefitsSection from "./components/BenefitsSection";
import CollectionsSection from "./components/CollectionsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="mx-auto max-w-7xl">
        <CollectionsSection />
        <FeaturedProducts />
      </div>
        <BenefitsSection />
    </div>
  );
}
