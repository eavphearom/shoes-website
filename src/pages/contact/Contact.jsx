import useScrollReveal from "../../hooks/useScrollReveal";
import { ContactFormCard } from "./components/ContactFormCard";
import { ContactHero } from "./components/ContactHero";
import { ContactInfoCard } from "./components/ContactInfoCard";
import { FollowUsCard } from "./components/FollowUsCard";
import { LocationSection } from "./components/LocationSection";
import { QuickHelpCard } from "./components/QuickHelpCard";

export default function Contact() {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef} className="overflow-hidden bg-white">
      <ContactHero />

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] items-start gap-5 lg:grid-cols-[0.8fr_0.42fr]">
          <div data-scroll-reveal="left" className="grid content-start gap-5">
            <ContactFormCard />
            <FollowUsCard />
          </div>

          <div data-scroll-reveal="right" className="grid content-start gap-5">
            <ContactInfoCard />
            <QuickHelpCard />
          </div>
        </div>
      </section>

      <LocationSection />
    </div>
  );
}
