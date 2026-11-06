import { useEffect } from 'react';
import stark from '@/assets/bgstark.jpeg';
import lannister from '@/assets/bglannister.jpg';
import baratheon from '@/assets/bgbaratheon.jpeg';
import greyjoy from '@/assets/Antique Gold Kraken Heraldic Banner.png';
import targaryen from '@/assets/gotbg1.jpg';
import banners from '@/assets/Storm-Battered Heraldry Above the Ruins.png';

const houses: Array<[string, string, string]> = [
  ['about', 'lannister', lannister],
  ['experience', 'baratheon', baratheon],
  ['work', 'greyjoy', greyjoy],
  ['skills', 'stark', stark],
  ['education', 'targaryen', targaryen],
  ['contact', 'banners', banners],
];

/** Applies a house backdrop + palette to each section and zooms it with scroll progress (reverses on scroll up). */
export function HouseBackdrops() {
  useEffect(() => {
    const nodes = houses
      .map(([id, house, url]) => {
        const el = document.getElementById(id);
        if (!el) return null;
        el.dataset['house'] = house;
        el.style.setProperty('--house-bg', `url("${url}")`);
        return el;
      })
      .filter(Boolean) as HTMLElement[];
    const hero = document.getElementById('top');
    const heroImage = hero?.querySelector<HTMLElement>('.hero-photo');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      if (hero && heroImage) {
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh - rect.bottom) / (vh * 0.75)));
        heroImage.style.setProperty('--hero-scroll-zoom', reduce ? '1.05' : (1 + progress * 0.3).toFixed(4));
      }
      for (const el of nodes) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.setProperty('--house-zoom', reduce ? '1.05' : (1.05 + p * 0.35).toFixed(4));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
