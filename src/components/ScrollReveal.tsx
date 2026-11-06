import { useEffect } from 'react';

const SELECTOR = 'main section h2, main section h3, main section p, main section li, main section article, main section form, main section .tilt-card, main section [role="tablist"], main section [role="tabpanel"], main section dl, footer > *';

/** Adds scroll-triggered reveal animation to section content after hydration; replays when scrolled back into view. */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.closest('.reveal, #top, .split-word, .sr'),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.classList.add('sr-in');
          else if (e.boundingClientRect.top > 0) el.classList.remove('sr-in');
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    nodes.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty('--sr-delay', `${Math.min(siblings.indexOf(el), 6) * 70}ms`);
      el.classList.add('sr');
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((el) => el.classList.remove('sr', 'sr-in'));
    };
  }, []);
  return null;
}
