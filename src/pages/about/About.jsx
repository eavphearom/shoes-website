import { CheckCircle2 } from "lucide-react";
import heroShoe from "../../assets/hero.png";

const values = [
  "Comfort-first product selection",
  "Durable styles for everyday use",
  "Clear pricing with no confusing checkout",
];

export default function About() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
      <div className="rounded-lg bg-[#F3F4F6] p-8">
        <img src={heroShoe} alt="Featured shoe" className="mx-auto w-full max-w-lg" />
      </div>

      <div className="self-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2563EB]">
          About us
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold leading-tight text-[#111827]">
          A shoe store built around everyday movement.
        </h1>
        <p className="mt-5 leading-7 text-[#4B5563]">
          SoleStore focuses on clean, wearable footwear that works across busy
          routines. The collection is intentionally simple: strong basics,
          reliable trainers, and fresh seasonal styles.
        </p>
        <div className="mt-8 grid gap-4">
          {values.map((value) => (
            <div key={value} className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#2563EB]" />
              <span className="font-semibold text-[#111827]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
