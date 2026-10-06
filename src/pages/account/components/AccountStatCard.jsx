export default function AccountStatCard({ icon: Icon, label, value, tone = "orange" }) {
  const tones = {
    orange: "bg-[#FFF3E8] text-[#E96400]",
    blue: "bg-[#EFF6FF] text-[#2563EB]",
    green: "bg-[#ECFDF3] text-[#12A467]",
  };

  return (
    <article className="rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-[#07182E]">{value}</p>
          <p className="mt-1 text-sm font-medium text-[#64748B]">{label}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon size={20} />
        </span>
      </div>
    </article>
  );
}
