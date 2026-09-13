import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import welcomeImage from "../../assets/welcome_page/welcome.png";

const SPLASH_DURATION = 1500;
const FADE_DURATION = 300;

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

export default function SplashScreen({ enabled = true }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : isMobileViewport(),
  );
  const [isDone, setIsDone] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleSkip = () => {
    setIsLeaving(true);

    window.setTimeout(() => {
      setIsDone(true);
    }, FADE_DURATION);
  };

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const handleViewportChange = (event) => {
      setIsMobile(event.matches);
    };

    mobileQuery.addEventListener("change", handleViewportChange);

    return () => {
      mobileQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !isMobile) {
      return undefined;
    }

    const fadeTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, SPLASH_DURATION);

    const hideTimer = window.setTimeout(() => {
      setIsDone(true);
    }, SPLASH_DURATION + FADE_DURATION);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [enabled, isMobile]);

  if (isDone || !enabled || !isMobile) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-dvh flex-col overflow-hidden bg-[#FFFCF8] px-6 py-8 text-[#07182E] transition-opacity duration-300 md:hidden ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute -left-24 top-64 h-80 w-80 rounded-full border border-[#FED7AA]" />
      <div className="absolute -right-28 bottom-[-96px] h-64 w-64 rounded-full bg-[#FFEDD5]" />
      <div className="absolute left-1/2 top-56 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FFF1E6]" />

      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-5 top-5 z-20 rounded-full bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#07182E] shadow-[0_12px_28px_rgba(15,23,42,0.1)] backdrop-blur-md transition hover:bg-white active:scale-95"
      >
        Skip
      </button>

      <div className="relative z-10 flex justify-center pt-4">
        <div className="inline-flex items-end gap-1">
          <span className="text-3xl font-extrabold leading-none text-[#F97316]">
            Go
          </span>
          <ShoppingBag size={31} className="-mb-1 text-[#F97316]" />
          <span className="text-3xl font-extrabold leading-none">shoes</span>
        </div>
      </div>

      <div className="relative z-10 mt-10 flex flex-1 flex-col items-center justify-center">
        <img
          src={welcomeImage}
          alt="Welcome shoe"
          className="max-h-[43dvh] w-full max-w-[360px] object-contain drop-shadow-[0_26px_34px_rgba(15,23,42,0.14)]"
        />

        <div className="mt-9 text-center">
          <h1 className="text-[48px] font-black leading-[0.98] tracking-tight text-[#07182E] min-[390px]:text-[54px]">
            Step Into
            <span className="block text-[#F97316]">Style</span>
          </h1>
          <p className="mt-5 text-[15px] font-medium tracking-[0.28em] text-[#5F6B7A]">
            Modern shoes for every step.
          </p>
        </div>
      </div>

      {/* <div className="relative z-10 flex flex-col items-center pb-2">
        <div className="flex items-center gap-4">
          <span className="h-3 w-3 rounded-full bg-[#F97316]" />
          <span className="h-3 w-3 rounded-full bg-[#D1D5DB]" />
          <span className="h-3 w-3 rounded-full bg-[#D1D5DB]" />
        </div>
        <p className="mt-5 text-sm font-medium tracking-[0.32em] text-[#6B7280]">
          Loading...
        </p>
      </div> */}
    </div>
  );
}
