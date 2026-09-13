import BenefitsSection from "./components/BenefitsSection";
import CollectionsSection from "./components/CollectionsSection";
import FeatureBrandsSection from "./components/FeatureBrandsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import HeroSection from "./components/HeroSection";
import SaleBannerSection from "./components/SaleBannerSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <HeroSection />
      <div className="mx-auto w-full 2xl:max-w-[1440px]">
        <CollectionsSection />
        <FeaturedProducts />
        <SaleBannerSection />
        <FeatureBrandsSection />
      </div>
        <BenefitsSection />
    </div>
  );
}
