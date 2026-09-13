import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import heroShoe from "../../assets/auth-shoe.png";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1fr_1fr]">
      <aside className="hidden items-center justify-center bg-[#F8FAFC] p-10 lg:flex">
        <div className="max-w-lg">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            SoleStore
          </Link>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-[#111827]">
            Welcome back to your shoe shelf.
          </h1>
          <p className="mt-4 leading-7 text-[#4B5563]">
            Sign in to keep track of favorite styles and a smoother checkout.
          </p>
          <img src={heroShoe} alt="Shoe" className="mt-10 w-full object-contain" />
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-6 py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-block text-sm font-bold text-[#2563EB]">
            Back to store
          </Link>
          <h2 className="font-heading text-3xl font-bold text-[#111827]">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Use your email and password to continue.
          </p>

          <div className="mt-7 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-[#111827]">
              Email
              <span className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />
                <input
                  type="email"
                  className="h-11 w-full rounded-lg border border-[#D1D5DB] pl-10 pr-3 text-sm outline-none focus:border-[#2563EB]"
                  placeholder="you@example.com"
                />
              </span>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[#111827]">
              Password
              <span className="relative">
                <LockKeyhole
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="h-11 w-full rounded-lg border border-[#D1D5DB] pl-10 pr-10 text-sm outline-none focus:border-[#2563EB]"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>

            <Button
              type="submit"
              loading={loading}
              className="h-11 w-full bg-[#111827] hover:bg-[#1F2937]"
            >
              Sign in
            </Button>
          </div>

          <p className="mt-7 text-center text-sm text-[#6B7280]">
            New here?{" "}
            <Link to="/register" className="font-bold text-[#2563EB]">
              Create an account
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
