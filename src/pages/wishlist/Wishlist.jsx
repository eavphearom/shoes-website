import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import productImage from "../../assets/product/image.png";
import ProductCard from "../../components/product/ProductCard";

const wishlistProducts = [
  {
    name: "Campus First Mesh Running Sports",
    price: "$30",
    oldPrice: "$32",
    discount: "-6%",
  },
  {
    name: "JAVIO Stylish Sports Casual Gym Cycling",
    priceRange: "$30 - $32",
    discount: "-6%",
  },
  {
    name: "Hikking Trekking Climbing Mountain",
    price: "$30",
    oldPrice: "$31",
    discount: "-3%",
  },
  {
    name: "Nike Air Force 1 Low LX Mica Green",
    priceRange: "$32 - $33",
  },
];

export default function Wishlist() {
  return (
    <section className="mx-auto min-h-[calc(100vh-240px)] max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF1E8] text-[#F97316]">
            <Heart size={21} strokeWidth={2.4} />
          </div>
          <h1 className="font-michroma text-2xl font-extrabold text-[#07182E] sm:text-3xl">
            Wishlist
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
            Keep your favorite shoes here and come back when you are ready to
            choose your next pair.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex w-fit items-center justify-center rounded-full bg-[#F97316] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-[#EA580C]"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {wishlistProducts.map((product, index) => (
          <ProductCard
            key={`${product.name}-${index}`}
            image={productImage}
            {...product}
          />
        ))}
      </div>
    </section>
  );
}
