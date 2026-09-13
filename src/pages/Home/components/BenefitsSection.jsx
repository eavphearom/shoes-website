import { ShieldCheck, Truck, Zap } from "lucide-react";

// Service benefits are kept separate from Home.jsx for quick updates.
const benefits = [
  { title: "Fast Delivery", text: "Reliable shipping for every order.", icon: Truck },
  { title: "Quality Checked", text: "Built for daily comfort and support.", icon: ShieldCheck },
  { title: "Fresh Drops", text: "New styles added every season.", icon: Zap },
];

export default function BenefitsSection() {
  return (
    <section className="border-y border-[#E5E7EB] bg-[#F9FAFB]">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div key={benefit.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#2563EB]">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="font-michroma font-bold text-[#111827]">{benefit.title}</h3>
                <p className="mt-1 text-sm font-michroma leading-6 text-[#4B5563]">
                  {benefit.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
