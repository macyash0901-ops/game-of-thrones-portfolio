import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from 'react';
import { Crown, Menu, X } from 'lucide-react';
import { SoundToggle } from '@/components/SoundToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { navLinks, profile } from '@/data/portfolio';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className="fixed inset-x-3 top-4 z-50 mx-auto max-w-6xl rounded-[36px] border border-line bg-surface/90 backdrop-blur-xl transition-colors duration-500 sm:inset-x-6"
    >
      <nav aria-label="Main navigation" className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.name} home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 text-accent transition-transform duration-500 group-hover:rotate-[20deg]">
            <Crown size={18} strokeWidth={1.75} />
          </span>
          <span className="hidden font-display text-base font-semibold text-ink xl:block">Yash Drall</span>
          <span className="font-display text-lg font-semibold text-ink xl:hidden">YD</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a data-sfx="click" href={link.href} className="nav-link font-display text-[13px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <ThemeToggle />
          <Button asChild variant="imported" size="imported" className="hidden h-10 rounded-full bg-accent px-5 font-display text-xs text-bg transition-colors hover:bg-accent/90 sm:inline-flex">
            <a href="#contact" data-sfx="click">Let’s connect</a>
          </Button>
          <Button variant="imported" size="imported"
            ref={menuRef}
            data-sfx="click"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-accent lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          'overflow-hidden rounded-b-[36px] border-line transition-[max-height] duration-500 lg:hidden',
          open ? 'max-h-96 border-t' : 'max-h-0',
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
