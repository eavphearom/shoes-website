import { Clock, Headphones, Mail, MapPin, Phone } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const contactInfo = [
  {
    label: "Store Address",
    value: "214 Market Street, New York, NY 10012",
    icon: MapPin,
  },
  { label: "Phone", value: "096 5231 272", icon: Phone },
  { label: "Email", value: "goshoes@.com", icon: Mail },
  {
    label: "Business Hours",
    value: "Mon - Sun: 8:00 AM - 8:00 PM",
    icon: Clock,
  },
  {
    label: "Customer Support",
    value: "Orders, returns, sizing, and product help",
    icon: Headphones,
  },
];

export function ContactInfoCard() {
  return (
    <div className="rounded-2xl border border-[#E6EAF0] bg-white p-5 sm:p-6">
      <SectionLabel>Store Info</SectionLabel>
      <h2 className="mt-3 font-michroma text-xl text-[#07182E]">
        Contact Information
      </h2>
      <div className="mt-6 grid gap-5">
        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#E96400]">
                <Icon size={19} strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#07182E]">{item.label}</p>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


