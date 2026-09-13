import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/shop/Shop";
import About from "../pages/about/About";
import Blog from "../pages/blog/Blog";
import Contact from "../pages/contact/Contact";
import Wishlist from "../pages/wishlist/Wishlist";
import ProductDetail from "../pages/product/ProductDetail";

export default function AppRoutes() {
  return (
    <Routes>
      
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
