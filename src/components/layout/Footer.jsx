import {
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import appStoreLogo from "../../assets/logo_app/app_store.png";
import facebookLogo from "../../assets/logo_app/facebook.png";
import googlePlayLogo from "../../assets/logo_app/google-play-logo-png_seeklogo-318439.png";
import instagramLogo from "../../assets/logo_app/ig.png";
import telegramLogo from "../../assets/logo_app/telegram.png";
import tiktokLogo from "../../assets/logo_app/tiktok.png";
import abaLogo from "../../assets/payment/aba.jpeg";
import visaLogo from "../../assets/payment/Visa_Inc.-Logo.wine.png";

const shopLinks = ["All Products", "New Arrivals", "Best Sellers", "Sale", "Collections"];
const helpLinks = ["Contact Us", "Shipping Information", "Returns & Exchanges", "Size Guide", "FAQs"];
const aboutLinks = ["Our Story", "Sustainability", "Careers", "Blog", "Privacy Policy", "Terms & Conditions"];
const payments = [
  { name: "Visa", image: visaLogo },
  { name: "ABA", image: abaLogo },
];
const socialLinks = [
  { name: "Facebook", image: facebookLogo, url: "https://www.facebook.com/share/1AmqPeoqk3/?mibextid=wwXIfr" },
  { name: "Instagram", image: instagramLogo, url: "https://www.tiktok.com/@phearumsingle4?_r=1&_t=ZS-99hSfUlkI35" },
  { name: "TikTok", image: tiktokLogo, url: "https://www.tiktok.com/@phearumsingle4?_r=1&_t=ZS-99hSfUlkI35" },
  { name: "Telegram", image: telegramLogo, url: "https://t.me/eav_phearom" },
];


export default function Footer() {
  return (
    <footer className="bg-[#0D141E] text-white">
      <div className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr_1.15fr]">
          <div>
            <Link to="/" className="inline-flex items-end gap-1">
              <span className="text-2xl font-extrabold leading-none text-[#F97316]">
                Go
              </span>
              <ShoppingBag size={26} className="-mb-1 text-[#F97316]" />
              <span className="text-2xl font-extrabold leading-none">shoes</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#9AA6B5]">
              Everyday sneakers, training shoes, and street-ready styles
              selected for comfort, durability, and clean design.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#ffffff] p-2 transition duration-300 hover:-translate-y-0.5  hover:shadow-[0_12px_24px_rgba(249,115,22,0.24)]"
                  aria-label={social.name}
                >      
                  <img
                    src={social.image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-extrabold text-white">Shop</h3>
              <div className="mt-4 grid gap-2.5">
                {shopLinks.map((item) => (
                  <Link
                    key={item}
                    to="/shop"
                    className="text-sm text-[#9AA6B5] transition hover:text-[#F97316]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">Help</h3>
              <div className="mt-4 grid gap-2.5">
                {helpLinks.map((item) => (
                  <Link
                    key={item}
                    to="/contact"
                    className="text-sm text-[#9AA6B5] transition hover:text-[#F97316]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">About</h3>
              <div className="mt-4 grid gap-2.5">
                {aboutLinks.map((item) => (
                  <Link
                    key={item}
                    to={item === "Blog" ? "/blog" : "/about"}
                    className="text-sm text-[#9AA6B5] transition hover:text-[#F97316]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">
              Download Our App
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#9AA6B5]">
              Shop anytime, anywhere. Exclusive mobile deals included.
            </p>

            <div className="mt-5 grid max-w-[180px] gap-3">
              <Link
                to="/"
                className="flex h-11 items-center gap-3 rounded-lg border border-white/15  px-3 text-white transition hover:border-[#F97316]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-1">
                  <img
                    src={appStoreLogo}
                    alt="App Store"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span>
                  <span className="block text-[9px] uppercase leading-none text-white/70">
                    Download on the
                  </span>
                  <span className="text-sm font-extrabold leading-tight">
                    App Store
                  </span>
                </span>
              </Link>

              <Link
                to="/"
                className="flex h-11 items-center gap-3 rounded-lg border border-white/15  px-3 text-white transition hover:border-[#F97316]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-1">
                  <img
                    src={googlePlayLogo}
                    alt="Google Play"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span>
                  <span className="block text-[9px] uppercase leading-none text-white/70">
                    Get it on
                  </span>
                  <span className="text-sm font-extrabold leading-tight">
                    Google Play
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#7D8998]">
            © 2026 GoShoes. All rights reserved.
          </p>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="flex items-center gap-2">
              {payments.map((payment) => (
                <img
                  key={payment.name}
                  src={payment.image}
                  alt={`${payment.name} payment`}
                  className="h-7 w-auto rounded bg-white px-2 py-1 object-contain"
                />
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </footer>
  );
}
