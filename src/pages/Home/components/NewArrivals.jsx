import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";
import useProducts from "../../../hooks/useProducts";

export default function NewArrivals() {
  // Fetch only products with type=new.
const {
  products,
  loading,
  error,
} = useProducts({
  type: "new",
});
  // Reference to the horizontal product carousel.
  const carouselRef = useRef(null);

  // Control visibility of previous and next buttons.
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check whether the carousel can scroll left or right.
  const updateScrollButtons = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    setCanScrollLeft(carousel.scrollLeft > 2);
    setCanScrollRight(carousel.scrollLeft < maxScrollLeft - 2);
  };

  // Scroll one product card when clicking an arrow.
  const handleScroll = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const firstCard = carousel.querySelector("[data-carousel-card]");

    const cardWidth =
      firstCard?.getBoundingClientRect().width || carousel.clientWidth;

    // Include the carousel gap for smoother card alignment.
    const gap = 20;

    const scrollDistance =
      direction === "left" ? -(cardWidth + gap) : cardWidth + gap;

    carousel.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  };

  // Watch carousel scrolling and resizing.
  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return undefined;

    updateScrollButtons();

    const resizeObserver = new ResizeObserver(updateScrollButtons);

    carousel.addEventListener("scroll", updateScrollButtons, { passive: true });

    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener("scroll", updateScrollButtons);

      resizeObserver.disconnect();
    };
  }, [products]);

  // Keep the section hidden while the first request is loading.
  if (loading) {
    return null;
  }

  // Hide the section if the API fails.
  if (error) {
    console.error("Failed to load new products:", error);
    return null;
  }

  // Do not render an empty New Arrivals section.
  if (products.length === 0) {
    return null;
  }
  const rating = 4.5; // Placeholder rating value, replace with actual data if available
  const review = 120; // Placeholder review count, replace with actual data if availableF
  return (
    <section className="group/new-arrivals px-4 pb-10 pt-0 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
      {/* Section header */}
      <div data-scroll-reveal="up" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="mt-2 font-michroma text-lg font-bold text-[#111827] sm:text-xl md:text-2xl">
            New Arrivals
          </h2>
        </div>

        <Link
          to="/shop"
          className="text-end font-michroma text-[10px] font-semibold text-[#eb8525]"
        >
          View all products
        </Link>
      </div>

      {/* Product carousel */}
      <div className="relative mt-7">
        {/* Previous button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#07182E] opacity-100 shadow-[0_14px_34px_rgba(15,23,42,0.16)] transition hover:bg-[#F97316] hover:text-white sm:flex lg:opacity-0 lg:group-hover/new-arrivals:opacity-100"
            aria-label="Scroll products left"
          >
            <ChevronLeft size={20} strokeWidth={2.6} />
          </button>
        )}

        {/* Product cards */}
        <div
          ref={carouselRef}
          data-scroll-group="up"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-carousel-card
              className="min-w-0 shrink-0 basis-[72%] snap-start sm:basis-[calc((100%-20px)/2)] md:basis-[calc((100%-40px)/3)] lg:basis-[calc((100%-80px)/5)]"
            >
              <ProductCard
                id={product.id}
                slug={product.slug}
                name={product.name}
                image={product.image}
                price={product.price}
                totalStock={product.total_stock}
                stockStatus={product.stock_status}
                type={product.type}
                rating={rating}
                review={review}
              />
            </div>
          ))}
        </div>

        {/* Next button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#07182E] opacity-100 shadow-[0_14px_34px_rgba(15,23,42,0.16)] transition hover:bg-[#F97316] hover:text-white sm:flex lg:opacity-0 lg:group-hover/new-arrivals:opacity-100"
            aria-label="Scroll products right"
          >
            <ChevronRight size={20} strokeWidth={2.6} />
          </button>
        )}
      </div>
    </section>
  );
}
