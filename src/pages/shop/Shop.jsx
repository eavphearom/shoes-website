import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import useScrollReveal from "../../hooks/useScrollReveal";
import {
  ChevronDown,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../components/product/ProductCard";
import ProductListCard from "../../components/product/ProductListCard";
import useProducts from "../../hooks/useProducts";
import useShopFilters from "../../hooks/useShopFilters";

const highlights = ["All Products", "New Arrivals"];

const sortOptions = [
  "Default sorting",
  "Low price",
  "High price",
];

/*
 * Temporary product review data.
 * Backend does not return rating/reviews yet.
 */
const DEFAULT_RATING = "4.8";
const DEFAULT_REVIEWS = "120";

/*
 * Reusable filter section.
 */
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

function FilterOptions({ options, selected, onChange, allLabel }) {
  return (
    <div className="grid gap-3">
      {[{ id: "", name: allLabel }, ...options].map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={String(selected) === String(option.id)}
          onClick={() => onChange(option.id)}
          className="flex cursor-pointer items-center gap-3 text-left text-sm font-medium text-[#4B5563] transition hover:text-[#F97316]"
        >
          <span className={"flex h-4 w-4 shrink-0 items-center justify-center rounded border " +
            (String(selected) === String(option.id) ? "border-[#F97316] bg-[#F97316]" : "border-[#D8DEE7] bg-white")}>
            {String(selected) === String(option.id) && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
          </span>
          {option.name}
        </button>
      ))}
    </div>
  );
}

function FilterContent({
  categories, brands, filtersLoading, filtersError,
  categoryId, brandId, onCategoryChange, onBrandChange,
  selectedHighlight, onHighlightChange,
}) {
  return (
    <div className="space-y-5">
      {filtersLoading && <p role="status" className="text-sm text-[#64748B]">Loading filters...</p>}
      {filtersError && <p role="alert" className="text-sm text-red-500">{filtersError}</p>}
      <FilterPanel title="Shop By Categories">
        <FilterOptions options={categories} selected={categoryId} onChange={onCategoryChange} allLabel="All Categories" />
      </FilterPanel>
      <FilterPanel title="Highlight">
        <div className="grid gap-1.5">
          {highlights.map((item) => (
            <button key={item} type="button" aria-pressed={selectedHighlight === item}
              onClick={() => onHighlightChange(item)}
              className={"cursor-pointer rounded-md px-3 py-1.5 text-left text-sm font-medium transition " +
                (selectedHighlight === item ? "bg-[#FFF3E8] text-[#F97316]" : "text-[#4B5563] hover:bg-[#F8FAFC] hover:text-[#F97316]")}>
              {item}
            </button>
          ))}
        </div>
      </FilterPanel>
      <FilterPanel title="Brand">
        <FilterOptions options={brands} selected={brandId} onChange={onBrandChange} allLabel="All Brands" />
      </FilterPanel>
    </div>
  );
}

export default function Shop() {
  const revealRef = useScrollReveal();
  const sortRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { categories, brands, loading: filtersLoading, error: filtersError } = useShopFilters();
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  /*
   * UI state.
   */
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /*
   * API filter state.
   */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);
  const [type, setType] = useState("");
  const [selectedHighlight, setSelectedHighlight] =
    useState("All Products");

  /*
   * Fetch products from backend.
   *
   * Empty values are not necessary for the API,
   * so only send filters when they have a value.
   */
  const {
    products,
    loading,
    error,
    pagination,
    hasMore,
    loadMore,
  } = useProducts({
    category_id: categoryId,
    brand_id: brandId,
    search: debouncedSearch,
    type,
    price_sort:
      selectedSort === "Low price"
        ? "asc"
        : selectedSort === "High price"
          ? "desc"
          : "",
  }, { keepPreviousData: true });

  /*
   * Search products through backend.
   */
  const handleSearch = (value) => {
    setSearch(value);
  };

  /*
   * Convert Highlight UI into backend "type" query.
   *
   * Your current API already supports:
   * type=new
   *
   * Other types can be connected when backend supports them.
   */
  const handleHighlightChange = (value) => {
    setSelectedHighlight(value);

    if (value === "New Arrivals") {
      setType("new");
      return;
    }

    setType("");
  };

  /*
   * Change price sorting.
   */
  const handleSort = (option) => {
    setSelectedSort(option);
    setIsSortOpen(false);
  };

  /*
   * Close sort dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const filterProps = {
    categories, brands, filtersLoading, filtersError,
    categoryId, brandId,
    onCategoryChange: setCategoryId,
    onBrandChange: setBrandId,
    selectedHighlight, onHighlightChange: handleHighlightChange,
  };

  return (
    <div ref={revealRef}>
      {/* Page header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0c8a4] via-white to-[#ead4ca] px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1500px] items-center gap-6 md:min-h-[185px] md:grid-cols-[1fr_0.9fr]">
          <div data-scroll-reveal="up" className="text-center md:text-left lg:pl-[310px] xl:pl-[330px]">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#4B5563] md:justify-start">
              <Link
                to="/"
                className="transition hover:text-[#F97316]"
              >
                Home
              </Link>

              <span>/</span>
              <span>Shop</span>
            </div>

            <h1 className="mt-2 font-michroma text-2xl font-extrabold uppercase tracking-wide text-[#07182E] sm:text-3xl">
              Shop
            </h1>

            <p className="mt-2 font-michroma text-xs text-[#64748B] sm:text-sm">
              Discover our latest collection of stylish and
              comfortable shoes
            </p>
          </div>
        </div>
      </section>

      {/* Shop content */}
      <section className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:pb-8">
        <div className="grid gap-6 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop filters */}
          <div data-scroll-reveal="fade" className="hidden md:sticky md:top-24 md:block md:max-h-[calc(100vh-112px)] md:overflow-y-auto md:pb-4 md:pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterContent {...filterProps} />
          </div>

          {/* Products */}
          <div className="min-w-0 pt-0">
            {/* Product toolbar */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-[#475569]">
                {loading ? "Updating products..." : `Showing ${products.length}${pagination ? ` of ${pagination.total}` : ""} results`}
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                {/* Search */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-[240px]">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(event) =>
                        handleSearch(event.target.value)
                      }
                      placeholder="Search shoes..."
                      className="h-10 w-full rounded-lg border border-[#E6EAF0] bg-white pl-9 pr-3 text-sm text-[#07182E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#F97316]"
                    />
                  </div>
                </div>

                {/* Mobile filter button */}
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#E6EAF0] bg-white px-3 font-mono text-sm text-[#212838] transition hover:border-[#F97316] hover:text-[#F97316] md:hidden"
                >
                  <SlidersHorizontal size={17} />
                  Filter
                </button>

                {/* Sort dropdown */}
                <div
                  ref={sortRef}
                  className="relative flex h-10 items-center gap-2 rounded-lg bg-white px-2"
                >
                  <span className="hidden text-sm font-medium text-[#64748B] sm:inline">
                    Sort by:
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setIsSortOpen((current) => !current)
                    }
                    className="inline-flex min-w-[150px] cursor-pointer items-center justify-between gap-4 border-b border-[#E5E7EB] pb-1 font-mono text-sm text-[#212838]"
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
                        onClick={() => handleSort(option)}
                        className={`block w-full cursor-pointer px-4 py-2.5 text-left text-sm font-medium transition ${
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

                {/* Grid view */}
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition ${
                    viewMode === "grid"
                      ? "bg-[#F97316] text-white"
                      : "bg-[#F3F4F6] text-[#64748B] hover:text-[#F97316]"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={18} />
                </button>

                {/* List view */}
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition ${
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

            {/* API error */}
            {error && (
              <p className="mb-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Loading */}
            {loading && products.length === 0 && (
              <p className="py-10 text-center text-sm text-[#64748B]">
                Loading products...
              </p>
            )}

            {/* Empty products */}
            {!loading &&
              !error &&
              products.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-sm font-semibold text-[#07182E]">
                    No products found.
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Try another search or filter.
                  </p>
                </div>
              )}

            {/* Motion owns product transitions; GSAP only reveals the heading/sidebar. */}
            <motion.div
              layout={reduceMotion ? false : "position"}
              animate={{ opacity: loading && products.length > 0 ? 0.55 : 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              aria-busy={loading}
              inert={loading ? true : undefined}
              className={viewMode === "grid"
                ? "relative grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4"
                : "relative grid gap-4"}
            >

              <AnimatePresence mode="popLayout">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout={reduceMotion ? false : "position"}
                    initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -10, scale: reduceMotion ? 1 : 0.97,
                      transition: { duration: reduceMotion ? 0 : 0.15 } }}
                    transition={reduceMotion ? { duration: 0 } : {
                      layout: { type: "spring", stiffness: 350, damping: 32 },
                      opacity: { duration: 0.22, delay: Math.min(index, 5) * 0.035 },
                      y: { duration: 0.28, delay: Math.min(index, 5) * 0.035 },
                      scale: { duration: 0.25 },
                    }}
                    className="min-w-0"
                  >
                    {viewMode === "grid" ? (
                      <ProductCard
                        id={product.id} slug={product.slug} image={product.image}
                        name={product.name} price={product.price} stockStatus={product.stock_status}
                        rating={DEFAULT_RATING} reviews={DEFAULT_REVIEWS}
                      />
                    ) : (
                      <ProductListCard
                        id={product.id} image={product.image} name={product.name}
                        price={product.price} oldPrice={product.old_price}
                        priceRange={product.price_range} discount={product.discount}
                        description={product.description}
                        rating={DEFAULT_RATING} reviews={DEFAULT_REVIEWS}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* More results are available according to API pagination. */}
            {hasMore && (
              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loading}
                  className="cursor-pointer rounded-full border border-[#F97316] bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#F97316] transition hover:bg-[#F97316] hover:text-white disabled:cursor-wait disabled:opacity-50"
                >
                  {loading ? "Loading..." : error ? "Try again" : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-[80] transition md:hidden ${
          isFilterOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {/* Drawer overlay */}
        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setIsFilterOpen(false)}
          className={`absolute inset-0 bg-[#07182E]/45 transition-opacity duration-300 ${
            isFilterOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer content */}
        <div
          className={`absolute inset-y-0 left-0 w-[86%] max-w-[340px] overflow-y-auto bg-white px-4 py-5 shadow-[18px_0_45px_rgba(15,23,42,0.2)] transition-transform duration-300 ease-out ${
            isFilterOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-michroma text-base font-extrabold text-[#07182E]">
              Filters
            </h2>

            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#F3F4F6] text-[#07182E] transition hover:bg-[#F97316] hover:text-white"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>

          <FilterContent {...filterProps} />
        </div>
      </div>
    </div>
  );
}
