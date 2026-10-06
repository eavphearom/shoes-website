import { useState } from "react";
import useShopping from "../../hooks/useShopping";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import bannerImage from "../../assets/banner/banner5.png";

import abaLogo from "../../assets/payment/aba.jpeg";
import khqrLogo from "../../assets/payment/khqr.png";
import visaLogo from "../../assets/payment/Visa_Inc.-Logo.wine.png";

function formatPrice(value) {
  return value.toFixed(2);
}

function QuantityControl({ quantity, stock, onChange }) {
  return (
    <div className="inline-flex h-9 w-fit overflow-hidden rounded-lg border border-[#E5EAF0] bg-[#F8FAFC]">
      <button
        type="button"
        className="flex h-9 w-9 cursor-pointer items-center justify-center text-[#07182E] transition hover:bg-[#F97316] hover:text-white"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => onChange(quantity - 1)}
      >
        <Minus size={14} />
      </button>

      <span className="flex h-9 w-9 items-center justify-center border-x border-[#E5EAF0] bg-white text-sm font-semibold text-[#07182E]">
        {quantity}
      </span>

      <button
        type="button"
        className="flex h-9 w-9 cursor-pointer items-center justify-center text-[#F97316] transition hover:bg-[#F97316] hover:text-white"
        aria-label="Increase quantity"
        disabled={quantity >= stock}
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function CartItemCard({ item }) {
  const productPath = `/product/${item.productId}`;
  const { setQuantity, removeItem } = useShopping();
  const [error, setError] = useState("");
  const act = (fn) => { try { fn(); setError(""); } catch (error) { setError(error.message); } };

  return (
    <div className="rounded-xl border border-[#E8EDF3] bg-white p-3 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)] sm:p-4">
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      {/* Mobile */}
      <div className="flex gap-3 lg:hidden">
        <Link
          to={productPath}
          className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F6F7F9]"
          aria-label={`View ${item.name} details`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain p-2"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                to={productPath}
                className="line-clamp-2 text-sm font-semibold text-[#07182E] transition hover:text-[#E96400]"
              >
                {item.name}
              </Link>

              <p className="mt-1 text-xs text-[#64748B]">{item.category}</p>
            </div>

            <button
              type="button"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] transition hover:bg-red-50 hover:text-red-500"
              aria-label={`Remove ${item.name}`}
          onClick={() => act(() => removeItem(item.key))}
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-[#64748B]">
            {item.details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>

          {/* <div className="mt-2">
            <StockBadge status={item.stockStatus} />
          </div> */}
        </div>
      </div>

      {/* Mobile controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF2F6] pt-3 lg:hidden">
        <div>
          <p className="text-sm font-bold text-[#07182E]">
            $ {formatPrice(item.price)}
          </p>

          {item.oldPrice && (
            <p className="text-[11px] font-medium text-[#A5AFBD] line-through">
              $ {formatPrice(item.oldPrice)}
            </p>
          )}
        </div>

        <QuantityControl quantity={item.quantity} stock={item.stock} onChange={(value) => act(() => setQuantity(item.key, value))} />

        <p className="text-sm font-bold text-[#07182E]">
          $ {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden items-center gap-5 lg:grid lg:grid-cols-[minmax(260px,1.8fr)_0.55fr_0.75fr_0.65fr_40px]">
        {/* Product */}
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to={productPath}
            className="flex h-[86px] w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F6F7F9] transition hover:opacity-90"
            aria-label={`View ${item.name} details`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain p-2"
            />
          </Link>

          <div className="min-w-0">
            <Link
              to={productPath}
              className="line-clamp-1 text-sm font-bold text-[#07182E] transition hover:text-[#E96400]"
            >
              {item.name}
            </Link>

            <p className="mt-1 text-xs font-medium text-[#64748B]">
              {item.category}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#64748B]">
              {item.details.map((detail) => (
                <span key={detail}>{detail}</span>
              ))}
            </div>

           
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm font-bold text-[#07182E]">
            $ {formatPrice(item.price)}
          </p>

          {item.oldPrice && (
            <p className="mt-1 text-[11px] font-semibold text-[#A5AFBD] line-through">
              $ {formatPrice(item.oldPrice)}
            </p>
          )}
        </div>

        {/* Quantity */}
        <QuantityControl quantity={item.quantity} stock={item.stock} onChange={(value) => act(() => setQuantity(item.key, value))} />

        {/* Subtotal */}
        <p className="text-sm font-bold text-[#07182E]">
          $ {formatPrice(item.price * item.quantity)}
        </p>

        {/* Delete */}
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] transition hover:bg-red-50 hover:text-red-500"
          aria-label={`Remove ${item.name}`}
          onClick={() => act(() => removeItem(item.key))}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function CartItems() {
  const { cart: cartItems } = useShopping();
  return (
    <div>
      {cartItems.length === 0 && <p className="rounded-xl bg-white p-6 text-[#64748B]">Your cart is empty. Choose a product, color, and size to get started.</p>}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <CartItemCard key={item.key} item={item} />
        ))}
      </div>

      <Link
        to="/shop"
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D7DFEA] bg-white px-5 text-sm font-semibold text-[#07182E] transition hover:border-[#E96400] hover:text-[#E96400]"
      >
        <ArrowLeft size={16} />
        Continue shopping
      </Link>
    </div>
  );
}

function SecurePaymentStrip() {
  const paymentLogos = [
    {
      name: "Visa",
      logo: visaLogo,
    },
    {
      name: "ABA Pay",
      logo: abaLogo,
    },
    {
      name: "KHQR",
      logo: khqrLogo,
    },
  ];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-white px-3 py-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#07182E]">
        <ShieldCheck size={16} />
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
  const { cart: cartItems, subtotal, cartCount } = useShopping();
  const total = subtotal;
  const rows = [{ label: `Subtotal (${cartCount} items)`, value: formatPrice(subtotal) }];

  return (
    <aside className="h-fit self-start rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:sticky lg:top-24">
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
        <span className="text-base font-semibold text-[#07182E]">Subtotal</span>

        <span className="text-2xl font-semibold text-[#E96400]">
          $ {formatPrice(total)}
        </span>
      </div>

      <p className="mt-3 text-xs text-[#64748B]">Shipping is calculated at checkout.</p>
      {cartItems.length > 0 && <Link
        to="/checkout"
        className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E96400] px-5 text-sm font-semibold text-white transition hover:bg-[#C95500]"
      >
        Proceed to Checkout
        <ArrowRight size={16} />
      </Link>}

      {/* <Link
        to="/shop"
        className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E5EAF0] bg-white px-5 text-sm font-semibold text-[#07182E] transition hover:border-[#E96400] hover:text-[#E96400]"
      >
        <CreditCard size={17} />
        Continue shopping
      </Link> */}

      <SecurePaymentStrip />
    </aside>
  );
}

export default function Cart() {
  return (
    <div className="overflow-hidden bg-[#F7FAFC]">
      {/* Banner */}
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

      {/* Cart content */}
      <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-10 xl:grid-cols-[minmax(0,1fr)_390px]">
        <CartItems />

        <OrderSummary />
      </section>
    </div>
  );
}
