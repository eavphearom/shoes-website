import productImage from "../../assets/product/image.png";
import ProductCard from "../../components/product/ProductCard";

const products = [
  {
    name: "Campus First Mesh Running Sports ",
    price: "$30",
    oldPrice: "$32",
    discount: "-6%",
    rating: 5,
  },
  {
    name: "JAVIO Stylish Sports Casual Gym  ",
    priceRange: "$30 - $32",
    discount: "-6%",
    rating: 5,
  },
  {
    name: "Hikking Trekking Climbing Mountain Climbing Mountain ",
    price: "$30",
    oldPrice: "$31",
    discount: "-3%",
    rating: 4,
  },
  {
    name: "Nike Air Force 1 Low LX Mica Green  ",
    priceRange: "$32 - $33",
    rating: 5,
  },
];

export default function Shop() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-black">
          Latest Products
        </h1>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} image={productImage} {...product} />
        ))}
      </div>
    </section>
  );
}
