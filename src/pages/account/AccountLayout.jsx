import { Outlet } from "react-router-dom";
import AccountSidebar from "./components/AccountSidebar";

export default function AccountLayout() {
  return (
    <div className="bg-[#F7FAFC]">
      <section className="mx-auto grid min-h-[calc(100vh-220px)] max-w-[1280px] gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 lg:py-10">
        <AccountSidebar />
        <main className="min-w-0">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
