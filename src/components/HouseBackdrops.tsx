import { useEffect } from 'react';
import stark from '@/assets/house-stark.jpg.asset.json';
import lannister from '@/assets/house-lannister.jpg.asset.json';
import baratheon from '@/assets/house-baratheon.jpg.asset.json';
import greyjoy from '@/assets/house-greyjoy.jpg.asset.json';
import targaryen from '@/assets/house-targaryen.jpg.asset.json';
import banners from '@/assets/house-banners.jpg.asset.json';

const houses: Array<[string, string, string]> = [
  ['about', 'stark', stark.url],
  ['experience', 'lannister', lannister.url],
  ['projects', 'baratheon', baratheon.url],
  ['skills', 'greyjoy', greyjoy.url],
  ['education', 'targaryen', targaryen.url],
  ['contact', 'banners', banners.url],
];

/** Applies a house backdrop + palette to each section and zooms it with scroll progress (reverses on scroll up). */
export function HouseBackdrops() {
  useEffect(() => {
    const nodes = houses
      .map(([id, house, url]) => {
        const el = document.getElementById(id);
        if (!el) return null;
        el.dataset.house = house;
        el.style.setProperty('--house-bg', `url("${url}")`);
        return el;
      })
      .filter(Boolean) as HTMLElement[];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of nodes) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.setProperty('--house-zoom', reduce ? '1.05' : (1.02 + p * 0.22).toFixed(4));
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
