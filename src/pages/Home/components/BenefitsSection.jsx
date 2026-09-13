import { LockKeyhole, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    title: "Fast Delivery",
    text: "Reliable shipping for every order.",
    icon: Truck,
  },
  {
    title: "Quality Checked",
    text: "Products checked before delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    text: "Simple and convenient return process.",
    icon: RefreshCw,
  },
  {
    title: "Secure Payment",
    text: "Safe and trusted checkout experience.",
    icon: LockKeyhole,
  },
];

export default function BenefitsSection() {
  return (
    <section className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-20 bg-[#f8f8f8]">
      <div className="mx-auto">
        <div className="mb-10 text-center">
          <p className="font-michroma text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#F97316]">
            Why choose Go-Shoes
          </p>
          <h2 className="mt-3 font-michroma text-xl font-extrabold leading-tight text-[#07182E] sm:text-4xl">
            Why Shop With Us
          </h2>
          <p className="mt-3 font-michroma text-xs font-medium leading-6 text-[#6B7280] sm:text-xs">
            More than just shoes — a better shopping experience.
          </p>
        </div>

        <div className="grid gap-y-8 rounded-2xl bg-white/40 py-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`flex flex-col items-center px-6 text-center ${
                  index > 0 ? "lg:border-l lg:border-[#E2E8F0]" : ""
                }`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#07182E] shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
                  <Icon size={30} strokeWidth={2.1} />
                </span>

                <h3 className="mt-5 font-michroma text-sm font-extrabold text-[#07182E]">
                  {benefit.title}
                </h3>
                <p className="mt-3 max-w-[210px] font-michroma text-[11px] font-medium leading-5 text-[#6B7280]">
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
