import {
  ArrowRight,
  BadgePercent,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner/banner5.png";
import productImage from "../../assets/product/image.png";
import productImageAlt from "../../assets/product/images.png";
import abaLogo from "../../assets/payment/aba.jpeg";
import khqrLogo from "../../assets/payment/khqr.png";
import visaLogo from "../../assets/payment/Visa_Inc.-Logo.wine.png";


const cartItems = [
  {
    name: "Nike Air Force 1 '07",
    category: "Men's Lifestyle Shoes",
    details: ["Size: 9 (US)", "Color: White / Black"],
    price: 110,
    quantity: 1,
    image: productImage,
  },
  {
    name: "Adidas Ultraboost 1.0",
    category: "Men's Running Shoes",
    details: ["Size: 9 (US)", "Color: Core Black"],
    price: 180,
    oldPrice: 220,
    quantity: 1,
    image: productImageAlt,
  },
  {
    name: "New Balance 530",
    category: "Unisex Lifestyle Shoes",
    details: ["Size: 8 (US)", "Color: Grey / Silver"],
    price: 100,
    quantity: 1,
    image: productImage,
  },
];

const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
);
const shipping = 10;
const discount = 30;
const tax = 29.6;
const total = subtotal + shipping - discount + tax;

function formatPrice(value) {
  return `${value.toFixed(2)}`;
}

function getProductPath(name) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `/product/${slug}`;
}

function QuantityControl({ quantity }) {
  return (
    <div className="inline-flex h-10 overflow-hidden rounded-xl border border-[#E5EAF0] bg-[#F8FAFC]">
      <button
        type="button"
        className="cursor-pointer flex w-10 items-center justify-center text-[#07182E] transition hover:bg-white hover:text-[#E96400]"
        aria-label="Decrease quantity"
      >
        <Minus size={15} />
      </button>
      <span className="flex w-10 items-center justify-center border-x border-[#E5EAF0] text-sm font-semibold text-[#07182E]">
        {quantity}
      </span>
      <button
        type="button"
        className="cursor-pointer flex w-10 items-center justify-center text-[#07182E] transition hover:bg-white hover:text-[#E96400]"
        aria-label="Increase quantity"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}

function CartItemRow({ item }) {
  const productPath = getProductPath(item.name);

  return (
    <div className="grid gap-4 border-b border-[#E8EDF3] px-4 py-5 last:border-b-0 sm:px-5 lg:grid-cols-[1.35fr_1fr_0.55fr_0.75fr_0.65fr_32px] lg:items-center">
      <div className="flex gap-4">
        <Link
          to={productPath}
          className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F4F6F8] transition hover:opacity-90"
          aria-label={`View ${item.name} details`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain p-2"
          />
        </Link>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold text-[#07182E]">
            {item.name}
          </h3>
          <p className="mt-1 text-xs font-semibold text-[#64748B]">
            {item.category}
          </p>
          <div className="mt-3 grid gap-1 text-xs font-medium text-[#64748B] lg:hidden">
            {item.details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden text-xs font-semibold leading-6 text-[#64748B] lg:grid">
        {item.details.map((detail) => (
          <span key={detail}>{detail}</span>
        ))}
      </div>

      <div className="flex items-center justify-between lg:block">
        <span className="text-xs font-semibold uppercase text-[#94A3B8] lg:hidden">
          Price
        </span>
        <div>
          <p className="text-sm font-semibold text-[#07182E]">
            {formatPrice(item.price)}
          </p>
          {item.oldPrice && (
            <p className="text-xs font-semibold text-[#A5AFBD] line-through">
              {formatPrice(item.oldPrice)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between lg:block">
        <span className="text-xs font-semibold uppercase text-[#94A3B8] lg:hidden">
          Quantity
        </span>
        <QuantityControl quantity={item.quantity} />
      </div>

      <div className="flex items-center justify-between lg:block">
        <span className="text-xs font-semibold uppercase text-[#94A3B8] lg:hidden">
          Subtotal
        </span>
        <p className="text-sm font-semibold text-[#07182E]">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      <button
        type="button"
        className="cursor-pointer hidden h-8 w-8 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#FFF3E8] hover:text-[#E96400] lg:flex"
        aria-label={`Remove ${item.name}`}
      >
        <X size={17} />
      </button>
    </div>
  );
}

function CartTable() {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-[#E6EAF0] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <div className="hidden grid-cols-[1.35fr_1fr_0.55fr_0.75fr_0.65fr_32px] border-b border-[#E8EDF3] px-5 py-4 text-xs font-semibold uppercase text-[#07182E] lg:grid">
          <span>Product</span>
          <span>Details</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
          <span />
        </div>

        {cartItems.map((item) => (
          <CartItemRow key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function SecurePaymentStrip() {
  const paymentLogos = [
    { name: "Visa", logo: visaLogo },
    { name: "ABA Pay", logo: abaLogo },
    { name: "KHQR", logo: khqrLogo },
  ];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl  bg-white px-3 py-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#07182E]">
        <ShieldCheck size={16} className="text-[#07182E]" />
        <span>Secure Payment</span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        {paymentLogos.map((payment) => (
          <span
            key={payment.name}
            className="flex h-6 min-w-10 items-center justify-center rounded-md bg-[#F8FAFC] px-1.5"
          >
            <img
              src={payment.logo}
              alt={payment.name}
              className="max-h-4 max-w-[52px] object-contain"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function OrderSummary() {
  const rows = [
    { label: "Subtotal (3 items)", value: formatPrice(subtotal) },
    { label: "Shipping", value: formatPrice(shipping) },
    { label: "Discount", value: `- ${formatPrice(discount)}`, highlight: true },
    { label: "Estimated Tax", value: formatPrice(tax) },
  ];

  return (
    <aside className="h-fit self-start rounded-2xl  border border-[#E6EAF0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:sticky lg:top-24">
      <h2 className="font-michroma text-xl font-semibold text-[#07182E]">
        Order Summary
      </h2>

      <div className="mt-5 space-y-3 border-b border-[#E8EDF3] pb-5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="font-medium text-[#64748B]">{row.label}</span>
            <span
              className={`font-semibold ${
                row.highlight ? "text-[#E96400]" : "text-[#07182E]"
              }`}
            >
              $ {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="text-base font-semibold text-[#07182E]">Total</span>
        <span className=" text-2xl font-semibold text-[#E96400]">
         $ {formatPrice(total)}
        </span>
      </div>
      <div className="mt-5 flex gap-2">
        <label className="relative min-w-0 flex-1 sm:max-w-xs">
          <BadgePercent
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            placeholder="Enter coupon code"
            className="h-12 w-full rounded-xl border border-[#E5EAF0] bg-[#FAFBFC] pl-11 pr-3 text-sm outline-none transition placeholder:text-[#9AA6B5] focus:border-[#E96400] focus:bg-white focus:ring-4 focus:ring-[#E96400]/10"
          />
        </label>
        <button
          type="button"
          className="cursor-pointer h-12 rounded-xl bg-[#FFF0E7] px-6 text-sm font-semibold text-[#E96400] transition hover:bg-[#E96400] hover:text-white"
        >
          Apply
        </button>
      </div>
      {/* <div className="mt-5 rounded-xl bg-[#EAFBF1] p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#12A467]">
            <Truck size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#108657]">
              Free shipping on orders over $50
            </p>
            <p className="mt-1 text-[11px] font-semibold text-[#64748B]">
              You&apos;re $0.00 away from free shipping.
            </p>
          </div>
          <CheckCircle2 size={20} className="text-[#12A467]" />
        </div>
      </div> */}

      <Link
        to="/checkout"
        className="cursor-pointer mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E96400] px-5 text-sm font-semibold text-white transition hover:bg-[#C95500]"
      >
        Proceed to Checkout
        <ArrowRight size={16} />
      </Link>

      <button
        type="button"
        className="cursor-pointer mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5EAF0] bg-white px-5 text-sm font-semibold text-[#07182E] transition hover:border-[#E96400] hover:text-[#E96400]"
      >
        <CreditCard size={17} />
        Continue shopping
      </button>

      <SecurePaymentStrip />
    </aside>
  );
}

export default function Cart() {
  return (
    <div className="overflow-hidden bg-[#F7FAFC]">
      <section className="relative overflow-hidden bg-[#EEF4F8] px-4 py-10 sm:px-6 lg:px-8">
        <img
          src={bannerImage}
          alt="Shopping cart banner"
          className="absolute inset-y-0 right-0 hidden h-full w-[58%] object-cover object-center opacity-90 md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF4F8] via-[#EEF4F8]/90 to-[#EEF4F8]/25" />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <Link to="/" className="transition hover:text-[#E96400]">
              Home
            </Link>
            <span>/</span>
            <span>Shopping Cart</span>
          </div>
          <h1 className="mt-3 font-michroma text-3xl font-semibold text-[#07182E] sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#64748B]">
            Great shoes take you to great places. You&apos;re one step closer!
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-6 px-4 pt-0 pb-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-10 xl:grid-cols-[minmax(0,1fr)_390px]">
        <CartTable />
        <OrderSummary />
      </section>
    </div>
  );
}








