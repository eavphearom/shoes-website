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
];

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-1 md:pt-20 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          {/* <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            Featured
          </p> */}
          <h2 className="mt-2 font-michroma sm:text-xl md:text-2xl font-bold text-[#111827]">
            New Arrivals
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-[10px] font-michroma text-end font-semibold text-[#eb8525]"
        >
          View all products
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.name} image={productImage} {...product} />
        ))}
      </div>
    </section>
  );
}
