export function FormField({
  label,
  required = false,
  as = "input",
  className = "",
  children,
  id,
  ...props
}) {
  const Control = as;

  const controlClass =
    as === "textarea"
      ? "mt-2 w-full resize-none rounded-xl border border-[#E5EAF0] bg-[#FAFBFC] px-4 py-3 text-sm leading-6 text-[#07182E] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#E96400] focus:bg-white focus:ring-4 focus:ring-[#E96400]/10"
      : "mt-2 h-11 w-full rounded-xl border border-[#E5EAF0] bg-[#FAFBFC] px-4 text-sm text-[#07182E] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#E96400] focus:bg-white focus:ring-4 focus:ring-[#E96400]/10";

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-bold text-[#07182E]">
        {label}
        {required && <span className="ml-1 text-[#E96400]">*</span>}
      </label>

      <Control id={id} className={controlClass} {...props}>
        {children}
      </Control>
    </div>
  );
}

