import { Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  { label: "Email", value: "support@solestore.test", icon: Mail },
  { label: "Phone", value: "+1 (555) 014-2026", icon: Phone },
  { label: "Store", value: "214 Market Street, New York", icon: MapPin },
];

export default function Contact() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2563EB]">
          Contact
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-[#111827]">
          We are happy to help.
        </h1>
        <p className="mt-4 leading-7 text-[#4B5563]">
          Send a message about sizing, orders, returns, or product availability.
        </p>

        <div className="mt-8 grid gap-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#6B7280]">
                    {item.label}
                  </p>
                  <p className="font-bold text-[#111827]">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-[#111827]">
            Name
            <input
              className="h-11 rounded-lg border border-[#D1D5DB] px-3 text-sm outline-none focus:border-[#2563EB]"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#111827]">
            Email
            <input
              type="email"
              className="h-11 rounded-lg border border-[#D1D5DB] px-3 text-sm outline-none focus:border-[#2563EB]"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#111827]">
            Message
            <textarea
              rows="5"
              className="rounded-lg border border-[#D1D5DB] px-3 py-3 text-sm outline-none focus:border-[#2563EB]"
              placeholder="How can we help?"
            />
          </label>
          <button
            type="button"
            className="h-11 rounded-lg bg-[#2563EB] text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
          >
            Send message
          </button>
        </div>
      </form>
    </section>
  );
}
