import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <Navbar />
      <main className="pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
