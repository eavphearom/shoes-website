import { Send } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { FormField } from "./FormField";
export function ContactFormCard() {
  return (
    <form className="rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-7 lg:p-8">
      <div className="mb-7">
        <SectionLabel>Contact Form</SectionLabel>
        <h2 className="mt-3 font-michroma text-2xl font-extrabold text-[#07182E]">
          Send Us a Message
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
          Tell us what you need and our team will get back to you as soon as
          possible.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" required placeholder="Your full name" />
        <FormField
          label="Email Address"
          required
          type="email"
          placeholder="you@example.com"
        />
        <FormField label="Phone Number" placeholder="+1 555 000 0000" />
        <FormField
          label="Message"
          required
          as="textarea"
          rows="6"
          className="sm:col-span-2"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="button"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E96400] px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#C95500] sm:w-auto"
      >
        Send Message
        <Send size={17} />
      </button>
    </form>
  );
}

