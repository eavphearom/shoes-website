import { ChevronDown, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import productImage from "../../assets/product/image.png";
import productImageAlt from "../../assets/product/images.png";
import ProductCard from "../../components/product/ProductCard";
import ProductListCard from "../../components/product/ProductListCard";

const products = [
  {
    name: "Adidas Cream & White Forum Low Cl Sports Shoes",
    category: "Men's Shoes",
    price: "$29",
    oldPrice: "$34",
    discount: "-15%",
    rating: "4.5",
    reviews: "120",
    image: productImage,
    description:
      "A clean sneaker made for easy daily wear, soft comfort, and sharp casual styling.",
  },
  {
    name: "Adidas Men Trainers Ozelia Sports Shoes For Men",
    category: "Men's Shoes",
    priceRange: "$31 - $34",
    discount: "-6%",
    rating: "4.8",
    reviews: "320",
    image: productImageAlt,
    description:
      "Lightweight trainers with a versatile shape for active days and weekend rotation.",
  },
  {
    name: "Adidas Men Trainers Sterlinn Sports Shoes For Men",
    category: "Men's Shoes",
    priceRange: "$35 - $36",
    discount: "-3%",
    rating: "4.6",
    reviews: "98",
    image: productImage,
    description:
      "Sport-ready comfort with clean paneling and a stable sole for everyday movement.",
  },
  {
    name: "Campus First Mesh Running Sports Shoes",
    category: "Women's Shoes",
    price: "$30",
    oldPrice: "$32",
    discount: "-6%",
    rating: "4.7",
    reviews: "142",
    image: productImageAlt,
    description:
      "Breathable mesh sneakers designed for smooth steps and casual all-day comfort.",
  },
  {
    name: "Nike Air Force 1 Low LX Mica Green",
    category: "Men's Shoes",
    priceRange: "$32 - $33",
    discount: "-10%",
    rating: "4.5",
    reviews: "87",
    image: productImage,
    description:
      "A timeless low-top profile with soft color blocking and a dependable street feel.",
  },
  {
    name: "Hikking Trekking Climbing Mountain Shoes",
    category: "Men's Shoes",
    price: "$30",
    oldPrice: "$31",
    discount: "-3%",
    rating: "4.8",
    reviews: "77",
    image: productImageAlt,
    description:
      "Durable everyday shoes inspired by trail comfort and steady support.",
  },
  {
    name: "JAVIO Stylish Sports Casual Gym Cycling Shoes",
    category: "Men's Shoes",
    priceRange: "$30 - $32",
    discount: "-6%",
    rating: "4.7",
    reviews: "104",
    image: productImage,
    description:
      "A casual gym-ready silhouette with soft cushioning and flexible styling.",
  },
  {
    name: "Urban Runner Pro Men's Running Shoes",
    category: "Women's Shoes",
    price: "$89",
    oldPrice: "$112",
    discount: "-20%",
    rating: "4.5",
    reviews: "126",
    image: productImageAlt,
    description:
      "Modern runner profile with plush support and bright sport-inspired detailing.",
  },
];

const categories = [
  "All Categories (120)",
  "Our Store (24)",
  "Running (32)",
  "Training (18)",
  "Lifestyle (26)",
  "Basketball (12)",
  "Hiking (14)",
  "Casual (29)",
  "Sneakers (40)",
  "Sale (20)",
];

const highlights = ["All Products", "Best Seller", "New Arrivals", "Sale"];
const brands = [
  "All Brands",
  "Nike (18)",
  "Adidas (24)",
  "Puma (12)",
  "New Balance (10)",
  "Converse (8)",
];
const sortOptions = ["Default sorting", "Low price", "High price"];

function FilterPanel({ title, children }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E6EAF0] bg-white">
      <div className="flex items-center justify-between bg-[#F7F7F7] px-4 py-3.5">
        <h2 className="font-michroma text-[12px] font-extrabold uppercase text-[#07182E]">
          {title}
        </h2>
        <span className="text-lg font-bold text-[#07182E]">-</span>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

function FilterContent() {
  return (
    <div className="space-y-5">
      <FilterPanel title="Shop By Categories">
        <div className="grid gap-3">
          {categories.map((category, index) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#4B5563] transition hover:text-[#F97316]"
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  index === 0
                    ? "border-[#F97316] bg-[#F97316]"
                    : "border-[#D8DEE7] bg-white"
                }`}
              >
                {index === 0 && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              <span>{category}</span>
            </label>
          ))}
        </div>
      </FilterPanel>

      <FilterPanel title="Highlight">
        <div className="grid gap-1.5">
          {highlights.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`rounded-md px-3 py-1.5 text-left text-sm font-medium transition ${
                index === 0
                  ? "bg-[#FFF3E8] text-[#F97316]"
                  : "text-[#4B5563] hover:bg-[#F8FAFC] hover:text-[#F97316]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </FilterPanel>

      <FilterPanel title="Brand">
        <div className="grid gap-3">
          {brands.map((brand, index) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#4B5563] transition hover:text-[#F97316]"
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  index === 0
                    ? "border-[#F97316] bg-[#F97316]"
                    : "border-[#D8DEE7] bg-white"
                }`}
              >
                {index === 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </FilterPanel>

      {/* <FilterPanel title="Price Filter">
        <div className="grid gap-3">
          {prices.map((price, index) => (
            <label
              key={price}
              className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#4B5563] transition hover:text-[#F97316]"
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  index === 0
                    ? "border-[#F97316] bg-[#F97316]"
                    : "border-[#D8DEE7] bg-white"
                }`}
              >
                {index === 0 && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              <span>{price}</span>
            </label>
          ))}
        </div>

        <PriceRangeSlider />
      </FilterPanel> */}
    </div>
  );
}

export default function Shop() {
  const sortRef = useRef(null);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0c8a4] via-white to-[#ead4ca] px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1500px] items-center gap-6 md:min-h-[185px] md:grid-cols-[1fr_0.9fr]">
          <div className="text-center md:text-left lg:pl-[310px] xl:pl-[330px]">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#4B5563] md:justify-start">
              <Link to="/" className="transition hover:text-[#F97316]">
                Home
              </Link>
              <span>/</span>
              <span>Shop</span>
            </div>
            <h1 className="mt-2 font-michroma text-2xl font-extrabold uppercase tracking-wide text-[#07182E] sm:text-3xl">
              Shop
            </h1>
            <p className="mt-2 text-xs font-michroma text-[#64748B] sm:text-sm">
              Discover our latest collection of stylish and comfortable shoes
            </p>
          </div>
        </div>
        
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:pb-8">
        <div className="grid gap-6 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden md:sticky md:top-24 md:block md:max-h-[calc(100vh-112px)] md:overflow-y-auto md:pb-4 md:pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterContent />
          </div>

          <div className="min-w-0 pt-0">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium 3text-[#475569]">
                Showing 1-12 of 24 results
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="inline-flex h-10 items-center cursor-pointer gap-2 rounded-lg border border-[#E6EAF0] bg-white px-3 text-sm font-mono text-[#212838] transition hover:border-[#F97316] hover:text-[#F97316] md:hidden"
                >
                  <SlidersHorizontal size={17} />
                  Filter
                </button>

                <div
                  ref={sortRef}
                  className="relative flex h-10 items-center gap-2 rounded-lg bg-white px-2"
                >
                  <span className="hidden text-sm font-medium text-[#64748B] sm:inline">
                    Sort by:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSortOpen((current) => !current)}
                    className="inline-flex min-w-[150px] items-center justify-between gap-4 border-b border-[#E5E7EB] pb-1 text-sm font-mono text-[#212838]"
                    aria-expanded={isSortOpen}
                  >
                    {selectedSort}
                    <ChevronDown
                      size={16}
                      className={`text-[#9CA3AF] transition-transform duration-200 ${
                        isSortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 top-11 z-30 w-[180px] overflow-hidden rounded-lg border border-[#E6EAF0] bg-white shadow-[0_18px_35px_rgba(15,23,42,0.12)] transition-all duration-200 ease-out ${
                      isSortOpen
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                    }`}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedSort(option);
                          setIsSortOpen(false);
                        }}
                        className={`block w-full px-4 py-2.5 text-left text-sm font-medium cursor-pointer transition ${
                          selectedSort === option
                            ? "bg-[#FFF3E8] text-[#F97316]"
                            : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#F97316]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex h-10 w-10 items-center cursor-pointer justify-center rounded-lg transition ${
                    viewMode === "grid"
                      ? "bg-[#F97316] text-white"
                      : "bg-[#F3F4F6] text-[#64748B] hover:text-[#F97316]"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`flex h-10 w-10 items-center cursor-pointer justify-center rounded-lg transition ${
                    viewMode === "list"
                      ? "bg-[#F97316] text-white"
                      : "bg-[#F3F4F6] text-[#64748B] hover:text-[#F97316]"
                  }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                {products.map((product, index) => (
                  <ProductCard
                    key={`${product.name}-${index}`}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    priceRange={product.priceRange}
                    discount={product.discount}
                    category={product.category}
                    rating={product.rating}
                    reviews={product.reviews}
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((product, index) => (
                  <ProductListCard
                    key={`${product.name}-${index}`}
                    image={product.image}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    priceRange={product.priceRange}
                    discount={product.discount}
                    rating={product.rating}
                    reviews={product.reviews}
                    description={product.description}
                  />
                ))}
              </div>
            )}

            <div className="mt-9 flex justify-center">
              <button
                type="button"
                className="rounded-full border border-[#F97316] bg-white cursor-pointer px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#F97316] transition hover:bg-[#F97316] hover:text-white"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[80] transition md:hidden ${
          isFilterOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setIsFilterOpen(false)}
          className={`absolute inset-0 bg-[#07182E]/45 transition-opacity duration-300 ${
            isFilterOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute inset-y-0 left-0 w-[86%] max-w-[340px] overflow-y-auto bg-white px-4 py-5 shadow-[18px_0_45px_rgba(15,23,42,0.2)] transition-transform duration-300 ease-out ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-michroma text-base font-extrabold text-[#07182E]">
              Filters
            </h2>
            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#07182E] transition hover:bg-[#F97316] hover:text-white"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>

          <FilterContent />
        </div>
      </div>
    </div>
  );
}
