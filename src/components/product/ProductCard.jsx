import FavoriteButton from "./FavoriteButton";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

/*
 * Build product detail URL.
 * - API products can use the slug returned by backend.
 * - Static products fall back to generating a slug from the name.
 */
function getProductPath(name, slug) {
  if (slug) {
    return `/product/${slug}`;
  }

  const generatedSlug = String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `/product/${generatedSlug}`;
}

/*
 * Format product price.
 * Supports:
 * - API: 14.99
 * - Static: "$30"
 */
function formatPrice(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  // Keep already formatted static prices.
  if (typeof value === "string" && value.includes("$")) {
    return value;
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return value;
  }

  return `$${number.toFixed(2)}`;
}

/*
 * Shared product card.
 * Supports both static product data and API product data.
 */
export default function ProductCard({
  id,
  image,
  slug,
  name,
  price,
  oldPrice,
  priceRange,
  discount,
  rating,
  reviews,
  stockStatus,
}) {
  const productPath = id != null ? `/product/${id}` : getProductPath(name, slug);

  // Use price range when provided; otherwise use normal price.
  const displayPrice = priceRange || formatPrice(price);
  const displayOldPrice = formatPrice(oldPrice);

  /*
   * Stock status comes from API:
   * "In Stock", "Low Stock", "Out Of Stock"
   */
  const normalizedStockStatus = String(stockStatus || "").toLowerCase();

  const stockStyle =
    normalizedStockStatus === "in stock"
      ? "bg-[#effdfd] text-[#0ba964]"
      : normalizedStockStatus === "low stock"
        ? "bg-orange-50 text-orange-600"
        : "bg-red-50 text-red-500";

  return (
    <article className="group rounded-2xl bg-white p-3 shadow-[0_10px_28px_rgba(15,23,42,0.07)] sm:p-4">
      {/* Product image */}
      <div className="relative overflow-hidden rounded-xl bg-[#F3EFE8]">
        <Link to={productPath} className="block">
          <img
            src={image}
            alt={name}
            className="aspect-[1.45/1] w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Discount badge */}
          {discount && (
            <span className="absolute left-2 top-2 rounded-full bg-[#ec6614] px-2 py-0.5 text-[9px] font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">
              {discount}
            </span>
          )}
        </Link>

        {/* Wishlist button */}
        <FavoriteButton product={{ id, slug, name, image, price, stockStatus }} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#746d64] sm:right-3 sm:top-3" />
      </div>

      {/* Product information */}
      <div className="pt-2.5 sm:pt-3">
        {/* Product name */}
        <Link
          to={productPath}
          className="mt-1 block truncate text-[11px] font-semibold leading-snug text-[#3e3f42] transition hover:text-[#E96400] sm:text-[13px]"
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1.5 text-[9px] font-semibold text-[#64748B] sm:text-[10px]">
          <span className="flex items-center gap-0.5 text-[#F59E0B]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={10}
                className="fill-current"
                strokeWidth={1.7}
              />
            ))}
          </span>

          {rating !== undefined && rating !== null && (
            <span>{rating}</span>
          )}

          {reviews !== undefined && reviews !== null && (
            <span>({reviews})</span>
          )}
        </div>

        {/* Price + stock status */}
        <div className="mt-1 flex min-h-6 items-center gap-2 sm:min-h-7 sm:gap-2.5">
          {/* Current price */}
          {displayPrice && (
            <span className="text-sm font-semibold tracking-tight text-[#f37029] sm:text-base">
              {displayPrice}
            </span>
          )}

          {/* Old price */}
          {displayOldPrice && (
            <span className="text-[10px] font-semibold text-[#AAB6C8] line-through sm:text-xs">
              {displayOldPrice}
            </span>
          )}

          {/* API stock status */}
          {stockStatus && (
            <span
              className={`ml-auto rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide sm:px-2 sm:py-1 sm:text-[9px] ${stockStyle}`}
            >
              {stockStatus}
            </span>
          )}
        </div>

        {/* Reserved area for future color variants / cart button */}
        <div className="mt-2 flex items-center justify-between gap-3 border-[#EEF2F7] sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2" />
        </div>
      </div>
    </article>
  );
}
