import { MapPin, Navigation } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

export function LocationSection() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-3xl border border-[#E6EAF0] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <SectionLabel>Visit Us</SectionLabel>
          <h2 className="mt-3 font-michroma text-2xl font-extrabold text-[#07182E] sm:text-3xl">
            Our Store Location
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
            Stop by our store to try your favorite pairs, compare fits, and get
            friendly help from our footwear team.
          </p>
          <div className="mt-7 rounded-2xl bg-[#FAFBFC] p-5">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#E96400]">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-extrabold text-[#07182E]">Go Shoes Store</p>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  214 Market Street, New York, NY 10012
                </p>
              </div>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=11.5565585,104.8874745"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-[#E96400] px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#C95500]"
          >
            Get Directions
            <Navigation size={17} />
          </a>
        </div>
        <div className="min-h-[330px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d961.9636669349647!2d104.88608216949396!3d11.556752200000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2skh!4v1789365367402!5m2!1sen!2skh"
            title="Go Shoes Store Location"
            className="h-full min-h-[330px] w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </section>
  );
}


