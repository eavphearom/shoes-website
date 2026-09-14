import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner/banner4.png";
import storyImage from "../../assets/banner/banner1.png";
import productImage from "../../assets/product/image.png";

const benefits = [
  {
    title: "Fast Delivery",
    text: "Reliable shipping for every order.",
    icon: Truck,
  },
  {
    title: "Quality Checked",
    text: "Every pair is reviewed before delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    text: "Simple returns when the fit is not right.",
    icon: RefreshCw,
  },
  {
    title: "Secure Payment",
    text: "Safe checkout with trusted payment options.",
    icon: LockKeyhole,
  },
];

const values = [
  {
    title: "Comfort",
    text: "Shoes selected for daily movement, support, and easy wear.",
    icon: HeartHandshake,
  },
  {
    title: "Quality",
    text: "Durable materials and details that hold up beyond the first step.",
    icon: BadgeCheck,
  },
  {
    title: "Style",
    text: "Modern silhouettes that work for sport, street, and weekends.",
    icon: Sparkles,
  },
  {
    title: "Customer First",
    text: "A shopping experience designed to feel clear, helpful, and honest.",
    icon: Star,
  },
];

function SectionLabel({ children }) {
  return (
    <p className="font-michroma text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#E96400]">
      {children}
    </p>
  );
}

function BenefitItem({ benefit }) {
  const Icon = benefit.icon;

  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF3E8] text-[#E96400]">
        <Icon size={20} strokeWidth={2.2} />
      </span>
      <div>
        <h3 className="text-sm font-extrabold text-[#07182E]">
          {benefit.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#64748B]">{benefit.text}</p>
      </div>
    </div>
  );
}

function ValueCard({ value }) {
  const Icon = value.icon;

  return (
    <div className="rounded-xl border border-[#E6EAF0] bg-white p-5 transition hover:border-[#F8C9A5]">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#E96400]">
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <h3 className="mt-5 text-base font-extrabold text-[#07182E]">
        {value.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#64748B]">{value.text}</p>
    </div>
  );
}

export default function About() {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <Link to="/" className="transition hover:text-[#E96400]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#07182E]">About</span>
            </div>

            <SectionLabel>About E-Step</SectionLabel>
            <h1 className="mt-4 max-w-2xl font-michroma text-3xl font-extrabold leading-tight text-[#07182E] sm:text-4xl lg:text-5xl">
              About Go Shoes
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B]">
              We bring together comfort, style, and everyday movement with
              footwear made for real routines, long days, and confident steps.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-lg bg-[#E96400] px-6 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#C95500]"
            >
              Shop Now
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -right-10 top-8 h-52 w-52 rounded-full bg-[#FFE8D6]" />
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <img
                src={bannerImage}
                alt="Runner wearing shoes"
                className="h-[300px] w-full object-cover sm:h-[380px] lg:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div className="overflow-hidden rounded-2xl bg-[#F7F8FA]">
            <img
              src={storyImage}
              alt="Lifestyle shoes"
              className="h-[320px] w-full object-cover sm:h-[420px]"
            />
          </div>

          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 font-michroma text-2xl font-extrabold text-[#07182E] sm:text-3xl">
              Our Story
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#64748B] sm:text-base">
              Go Shoes started with a simple idea: shopping for shoes should
              feel inspiring, practical, and easy. We focus on footwear that
              works across everyday movement, from morning errands to evening
              plans.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
              Each collection is shaped around comfort-first construction,
              clean style, and reliable quality, so every pair feels ready from
              the first step.
            </p>
            <p className="mt-6 font-michroma text-sm font-extrabold text-[#E96400]">
              Made for the way you move.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#E6EAF0] bg-white p-6 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#E96400]">
              <Target size={23} />
            </span>
            <SectionLabel>Our Mission</SectionLabel>
            <h2 className="mt-3 text-2xl font-extrabold text-[#07182E]">
              Mission
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
              To help every customer find shoes that balance comfort,
              confidence, and modern style without making the experience
              complicated.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E6EAF0] bg-white p-6 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#E96400]">
              <Sparkles size={23} />
            </span>
            <SectionLabel>Our Vision</SectionLabel>
            <h2 className="mt-3 text-2xl font-extrabold text-[#07182E]">
              Vision
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
              To become a trusted footwear destination for people who want
              wearable design, dependable quality, and a better way to shop.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2 className="mt-3 font-michroma text-2xl font-extrabold text-[#07182E] sm:text-3xl">
                More Reasons to Love Go Shoes
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#64748B] sm:text-right">
              Thoughtful service, trustworthy quality, and simple shopping from
              browsing to delivery.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <BenefitItem key={benefit.title} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-9 text-center">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="mt-3 font-michroma text-2xl font-extrabold text-[#07182E] sm:text-3xl">
              What We Stand For
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <ValueCard key={value.title} value={value} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-8 overflow-hidden rounded-3xl bg-[#07182E] p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:p-10">
          <div>
            <SectionLabel>Find Your Fit</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-michroma text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Ready to find your next pair?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Explore sneakers, trainers, and everyday shoes selected for
              comfort, quality, and clean modern style.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-lg bg-[#E96400] px-6 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#C95500]"
            >
              Shop Now
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative min-h-[220px] rounded-2xl bg-white/8">
            <img
              src={productImage}
              alt="Featured shoe"
              className="absolute inset-0 h-full w-full object-contain p-6 drop-shadow-[0_24px_36px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
