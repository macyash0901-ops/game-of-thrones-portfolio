import { useEffect } from "react";
const stark = "/assets/bgstark.jpeg";
const lannister = "/assets/bglannister.jpg";
const baratheon = "/assets/bgbaratheon.jpeg";
const greyjoy = "/assets/greyjoy-banner.png";
const targaryen = "/assets/gotbg1.jpg";
const banners = "/assets/house-banners.png";

const houses: Array<[string, string, string]> = [
  ["about", "lannister", lannister],
  ["experience", "baratheon", baratheon],
  ["work", "greyjoy", greyjoy],
  ["skills", "stark", stark],
  ["education", "targaryen", targaryen],
  ["contact", "banners", banners],
];

/** Applies a house backdrop + palette and updates scroll zoom only for nearby sections. */
export function HouseBackdrops() {
  useEffect(() => {
    const nodes = houses
      .map(([id, house, url]) => {
        const el = document.getElementById(id);
        if (!el) return null;
        el.dataset["house"] = house;
        el.style.setProperty("--house-bg", `url("${url}")`);
        return el;
      })
      .filter(Boolean) as HTMLElement[];
    const hero = document.getElementById("top");
    const heroImage = hero?.querySelector<HTMLElement>(".hero-photo");
    const lowMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)",
    ).matches;
    if (lowMotion) {
      heroImage?.style.setProperty("--hero-scroll-zoom", "1.05");
      nodes.forEach((el) => el.style.setProperty("--house-zoom", "1.05"));
      return;
    }

    const targets = [...(hero ? [hero] : []), ...nodes];
    const visible = new Set<HTMLElement>();
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const measurements = [...visible].map((el) => ({ el, rect: el.getBoundingClientRect() }));
      for (const { el, rect } of measurements) {
        if (el === hero && heroImage) {
          const progress = Math.min(1, Math.max(0, (vh - rect.bottom) / (vh * 0.75)));
          heroImage.style.setProperty("--hero-scroll-zoom", (1 + progress * 0.3).toFixed(4));
        } else {
          const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
          el.style.setProperty("--house-zoom", (1.05 + progress * 0.35).toFixed(4));
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const el = entry.target as HTMLElement;
                if (entry.isIntersecting) visible.add(el);
                else visible.delete(el);
              }
              onScroll();
            },
            { rootMargin: "100% 0px" },
          );

    if (observer) targets.forEach((el) => observer.observe(el));
    else targets.forEach((el) => visible.add(el));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
