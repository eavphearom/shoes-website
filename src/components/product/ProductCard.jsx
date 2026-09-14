import { Heart, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";

function getProductPath(name) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `/product/${slug}`;
}

export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  priceRange,
  discount,
  rating,
  reviews,
}) {
  const displayPrice = priceRange || price;
  const productPath = getProductPath(name);

  return (
    <article className="group rounded-2xl bg-white p-3 shadow-[0_10px_28px_rgba(15,23,42,0.07)] sm:p-4">
      <div className="relative overflow-hidden rounded-xl bg-[#F3EFE8]">
        <Link to={productPath} className="block">
          <img
            src={image}
            alt={name}
            className="aspect-[1.45/1] w-full object-cover transition duration-300 group-hover:scale-105"
          />

          {discount && (
            <span className="absolute left-2 top-2 rounded-full bg-[#ec6614] px-2 py-0.5 text-[9px] font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">
              {discount}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white text-[#746d64] transition hover:bg-[#f54848] hover:text-white sm:right-3 sm:top-3 sm:h-7 sm:w-7"
          aria-label="Add to wishlist"
        >
          <Heart size={16} strokeWidth={2.3} />
        </button>
  
      </div>

      <div className="pt-2.5 sm:pt-3">
        {/* <p className="text-[9px] font-bold uppercase tracking-wide text-[#A7B2C3] sm:text-[11px]">
          Men's Shoes
        </p> */}

        <Link
          to={productPath}
          className="mt-1 block truncate text-[11px] font-semibold leading-snug text-[#3e3f42] transition hover:text-[#E96400] sm:text-[13px]"
        >
          {name}
        </Link>

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
          {rating && <span>{rating}</span>}
          {reviews && <span>({reviews})</span>}
        </div>

        <div className="mt-1 flex min-h-6 items-center gap-2 sm:min-h-7 sm:gap-2.5">
          <span className="text-sm font-semibold tracking-tight text-[#f37029] sm:text-base">
            {displayPrice}
          </span>
          {oldPrice && (
            <span className="text-[10px] font-semibold text-[#AAB6C8] line-through sm:text-xs">
              {oldPrice}
            </span>
          )}
          {discount && (
            <span className="ml-auto rounded-md bg-[#effdfd] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#0ba964] sm:px-2 sm:py-1 sm:text-[9px]">
              In stock
            </span>
          )}
          {/* <button
            type="button"
            className="flex ml-auto h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#ec6614] text-white shadow-[0_10px_22px_rgba(15,23,42,0.16)] transition hover:bg-[#f68945] sm:h-8 sm:w-8"
            aria-label="Add product to cart"
          >
            <Plus size={14} strokeWidth={2} />
          </button> */}
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 border-[#EEF2F7] sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* {colorSwatches.map((color, index) => (
              <span
                key={color}
                className={`h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${
                  index === 0
                    ? "ring-2 ring-white outline outline-2 outline-[#111827]"
                    : "ring-2 ring-white"
                } shadow-[0_0_0_1px_rgba(15,23,42,0.12)]`}
                style={{ backgroundColor: color }}
              />
            ))} */}
          </div>

          {/* <button
            type="button"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#ec6614] text-white shadow-[0_10px_22px_rgba(15,23,42,0.16)] transition hover:bg-[#f68945] sm:h-8 sm:w-8"
            aria-label="Add product to cart"
          >
            <Plus size={14} strokeWidth={2} />
          </button> */}
        </div>
      </div>
    </article>
  );
}
