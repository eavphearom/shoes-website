import { MessageCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../../assets/banner/banner4.png";
import { SectionLabel } from "./SectionLabel";

export function ContactHero() {
  return (
    <section className="relative bg-[#F8F4EF] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <Link to="/" className="transition hover:text-[#E96400]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#07182E]">Contact</span>
          </div>
          <SectionLabel>Get In Touch</SectionLabel>
          <h1 className="mt-4 font-michroma text-3xl font-extrabold leading-tight text-[#07182E] sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748B] sm:text-base">
            We&apos;re here to help! Get in touch with us for questions, orders,
            product information, or support.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E96400] px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#C95500]"
            >
              Shop Now
              <ShoppingBag size={17} />
            </Link>
            <a
              href="mailto:support@goshoes.com"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E6EAF0] bg-white px-6 text-sm font-semibold text-[#07182E] transition hover:border-[#F8C9A5] hover:text-[#E96400]"
            >
              Email Support
              <MessageCircle size={17} />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-12 top-8 h-56 w-56 rounded-full bg-[#FFDCC1]" />
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
            <img
              src={heroImage}
              alt="Runner wearing shoes"
              className="h-[270px] w-full object-cover sm:h-[340px] lg:h-[380px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4EF]/35 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}


