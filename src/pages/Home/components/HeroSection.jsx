import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

const heroSlides = [
  {
    eyebrow: "Classy Collection",
    title: "Run, don't hide",
    image: banner1,
    align: "object-center",
  },
  {
    eyebrow: "New Arrivals",
    title: "Sneakers for every street",
    image: banner2,
    align: "object-center",
  },
  {
    eyebrow: "Performance Drop",
    title: "Running to the future",
    image: banner3,
    align: "object-center",
  },
];

export default function HeroSection() {
  return (
    <section className="hero-carousel relative overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop
        speed={900}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
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
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className={`h-full w-full object-cover ${slide.align}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

              <div className="absolute inset-x-0 bottom-20 mx-auto max-w-[1500px] px-5 sm:bottom-24 sm:px-8 lg:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="max-w-md"
                >
                  <p className="font-heading text-xs font-extrabold uppercase tracking-[0.35em] text-white/80 sm:text-sm">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-3 font-michroma text-3xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-5xl">
                    {slide.title}
                  </h1>
                  <Link
                    to="/shop"
                    className="mt-6 inline-flex h-12 items-center justify-center bg-[#E96400] px-7 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#C95500]"
                  >
                    Shop now
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-carousel-pagination absolute right-auto! bottom-8 left-1/2! z-10 flex w-auto! -translate-x-1/2! items-center justify-center gap-3 [&_.swiper-pagination-bullet-active]:w-[34px] [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:bg-[#E96400] [&_.swiper-pagination-bullet]:mx-[5px] [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:bg-white/75 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all" />

      <div className="absolute bottom-8 right-5 z-10 hidden gap-3 sm:flex">
        <button
          type="button"
          className="hero-carousel-prev flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:bg-[#E96400] hover:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="hero-carousel-next flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:bg-[#E96400] hover:text-white"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
