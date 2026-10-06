import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import useBanners from "../../../hooks/useBanners";

export default function HeroSection() {
  const { banners, loading, error } = useBanners();

  if (loading) {
    return (
      <section className="h-[520px] bg-black sm:h-[640px] lg:h-[calc(100vh-74px)]" />
    );
  }

  if (error) {
    console.error("Failed to load banners:", error);
    return null;
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="hero-carousel relative overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop={banners.length > 1}
        speed={900}
        autoplay={
          banners.length > 1
            ? {
                delay: 4500,
                disableOnInteraction: false,
              }
            : false
        }
        navigation={{
          prevEl: ".hero-carousel-prev",
          nextEl: ".hero-carousel-next",
        }}
        pagination={{
          el: ".hero-carousel-pagination",
          clickable: true,
        }}
        className="h-[520px] sm:h-[640px] lg:h-[calc(100vh-74px)]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

              <div className="absolute inset-x-0 bottom-20 mx-auto max-w-[1500px] px-5 sm:bottom-24 sm:px-8 lg:px-12">
                <div data-scroll-reveal="up"
                  className="max-w-md"
                >
                  {banner.subtitle && (
                    <p className="font-heading text-xs font-extrabold uppercase tracking-[0.35em] text-white/80 sm:text-sm">
                      {banner.subtitle}
                    </p>
                  )}

                  <h1 className="mt-3 font-michroma text-3xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-5xl">
                    {banner.title}
                  </h1>

                  <Link
                    to="/shop"
                    className="mt-6 inline-flex h-12 items-center justify-center bg-[#E96400] px-7 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#C95500]"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {banners.length > 1 && (
        <>
          <div
            className="hero-carousel-pagination absolute right-auto! bottom-5 left-1/2!
            z-10 flex w-auto! -translate-x-1/2! items-center justify-center gap-2
            [&_.swiper-pagination-bullet-active]:w-8
            [&_.swiper-pagination-bullet-active]:bg-[#E96400]
            [&_.swiper-pagination-bullet]:mx-0!
            [&_.swiper-pagination-bullet]:h-2.5
            [&_.swiper-pagination-bullet]:w-2.5
            [&_.swiper-pagination-bullet]:rounded-full
            [&_.swiper-pagination-bullet]:bg-[#E96400]
            [&_.swiper-pagination-bullet]:opacity-100
            [&_.swiper-pagination-bullet]:transition-all
            [&_.swiper-pagination-bullet]:duration-500
            [&_.swiper-pagination-bullet]:ease-out"
          />

          <div className="absolute bottom-8 right-5 z-10 hidden gap-3 sm:flex">
            <button
              type="button"
              className="hero-carousel-prev flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:bg-[#E96400] hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              className="hero-carousel-next flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:bg-[#E96400] hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </>
      )}
    </section>
  );
}