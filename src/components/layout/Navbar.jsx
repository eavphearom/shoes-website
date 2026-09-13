import {
  Heart,
  Home,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const transparentHeaderRoutes = ["/"];

const desktopLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  // { label: "Category", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Blog", to: "/blog" },
];

const mobileLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Shop", to: "/shop", icon: Store },
  { label: "Cart", to: "/cart", icon: ShoppingCart },
  { label: "Account", to: "/login", icon: User },
];

function desktopLinkClass({ isActive }) {
  return `flex items-center gap-1.5 text-sm font-bold transition lg:text-base ${
    isActive ? "text-[#F97316]" : "text-[#111827] hover:text-[#F97316]"
  }`;
}

function mobileLinkClass({ isActive }) {
  return `flex flex-1 flex-col items-center justify-center gap-1 rounded-full py-2 text-[10px] font-bold transition-all duration-300 ease-out active:scale-95 ${
    isActive
      ? "scale-[1.03] bg-white/85 text-[#F97316] shadow-[0_10px_25px_rgba(15,23,42,0.12)] ring-1 ring-white/70"
      : "text-[#64748B] hover:bg-white/45 hover:text-[#111827]"
  }`;
}

function CounterBadge() {
  return (
    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F97316] px-1 text-[11px] font-bold leading-none text-white">
      0
    </span>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);
  3;
  const canUseTransparentHeader = transparentHeaderRoutes.includes(pathname);
  const shouldShowTransparentHeader = canUseTransparentHeader && !hasScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-40 transition-all duration-300 ${
          shouldShowTransparentHeader
            ? "absolute border-b border-transparent bg-transparent"
            : canUseTransparentHeader
              ? "fixed border-b border-[#E5E7EB] bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur"
              : "sticky border-b border-[#E5E7EB] bg-white"
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-12">
          <Link to="/" className="flex items-end gap-1">
            <span className="text-3xl font-extrabold leading-none tracking-tight text-[#F97316]">
              Go
            </span>
            <ShoppingBag size={34} className="-mb-1 text-[#F97316]" />
            <span className="text-3xl font-extrabold leading-none tracking-tight text-[#111827]">
              shoes
            </span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-9">
            {desktopLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={desktopLinkClass}
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-[#111827] md:hidden">
            <button
              type="button"
              aria-label="Search"
              className="transition cursor-pointer hover:text-[#F97316]"
            >
              <Search size={20} strokeWidth={2.2} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative transition cursor-pointer hover:text-[#F97316]"
            >
              <Heart size={20} strokeWidth={2.2} />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative transition hover:text-[#F97316]"
            >
              <ShoppingBag size={20} strokeWidth={2.2} />
              <CounterBadge />
            </Link>
          </div>

          <div className="hidden items-center gap-6 text-[#111827] md:flex">
            <button
              type="button"
              aria-label="Search"
              className="transition cursor-pointer hover:text-[#F97316]"
            >
              <Search size={22} strokeWidth={2.2} />
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative transition hover:text-[#F97316]"
            >
              <Heart size={22} strokeWidth={2.2} />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative transition hover:text-[#F97316]"
            >
              <ShoppingBag size={22} strokeWidth={2.2} />
              <CounterBadge />
            </Link>
            <Link
              to="/login"
              aria-label="Account"
              className="transition hover:text-[#F97316]"
            >
              <User size={22} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-4 z-50 px-4 md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around gap-1 rounded-full border border-white/60 bg-white/65 p-1.5 shadow-[0_18px_45px_rgba(15,23,42,0.2)] backdrop-blur-sm transition-all duration-300 ease-out">
          {mobileLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.label}
                to={link.to}
                className={mobileLinkClass}
              >
                <Icon size={21} strokeWidth={2.2} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
