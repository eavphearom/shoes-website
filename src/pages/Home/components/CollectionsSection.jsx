import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import banner1 from "../../../assets/banner/banner1.png";
import banner3 from "../../../assets/banner/banner3.png";
import productImage from "../../../assets/product/image.png";
import sneakersImage from "../../../assets/product/images.png";

export default function CollectionsSection() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-15 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className=" font-michroma text-lg font-extrabold text-[#07182E] sm:text-xl">
              Curated Collections
            </h2>

            <p className="mt-1 text-xs font-michroma font-medium text-[#5F6B7A]">
              Find your perfect fit for any occasion.
            </p>
          </div>

          <Link
            to="/shop"
            className="hidden items-center font-michroma gap-1 text-[10px] font-extrabold uppercase tracking-wide text-[#07182E] transition-colors hover:text-[#F97316] sm:inline-flex"
          >
            View all categories
            <ArrowRight size={12} strokeWidth={2.8} />
          </Link>
        </div>

        {/* Collections */}
        <div className="grid gap-4 lg:h-[430px] lg:grid-cols-[0.95fr_1.05fr]">
          {/* Main Card */}
          <Link
            to="/shop"
            className="group relative h-[320px] overflow-hidden rounded-lg bg-[#F3F4F6] lg:h-full"
          >
            <img
              src={sneakersImage}
              alt="Signature Sneakers"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white">
              <div>
                <span className="mb-2 font-michroma inline-flex rounded-sm bg-white px-2 py-1 text-[8px] font-extrabold uppercase tracking-wide text-[#6B7280]">
                  Essential
                </span>

                <h3 className="text-base font-michroma font-extrabold leading-tight">
                  Signature Sneakers
                </h3>
              </div>

              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#07182E] transition-all duration-300 group-hover:bg-[#F97316] group-hover:text-white"
                aria-hidden="true"
              >
                <ArrowRight size={15} strokeWidth={2.8} />
              </span>
            </div>
          </Link>

          {/* Right Side */}
          <div className="grid gap-4 lg:h-full lg:grid-rows-[0.48fr_0.52fr]">
            {/* Top Two Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:h-full">
              <Link
                to="/shop"
                className="group relative h-[180px] overflow-hidden rounded-lg bg-[#F3F4F6] lg:h-full"
              >
                <img
                  src={productImage}
                  alt="Performance"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <h3 className="absolute font-michroma bottom-4 left-4 text-sm font-extrabold leading-tight text-white">
                  Performance
                </h3>
              </Link>

              <Link
                to="/shop"
                className="group relative h-[180px] overflow-hidden rounded-lg bg-[#F3F4F6] lg:h-full"
              >
                <img
                  src={banner3}
                  alt="Lifestyle"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <h3 className="absolute font-michroma bottom-4 left-4 text-sm font-extrabold leading-tight text-white">
                  Lifestyle
                </h3>
              </Link>
            </div>

            {/* Bottom Card */}
            <Link
              to="/shop"
              className="group relative h-[200px] overflow-hidden rounded-lg bg-[#F3F4F6]"
            >
              <img
                src={banner1}
                alt="Modern Classics"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-base font-michroma font-extrabold leading-tight">
                  Modern Classics
                </h3>

                <p className="mt-1 text-xs font-michroma font-medium text-white/85">
                  Refined elegance for the evening.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile View All */}
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-[#07182E] transition-colors hover:text-[#F97316] sm:hidden"
        >
          View all categories
          <ArrowRight size={12} strokeWidth={2.8} />
        </Link>
      </div>
    </section>
  );
}
