import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickHelpCard() {
  return (
    <div className="rounded-2xl border border-[#F8C9A5] bg-[#FFF7F0] p-5 sm:p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#E96400]">
        <HelpCircle size={22} strokeWidth={2.2} />
      </span>
      <h2 className="mt-4 font-michroma text-xl text-[#07182E]">
        Need Quick Help?
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#64748B]">
        Browse support topics for sizing, delivery, payment, and returns.
      </p>
      <Link
        to="/contact"
        className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#dd6532] px-5 text-sm font-semibold text-white transition hover:bg-[#0F2747]"
      >
        Browse FAQs
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

