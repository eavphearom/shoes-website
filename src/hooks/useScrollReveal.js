import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mark existing nodes with data-scroll-reveal="up|left|right|image".
// data-scroll-group reveals its children by row without adding layout wrappers.
export default function useScrollReveal() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const completed = new WeakSet();
    const media = gsap.matchMedia();
    media.add({ reduced: "(prefers-reduced-motion: reduce)", mobile: "(max-width: 767px)",
      desktop: "(min-width: 768px)" }, ({ conditions }) => {
      if (conditions.reduced) return;
      const registered = new WeakSet();
      const records = new Set();
      let frame = 0;
      let active = true;

      const animate = (elements, preset = "up") => {
        const targets = elements.filter((element) => {
          if (registered.has(element) || completed.has(element) || !element.getClientRects().length) return false;
          if (element.getBoundingClientRect().bottom < 0) { completed.add(element); return false; }
          return true;
        });
        if (!targets.length) return;
        targets.forEach((element) => registered.add(element));
        const distance = conditions.mobile ? 18 : 36;
        const from = { opacity: 0, y: distance };
        if (preset === "fade") from.y = 0;
        if (preset === "left" || preset === "right") {
          from.x = conditions.mobile ? 0 : (preset === "left" ? -32 : 32);
          from.y = conditions.mobile ? 18 : 0;
        }
        if (preset === "image") { from.scale = 0.96; from.y = 0; }
        let tween;
        const context = gsap.context(() => {
          tween = gsap.fromTo(targets, from, {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: conditions.mobile ? 0.55 : 0.7,
            ease: "power3.out", stagger: { each: 0.075, amount: Math.min((targets.length - 1) * 0.075, 0.3) },
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: targets[0], start: "top 85%", once: true,
              toggleActions: "play none none none" },
            onComplete: () => targets.forEach((element) => completed.add(element)),
          });
        }, root);
        records.add({ targets, context, tween });
      };

      const scan = () => {
        // Revert removed cohorts immediately: filters must not leave old triggers behind.
        for (const record of records) {
          if (record.targets.some((element) => !root.contains(element))) {
            record.context.revert();
            record.targets.forEach((element) => registered.delete(element));
            records.delete(record);
          }
        }
        root.querySelectorAll("[data-scroll-reveal]").forEach((element) => {
          animate([element], element.dataset.scrollReveal);
        });
        root.querySelectorAll("[data-scroll-group]").forEach((group) => {
          // One trigger per visual row, so lower cards do not reveal before scrolling to them.
          const rows = new Map();
          [...group.children].forEach((element) => {
            if (registered.has(element) || completed.has(element) || !element.getClientRects().length) return;
            const top = Math.round(element.getBoundingClientRect().top / 4) * 4;
            if (!rows.has(top)) rows.set(top, []);
            rows.get(top).push(element);
          });
          rows.forEach((elements) => animate(elements, group.dataset.scrollGroup || "up"));
        });
      };
      const schedule = () => {
        if (!active || frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          scan();
          ScrollTrigger.refresh();
        });
      };
      const focus = (event) => {
        for (const record of records) {
          if (record.targets.some((element) => element.contains(event.target))) record.tween.progress(1);
        }
      };
      scan();
      const observer = new MutationObserver(schedule);
      observer.observe(root, { childList: true, subtree: true });
      const resize = new ResizeObserver(schedule);
      resize.observe(root);
      root.addEventListener("load", schedule, true);
      root.addEventListener("focusin", focus);
      document.fonts?.ready.then(schedule);
      schedule();
      return () => {
        active = false;
        cancelAnimationFrame(frame);
        observer.disconnect();
        resize.disconnect();
        root.removeEventListener("load", schedule, true);
        root.removeEventListener("focusin", focus);
        records.forEach(({ context }) => context.revert());
        records.clear();
      };
    });
    return () => media.revert();
  }, []);

  return rootRef;
}
