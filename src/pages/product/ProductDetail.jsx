import {
  // BarChart3,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flame,
  Heart,
  Maximize2,
  // MessageCircle,
  Minus,
  Plus,
  // Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import productImage from "../../assets/product/image.png";
import productImageAlt from "../../assets/product/images.png";

const thumbnails = [
  { image: productImage, label: "Side view" },
  { image: productImageAlt, label: "Top view" },
  { image: productImage, label: "Sole view" },
  { image: productImageAlt, label: "Back view" },
];

const sizes = ["7", "8", "9", "10", "11", "12"];
const colors = [
  { name: "White", value: "#FFFFFF" },
  { name: "Pink", value: "#FB7BA9" },
  { name: "Purple", value: "#8B35FF" },
  { name: "Orange", value: "#F59E0B" },
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(thumbnails[0].image);
  const [selectedSize, setSelectedSize] = useState("9");
  const [selectedColor, setSelectedColor] = useState("Purple");
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#94A3B8]">
          <Link to="/" className="transition hover:text-[#E96400]">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="transition hover:text-[#E96400]">
            Shop
          </Link>
          <span>/</span>
          <span>Running</span>
          <span>/</span>
          <span className="text-[#07182E]">Air Motion Runner</span>
        </nav>

        <section className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative overflow-hidden rounded-lg bg-[#F7F8FA]">
              {/* <span className="absolute left-5 top-5 rounded-md bg-[#F2E4FF] px-3 py-1.5 text-xs font-extrabold text-[#8B35FF]">
                New
              </span> */}

              <button
                type="button"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#64748B] shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition hover:text-[#EF4444]"
                aria-label="Add to wishlist"
              >
                <Heart size={19} />
              </button>

              <img
                src={selectedImage}
                alt="Air Motion Runner"
                className="h-[320px] w-full object-contain p-8 sm:h-[420px] lg:h-[500px]"
              />

              <button
                type="button"
                className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#07182E] shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                aria-label="Open image"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#07182E] shadow-[0_10px_26px_rgba(15,23,42,0.1)] sm:flex"
                aria-label="Previous product image"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {thumbnails.map((thumb) => (
                  <button
                    key={thumb.label}
                    type="button"
                    onClick={() => setSelectedImage(thumb.image)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-[#F7F8FA] p-1.5 transition sm:h-24 sm:w-24 ${
                      selectedImage === thumb.image
                        ? "border-[#E96400]"
                        : "border-transparent hover:border-[#E6EAF0]"
                    }`}
                    aria-label={thumb.label}
                  >
                    <img
                      src={thumb.image}
                      alt={thumb.label}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#07182E] shadow-[0_10px_26px_rgba(15,23,42,0.1)] sm:flex"
                aria-label="Next product image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="lg:pt-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-michroma font-semibold uppercase tracking-wide text-[#E96400]">
                  Go Shoes
                </p>
                <h1 className="mt-1 text-2xl font-michroma leading-tight text-[#07182E] sm:text-4xl">
                  Air Motion Runner
                </h1>
                <p className="mt-1 text-sm font-semibold text-[#a7aaaf]">
                  Men's Running & Lifestyle Shoes
                </p>
              </div>
              {/* <span className="rounded-full bg-[#F4F6F8] px-3 py-1.5 text-[11px] font-extrabold text-[#64748B]">
                #MoveBetter
              </span> */}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-0.5 text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-current"
                    strokeWidth={1.8}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#07182E]">4.8</span>
              <span className="text-sm text-[#64748B]">(124 reviews)</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-black text-[#E96400]">$30</span>
              <span className="text-lg font-bold text-[#AAB6C8] line-through">
                $49
              </span>
              <span className="rounded-full bg-[#FFE9D6] px-3 py-1.5 text-xs font-extrabold text-[#E96400]">
                Save 39%
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-md bg-[#FFE3E3] px-4 py-3 text-xs font-medium text-[#EF4444]">
              <Flame size={16} className="shrink-0 fill-current" />
              Selling fast! Over 14 people have this in their cart
            </div>

            <p className="mt-4 text-sm leading-6 text-[#475569]">
              Designed for everyday movement, the Air Motion Runner features a
              breathable knit upper, lightweight cushioning and a versatile
              style that keeps you comfortable all day - whether you're
              running, walking or exploring the city.
            </p>

            <div className="mt-6 border-t border-[#EEF2F7] pt-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-michroma text-[#07182E]">Size</p>
                {/* <button
                  type="button"
                  className="text-xs font-extrabold text-[#E96400] underline-offset-4 hover:underline"
                >
                  Size Chart
                </button> */}
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-10 rounded-md cursor-pointer border text-sm font-bold transition ${
                      selectedSize === size
                        ? "border-[#E96400] bg-[#FFF5ED] text-[#E96400]"
                        : "border-[#E6EAF0] text-[#475569] hover:border-[#E96400]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-michroma text-[#07182E]">
                Color: {selectedColor}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-8 w-8 rounded-full cursor-pointer border border-[#E6EAF0] ring-2 ring-white transition ${
                        selectedColor === color.name
                          ? "outline outline-2 outline-[#E96400]"
                          : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>

                <span className="rounded-full bg-[#E9FBEF] px-4 py-2 text-xs font-medium text-[#16A34A]">
                  In Stock - 329 available
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 grid-cols-2">
              <div className="flex h-11 items-center justify-between rounded-md bg-[#F4F6F8] px-3">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="text-[#07182E] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-extrabold text-[#07182E]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="text-[#07182E] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                className="flex h-11 items-center cursor-pointer justify-center gap-2 rounded-md bg-[#E96400] text-sm font-extrabold text-white transition hover:bg-[#C95500]"
              >
                <ShoppingCart size={17} />
                Add to Cart
              </button>
            </div>

           
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg bg-[#F7F8FA] p-4">
                <Eye size={20} className="text-[#07182E]" />
                <p className="text-xs font-semibold text-[#64748B]">
                  <span className="block text-[#07182E]">25 people</span>
                  viewing this right now
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-[#F7F8FA] p-4">
                <Truck size={20} className="text-[#07182E]" />
                <p className="text-xs font-semibold text-[#64748B]">
                  <span className="block text-[#07182E]">Estimated Delivery</span>
                  2-4 business days
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-[#F7F8FA] p-4">
                <ShieldCheck size={20} className="text-[#07182E]" />
                <p className="text-xs font-semibold text-[#64748B]">
                  <span className="block text-[#07182E]">Free Shipping & Returns</span>
                  On all orders over $200
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
