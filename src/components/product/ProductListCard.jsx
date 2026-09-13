import { Star } from "lucide-react";

function StarsRow({ rating = "4.8", reviews = "120" }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-0.5 text-[#F59E0B]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={13}
            className="fill-current"
            strokeWidth={1.8}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-[#475569]">{rating}</span>
      <span className="text-xs text-[#64748B]">({reviews} reviews)</span>
    </div>
  );
}

export default function ProductListCard({
  image,
  name,
  price,
  oldPrice,
  priceRange,
  discount,
  rating,
  reviews,
  description,
}) {
  const displayPrice = priceRange || price;

  return (
    <article className="grid gap-5 rounded-lg border border-[#E6EAF0] bg-white p-3 sm:grid-cols-[220px_1fr] sm:p-4 lg:grid-cols-[280px_1fr]">
      <div className="relative overflow-hidden rounded-lg bg-[#F3F4F6]">
        <img
          src={image}
          alt={name}
          className="h-[150px] w-full object-contain"
        />
        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-[#F97316] px-3 py-1.5 text-xs font-extrabold text-white">
            {discount}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center">
        {/* <p className="text-xs font-bold uppercase tracking-wide text-[#A7B2C3]">
          {category}
        </p> */}
        <h3 className="mt-2 text-md font-semibold leading-snug text-[#07182E]">
          {name}
        </h3>
        <div className="mt-3">
          <StarsRow rating={rating} reviews={reviews} />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-extrabold text-[#F97316]">
            {displayPrice}
          </span>
          {oldPrice && (
            <span className="text-sm font-bold text-[#AAB6C8] line-through">
              {oldPrice}
            </span>
          )}
          <span className="rounded-md bg-[#ECFDF5] px-2 py-1 text-[10px] font-extrabold uppercase text-[#059669]">
            In stock
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5F6B7A]">
          {description}
        </p>

        <div className="flex items-center justify-between gap-4 border-[#EEF2F7] pt-4">
          <div className="flex items-center gap-2">
            {/* {colorSwatches.map((color, index) => (
              <span
                key={color}
                className={`h-3 w-3 rounded-full ${
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
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#ec6614] text-white shadow-[0_10px_22px_rgba(15,23,42,0.16)] transition hover:bg-[#f68945]"
            aria-label="Add product to cart"
          >
            <Plus size={16} strokeWidth={2} />
          </button> */}
        </div>
      </div>
    </article>
  );
}
