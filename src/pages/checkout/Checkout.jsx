import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import PaymentQrModal from "./components/PaymentQrModal";
import bannerImage from "../../assets/banner/banner5.png";
import productImage from "../../assets/product/image.png";
import productImageAlt from "../../assets/product/images.png";
import ceLogo from "../../assets/delivery/ce.png";
import grabLogo from "../../assets/delivery/grab.png";
import jtLogo from "../../assets/delivery/j&t.png";
import vetLogo from "../../assets/delivery/vet.png";


const checkoutItems = [
  {
    name: "Nike Air Force 1 '07",
    details: "Size: 9 (US) | White / Black",
    price: 110,
    quantity: 1,
    image: productImage,
  },
  {
    name: "Adidas Ultraboost",
    details: "Size: 9 (US) | Core Black",
    price: 180,
    quantity: 1,
    image: productImageAlt,
  },
  {
    name: "New Balance 530",
    details: "Size: 8 (US) | Grey / Silver",
    price: 100,
    quantity: 1,
    image: productImage,
  },
];

const subtotal = checkoutItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
);
const discount = 30;

const deliveryMethods = [
  { name: "J&T Express", time: "1-3 days", price: 2, logo: jtLogo },
  { name: "Grab Express", time: "Same day", price: 2, logo: grabLogo },
  { name: "VET Express", time: "2-4 days", price: 2.5, logo: vetLogo },
  { name: "CE Express", time: "3-5 days", price: 2, logo: ceLogo },
];

const fieldClass =
  "mt-2 h-11 rounded-xl border-[#E5EAF0] bg-[#FAFBFC] px-4 text-sm text-[#07182E] focus:border-[#E96400] focus:ring-[#E96400]/10";

const selectClass =
  "mt-2 h-11 rounded-xl border-[#E5EAF0] bg-[#FAFBFC] px-4 text-sm text-[#07182E] focus:border-[#E96400] focus:ring-[#E96400]/10";

const provinceOptions = [
  { label: "Phnom Penh", value: "phnom-penh" },
  { label: "Kandal", value: "kandal" },
  { label: "Siem Reap", value: "siem-reap" },
];

const districtOptions = [
  { label: "Chamkar Mon", value: "chamkar-mon" },
  { label: "Toul Kork", value: "toul-kork" },
  { label: "Daun Penh", value: "daun-penh" },
];

const communeOptions = [
  { label: "Tonle Basak", value: "tonle-basak" },
  { label: "Boeng Keng Kang", value: "boeng-keng-kang" },
  { label: "Phsar Thmei", value: "phsar-thmei" },
];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function RequiredLabel({ children }) {
  return (
    <span className="text-xs font-semibold text-[#07182E]">
      {children}<span className="ml-1 text-[#E96400]">*</span>
    </span>
  );
}

function SectionCard({ step, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E96400] text-sm font-semibold text-white">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-semibold text-[#07182E]">{title}</h2>
          <p className="mt-1 text-xs font-medium text-[#64748B]">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ShippingInformation() {
  return (
    <SectionCard
      step="1"
      title="Shipping Information"
      subtitle="Please enter your shipping details."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          name="fullName"
          label={<RequiredLabel>Full Name</RequiredLabel>}
          defaultValue="Bunheng"
          className={fieldClass}
        />
        <Input
          name="phoneNumber"
          label={<RequiredLabel>Phone Number</RequiredLabel>}
          defaultValue="096 5231 272"
          className={fieldClass}
        />
        <Input
          name="email"
          type="email"
          label={<RequiredLabel>Email Address</RequiredLabel>}
          defaultValue="bunheng@example.com"
          className={fieldClass}
        />
        <Select
          name="province"
          label={<RequiredLabel>Province / City</RequiredLabel>}
          options={provinceOptions}
          defaultValue="phnom-penh"
          className={selectClass}
        />
        <Select
          name="district"
          label={<RequiredLabel>District / Khan</RequiredLabel>}
          options={districtOptions}
          defaultValue="chamkar-mon"
          className={selectClass}
        />
        <Select
          name="commune"
          label={<RequiredLabel>Commune / Sangkat</RequiredLabel>}
          options={communeOptions}
          defaultValue="tonle-basak"
          className={selectClass}
        />
        <Input
          name="streetAddress"
          label={<RequiredLabel>Street Address</RequiredLabel>}
          defaultValue="#123, Street 360"
          className={`md:col-span-3 ${fieldClass}`}
        />
        <Textarea
          name="additionalInfo"
          label="Additional Information (Optional)"
          placeholder="Apartment, landmark, or delivery instructions..."
          className={`md:col-span-8 ${fieldClass}`}
        />
      </div>
    </SectionCard>
  );
}

function DeliveryMethod({ selectedMethod, onSelectMethod }) {
  return (
    <SectionCard
      step="2"
      title="Delivery Method"
      subtitle="Choose the delivery company for your order."
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {deliveryMethods.map((method) => {
          const isSelected = selectedMethod.name === method.name;

          return (
            <button
              key={method.name}
              type="button"
              onClick={() => onSelectMethod(method)}
              className={`cursor-pointer rounded-xl border p-3 text-left transition hover:border-[#E96400]  ${
                isSelected
                  ? "border-[#E96400]  ring-2 ring-[#E96400]/10"
                  : "border-[#E5EAF0] "
              }`}
              aria-pressed={isSelected}
            >
              <span className="flex h-11 items-center justify-center rounded-lg ">
                <img
                  src={method.logo}
                  alt={method.name}
                  className="max-h-8 max-w-full rounded-2xl object-contain"
                />
              </span>
              <span className="mt-2 block text-xs font-semibold text-[#07182E]">
                {method.name}
              </span>
              <span className="mt-1 flex items-center justify-between gap-2 text-[11px] font-medium text-[#64748B]">
                <span>{method.time}</span>
                <span className="font-semibold text-[#E96400]">
                  {formatPrice(method.price)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}

function SummaryItem({ item }) {
  return (
    <div className="grid grid-cols-[64px_1fr_auto] gap-3 border-b border-[#E8EDF3] py-4 last:border-b-0">
      <div className="flex h-14 w-16 items-center justify-center rounded-xl bg-[#F4F6F8]">
        <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-[#07182E]">{item.name}</p>
        <p className="mt-1 text-[11px] font-medium text-[#64748B]">{item.details}</p>
        <p className="mt-1 text-[11px] font-medium text-[#64748B]">Qty: {item.quantity}</p>
      </div>
      <p className="text-xs font-semibold text-[#07182E]">{formatPrice(item.price)}</p>
    </div>
  );
}

function CheckoutSummary({ onPayNow, deliveryMethod, shipping, total }) {
  return (
    <aside className="h-fit rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-michroma text-xl font-semibold text-[#07182E]">Order Summary</h2>
          <p className="mt-1 text-xs font-medium text-[#64748B]">3 items</p>
        </div>
        <Link to="/cart" className="text-xs font-semibold text-[#E96400] hover:text-[#C95500]">
          Edit Cart
        </Link>
      </div>

      <div className="mt-4">
        {checkoutItems.map((item) => (
          <SummaryItem key={item.name} item={item} />
        ))}
      </div>

      <div className="mt-5 space-y-3 border-b border-[#E8EDF3] pb-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="font-medium text-[#64748B]">Subtotal</span>
          <span className="font-semibold text-[#07182E]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="font-medium text-[#64748B]">Shipping ({deliveryMethod.name})</span>
          <span className="font-semibold text-[#07182E]">{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="font-medium text-[#64748B]">Discount</span>
          <span className="font-semibold text-[#12A467]">- {formatPrice(discount)}</span>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="text-base font-semibold text-[#07182E]">Total</span>
        <span className="text-2xl font-semibold text-[#E96400]">{formatPrice(total)}</span>
      </div>

      <button
        type="button"
        onClick={onPayNow}
        className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E96400] px-5 text-sm font-semibold text-white transition hover:bg-[#C95500]"
      >
        <LockKeyhole size={16} />
        Pay Now
        <ArrowRight size={16} />
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-medium text-[#64748B]">
        <ShieldCheck size={15} className="text-[#12A467]" />
        Your payment is secured with SSL encryption.
      </div>


    </aside>
  );
}

export default function Checkout() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryMethods[0]);
  const shipping = selectedDelivery.price;
  const total = subtotal + shipping - discount;

  return (
    <div className="overflow-hidden bg-[#F7FAFC]">
      <section className="relative overflow-hidden bg-[#EEF4F8] px-4 py-8 sm:px-6 lg:px-8">
        <img
          src={bannerImage}
          alt="Checkout banner"
          className="absolute inset-y-0 right-0 hidden h-full w-[58%] object-cover object-center opacity-90 md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF4F8] via-[#EEF4F8]/90 to-[#EEF4F8]/25" />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <Link to="/" className="transition hover:text-[#E96400]">Home</Link>
            <span>/</span>
            <Link to="/cart" className="transition hover:text-[#E96400]">Cart</Link>
            <span>/</span>
            <span>Checkout</span>
          </div>
          <h1 className="mt-3 font-michroma text-3xl font-semibold text-[#07182E] sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#64748B]">
            Complete your order and make payment securely.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-10 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="grid gap-5">
          <ShippingInformation />
          <DeliveryMethod
            selectedMethod={selectedDelivery}
            onSelectMethod={setSelectedDelivery}
          />
        </div>
        <CheckoutSummary
          onPayNow={() => setIsPaymentOpen(true)}
          deliveryMethod={selectedDelivery}
          shipping={shipping}
          total={total}
        />
      </section>

      <PaymentQrModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        total={total}
      />
    </div>
  );
}













