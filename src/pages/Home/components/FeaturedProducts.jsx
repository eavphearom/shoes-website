import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import productImage from "../../../assets/product/image.png";
import ProductCard from "../../../components/product/ProductCard";

// Home featured products can later be replaced with API data here.
const featuredProducts = [
  {
    name: "Campus First Mesh Running Sports",
    price: "$30",
    oldPrice: "$32",
    discount: "-6%",
    rating: 5,
  },
  {
    name: "JAVIO Stylish Sports Casual Gym Cycling",
    priceRange: "$30 - $32",
    discount: "-6%",
    rating: 5,
  },
  {
    name: "Hikking Trekking Climbing Mountain",
    price: "$30",
    oldPrice: "$31",
    discount: "-3%",
    rating: 4,
  },
  {
    name: "Hikking Trekking Climbing Mountain",
    price: "$30",
    oldPrice: "$31",
    discount: "-3%",
    rating: 4,
  },
  {
    name: "Hikking Trekking Climbing Mountain",
    price: "$30",
    oldPrice: "$31",
    discount: "-3%",
    rating: 4,
  },
];

export default function FeaturedProducts() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    setCanScrollLeft(carousel.scrollLeft > 2);
    setCanScrollRight(carousel.scrollLeft < maxScrollLeft - 2);
  };

  const handleScroll = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const firstCard = carousel.querySelector("[data-carousel-card]");
    const cardWidth = firstCard?.getBoundingClientRect().width || carousel.clientWidth;
    const scrollDistance = direction === "left" ? -cardWidth : cardWidth;

    carousel.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return undefined;
    }

    updateScrollButtons();

    const resizeObserver = new ResizeObserver(updateScrollButtons);

    carousel.addEventListener("scroll", updateScrollButtons, { passive: true });
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="group/new-arrivals px-4 pb-10 pt-0 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="mt-2 font-michroma sm:text-xl md:text-2xl font-bold text-[#111827]">
            New Arrivals
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-[10px] font-michroma text-end font-semibold text-[#eb8525]"
        >
          View all products43
        </Link>
      </div>

      <div className="relative mt-7">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 z-20 hidden cursor-pointer h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[#07182E] opacity-100 shadow-[0_14px_34px_rgba(15,23,42,0.16)] transition hover:bg-[#F97316] hover:text-white sm:flex lg:opacity-0 lg:group-hover/new-arrivals:opacity-100"
            aria-label="Scroll products left"
          >
            <ChevronLeft size={20} strokeWidth={2.6} />
          </button>
        )}

        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
        >
          {featuredProducts.map((product, index) => (
            <div
              key={`${product.name}-${index}`}
              data-carousel-card
              className="min-w-0 shrink-0 basis-[72%] snap-start sm:basis-[calc((100%-20px)/2)] md:basis-[calc((100%-40px)/3)] lg:basis-[calc((100%-60px)/4)]"
            >
              <ProductCard image={productImage} {...product} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 z-20 cursor-pointer hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#07182E] opacity-100 shadow-[0_14px_34px_rgba(15,23,42,0.16)] transition hover:bg-[#F97316] hover:text-white sm:flex lg:opacity-0 lg:group-hover/new-arrivals:opacity-100"
            aria-label="Scroll products right"
          >
            <ChevronRight size={20} strokeWidth={2.6} />
          </button>
        )}
      </div>
    </section>
  );
}
