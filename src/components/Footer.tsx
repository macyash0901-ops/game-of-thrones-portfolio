import { ArrowUp, Crown, Linkedin } from 'lucide-react';
import { profile } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <Crown size={18} className="text-accent" />
          <p className="text-base text-muted">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-5">
          <a data-sfx="click" href={profile.linkedinHref} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-accent" aria-label="LinkedIn profile">
            <Linkedin size={18} />
          </a>
          <a data-sfx="click" href="#top" className="group flex items-center gap-2 font-display text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-accent">
            Back to top <ArrowUp size={15} className="transition-transform group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
