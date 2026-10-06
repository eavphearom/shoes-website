import { Link } from "react-router-dom";
import { CheckCircle2, Clock3, PackageCheck, ShoppingBag } from "lucide-react";
import AccountStatCard from "./components/AccountStatCard";
import RecentOrders from "./components/RecentOrders";

const recentOrders = [
  { code: "#GS-1024", date: "Sep 14, 2026", total: "$190.00", status: "Processing" },
  { code: "#GS-1023", date: "Sep 09, 2026", total: "$86.00", status: "Shipped" },
  { code: "#GS-1019", date: "Aug 28, 2026", total: "$120.00", status: "Delivered" },
  { code: "#GS-1016", date: "Aug 18, 2026", total: "$54.00", status: "Pending" },
];

const profileInfo = [
  { label: "Full Name", value: "Bunheng" },
  { label: "Email Address", value: "bunheng@example.com" },
  { label: "Phone Number", value: "096 5231 272" },
  { label: "Member Since", value: "January 2026" },
];

export default function AccountOverview() {
  return (
    <div className="grid gap-5">
      <header className="rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E96400]">Account Overview</p>
        <h1 className="mt-3 font-michroma text-2xl font-semibold text-[#07182E] sm:text-3xl">My Account</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
          Welcome back, Bunheng. Manage your profile and follow your latest Go Shoes orders in one clean place.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AccountStatCard icon={ShoppingBag} value="12" label="Total Orders" />
        <AccountStatCard icon={Clock3} value="3" label="In Progress" tone="blue" />
        <AccountStatCard icon={CheckCircle2} value="9" label="Completed" tone="green" />
      </div>

      <section className="rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#E96400]">
              <PackageCheck size={19} />
            </div>
            <h2 className="mt-3 text-lg font-semibold text-[#07182E]">Profile Information</h2>
            <p className="mt-1 text-sm font-medium text-[#64748B]">Your main account details.</p>
          </div>
          <Link
            to="/account/profile"
            className="inline-flex h-10 w-fit items-center justify-center rounded-xl bg-[#E96400] px-4 text-sm font-semibold text-white transition hover:bg-[#C95500]"
          >
            Edit Profile
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {profileInfo.map((item) => (
            <div key={item.label} className="rounded-xl bg-[#F8FAFC] p-4">
              <p className="text-xs font-semibold uppercase text-[#94A3B8]">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-[#07182E]">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <RecentOrders orders={recentOrders} />
    </div>
  );
}
