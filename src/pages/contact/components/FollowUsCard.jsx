import storeImage from "../../../assets/banner/banner1.png";
import facebookIcon from "../../../assets/logo_app/facebook.png";
import instagramIcon from "../../../assets/logo_app/ig.png";
import telegramIcon from "../../../assets/logo_app/telegram.png";
import tiktokIcon from "../../../assets/logo_app/tiktok.png";
import { SectionLabel } from "./SectionLabel";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", icon: facebookIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: instagramIcon,
  },
  { label: "TikTok", href: "https://www.tiktok.com", icon: tiktokIcon },
  { label: "Telegram", href: "https://telegram.org", icon: telegramIcon },
];

export function FollowUsCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E6EAF0] bg-white">
      <div className="p-5 sm:p-6">
        <SectionLabel>Social</SectionLabel>
        <h2 className="mt-3 font-michroma text-xl text-[#07182E]">Follow Us</h2>
        <p className="mt-2 text-sm leading-6 text-[#64748B]">
          Follow new drops, styling ideas, and exclusive seasonal offers.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6EAF0] bg-white transition hover:-translate-y-0.5 hover:border-[#F8C9A5] hover:bg-[#FFF3E8]"
            >
              <img src={social.icon} alt="" className="h-5 w-5 object-contain" />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-5 mb-5 overflow-hidden rounded-xl sm:mx-6 sm:mb-6">
        <img
          src={storeImage}
          alt="Lifestyle shoes"
          className="h-28 w-full object-cover sm:h-32"
        />
      </div>
    </div>
  );
}

