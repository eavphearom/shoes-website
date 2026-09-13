import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import saleBanner from "../../../assets/banner/banner4.png";

export default function SaleBannerSection() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative mx-auto overflow-hidden rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
        <img
          src={saleBanner}
          alt="Runner wearing orange shoes"
          className="h-[360px] w-full object-cover object-center sm:h-[390px] lg:h-[430px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/95 via-[#07111F]/62 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/35 via-transparent to-transparent" />

        <div className="absolute inset-y-0 left-0 flex max-w-2xl flex-col justify-center px-6 py-8 text-white sm:px-10 lg:px-16">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#F97316]/20 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#FB923C] ring-1 ring-[#F97316]/35">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
            Limited time event
          </span>

          <h2 className="font-heading text-xl md:text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
            Step into
            <br />
            the <span className="text-[#FB7A3B]">sale.</span>
          </h2>

          <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-white/78 sm:text-base">
            Save up to 30% on selected running shoes and everyday silhouettes
            built for comfort, speed, and city momentum.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#FF5A1F] px-6 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(255,90,31,0.35)] transition hover:bg-[#EA4F18]"
          >
            Shop Sale Collection
            <ArrowRight size={16} strokeWidth={2.8} />
          </Link>

          <p className="mt-4 text-[10px] font-bold text-white/55 sm:text-xs">
            Exclusions apply. Discount auto-applied at checkout.
          </p>
        </div>
      </div>
    </section>
  );
}
