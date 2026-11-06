import { useEffect } from 'react';

const SELECTOR = 'main section h1, main section h2, main section h3, main section p, main section li, main section article, main section form, main section .tilt-card, main section [role="tablist"], main section [role="tabpanel"], main section dl, main section .hero-copy > *, main section .hero-motto, main section .hero-sigil, footer > *';

/** Adds scroll-triggered reveal animation to section content after hydration; replays when scrolled back into view. */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.closest('#top, .reveal, .split-word, .sr'),
    );
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((el) => el.classList.add('sr', 'sr-in'));
      return () => nodes.forEach((el) => el.classList.remove('sr', 'sr-in'));
    }

    const visibility = new WeakMap<HTMLElement, boolean>();
    const pending = new Set<HTMLElement>();
    let frame = 0;
    let revealFrame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          visibility.set(el, e.isIntersecting);
          if (e.isIntersecting) {
            pending.add(el);
          } else {
            pending.delete(el);
            el.classList.remove('sr-in');
          }
        }
        if (pending.size > 0 && !frame && !revealFrame) {
          frame = requestAnimationFrame(() => {
            frame = 0;
            revealFrame = requestAnimationFrame(() => {
              revealFrame = 0;
              for (const el of pending) {
                if (visibility.get(el)) el.classList.add('sr-in');
              }
              pending.clear();
            });
          });
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px 80px 0px' },
    );
    nodes.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty('--sr-delay', `${Math.min(siblings.indexOf(el), 6) * 70}ms`);
      el.classList.add('sr');
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (revealFrame) cancelAnimationFrame(revealFrame);
      nodes.forEach((el) => el.classList.remove('sr', 'sr-in'));
    };
  }, []);
  return null;
}
