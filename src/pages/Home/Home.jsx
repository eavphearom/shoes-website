import useScrollReveal from "../../hooks/useScrollReveal";
import BenefitsSection from "./components/BenefitsSection";
import CollectionsSection from "./components/CollectionsSection";
import FeatureBrandsSection from "./components/FeatureBrandsSection";
import HeroSection from "./components/HeroSection";
import NewArrivals from "./components/NewArrivals";
import SaleBannerSection from "./components/SaleBannerSection";

export default function Home() {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef} className="min-h-screen overflow-x-hidden bg-white">
      <HeroSection/>
      <div className="mx-auto w-full 2xl:max-w-[1440px]">
        <CollectionsSection />
        <NewArrivals />
        <SaleBannerSection />
        <FeatureBrandsSection />
      </div>
      <BenefitsSection />
    </div>
  );
}
