import { useEffect, useState } from 'react';
import { Crown, Menu, X } from 'lucide-react';
import { SoundToggle } from '@/components/SoundToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { navLinks, profile } from '@/data/portfolio';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open ? 'border-b border-line bg-bg/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.name} home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 text-accent transition-transform duration-500 group-hover:rotate-[20deg]">
            <Crown size={18} strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg font-semibold tracking-[0.18em] text-ink">YD</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a data-sfx="click" href={link.href} className="nav-link font-display text-[13px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SoundToggle />
          <ThemeToggle />
          <button
            data-sfx="click"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-accent md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-line bg-bg/95 backdrop-blur-md transition-[max-height] duration-500 md:hidden',
          open ? 'max-h-96 border-b' : 'max-h-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                data-sfx="click"
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 font-display text-sm uppercase tracking-[0.2em] text-ink hover:bg-surface"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
