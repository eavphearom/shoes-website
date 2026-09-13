import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 360);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-20 cursor-pointer right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_12px_30px_rgba(249,115,22,0.35)] transition duration-300 hover:bg-[#EA580C] md:bottom-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={21} strokeWidth={2.6} />
    </button>
  );
}
