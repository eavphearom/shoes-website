import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#111827] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="font-heading text-xl font-bold">SoleStore</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#D1D5DB]">
            Everyday sneakers, training shoes, and street-ready styles selected
            for comfort, durability, and clean design.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#9CA3AF]">
            Explore
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-[#D1D5DB]">
            <Link to="/shop" className="hover:text-white">
              Shop
            </Link>
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#9CA3AF]">
            Support
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-[#D1D5DB]">
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link to="/login" className="hover:text-white">
              Account
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
