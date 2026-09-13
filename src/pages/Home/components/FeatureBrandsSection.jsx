import adidasLogo from "../../../assets/logo/Adidas_logo.png";
import converseLogo from "../../../assets/logo/converse.png";
import newBalanceLogo from "../../../assets/logo/New-Balance-Logo-1972-2006.png";
import nikeLogo from "../../../assets/logo/nike.png";
import pumaLogo from "../../../assets/logo/Puma-Logo.png";

const brands = [
  { name: "Nike", logo: nikeLogo },
  { name: "Adidas", logo: adidasLogo },
  { name: "Puma", logo: pumaLogo },
  { name: "New Balance", logo: newBalanceLogo },
  { name: "Converse", logo: converseLogo },
];

export default function FeatureBrandsSection() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-michroma text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#F97316]">
              Trusted names
            </p>
            <h2 className="mt-2 font-michroma text-lg font-extrabold text-[#07182E] sm:text-xl md:text-2xl">
              Featured Brands
            </h2>
          </div>
          <p className="max-w-md text-xs font-medium leading-5 text-[#5F6B7A] sm:text-right">
            Explore favorite footwear labels selected for sport, lifestyle, and
            everyday comfort.
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex h-24 min-w-[170px] shrink-0 items-center justify-center rounded-2xl border border-[#E8EDF4]  px-2  transition duration-300 hover:-translate-y-1 hover:border-[#F97316]/40 hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] sm:h-28 sm:min-w-[210px] lg:min-w-0"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="max-h-12 max-w-full object-contain opacity-75 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
