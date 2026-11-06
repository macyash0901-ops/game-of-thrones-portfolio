import { ArrowDown, ArrowUpRight, Crown } from 'lucide-react';
import { CountUp } from '@/components/CountUp';
import { Embers } from '@/components/Embers';
import { Hero3D } from '@/components/Hero3D';
import { SplitText } from '@/components/SplitText';
import { heroStats, profile } from '@/data/portfolio';
import { useParallax } from '@/hooks/useParallax';

import castleAsset from '@/assets/portfolio-castle.asset.json';
const HERO_IMAGE = castleAsset.url;

export function Hero() {
  const photoRef = useParallax<HTMLDivElement>(0.18);
  const glowRef = useParallax<HTMLDivElement>(0.4);
  const sigilRef = useParallax<HTMLDivElement>(-0.25);
  const contentRef = useParallax<HTMLDivElement>(-0.08);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0 -z-0">
        <div ref={photoRef} className="absolute inset-x-0 -top-24 -bottom-24">
          <img src={HERO_IMAGE} alt="Misty castle in the mountains" className="hero-photo h-full w-full object-cover" />
        </div>
        <div className="hero-image-vignette absolute inset-0" />
        <div className="hero-image-bottom absolute inset-x-0 bottom-0 h-2/3" />
      </div>

      <div ref={glowRef} className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="animate-glow-pulse absolute -right-16 bottom-0 h-[24rem] w-[24rem] rounded-full bg-crimson/25 blur-3xl [animation-delay:2s]" />
      </div>

      <div ref={sigilRef} className="pointer-events-none absolute right-[-8%] top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="animate-spin-slow text-accent/15">
          <Crown size={560} strokeWidth={0.6} />
        </div>
      </div>

      <Embers />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_.95fr]">
        <div ref={contentRef}>
          <p className="mb-6 flex items-center gap-4 font-display text-xs uppercase tracking-[0.35em] text-accent">
            <span className="hairline h-px w-12" />
            {profile.title}
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            <span className="gold-gradient-text block"><SplitText text={profile.name} charStep={45} /></span>
          </h1>

          <p className="mt-6 font-display text-lg uppercase tracking-[0.2em] text-crimson dark:text-steel-300 sm:text-xl">{profile.tagline}</p>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">{profile.heroIntro}</p>
          <p className="mt-5 max-w-xl border-l-2 border-accent/70 pl-4 font-display text-lg italic text-ink/80">“The realm remembers those who build what others only imagine.”</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a data-sfx="sword" href="#work" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm uppercase tracking-[0.15em] text-bg shadow-[0_0_30px_-8px_rgb(var(--accent))] transition-transform duration-300 hover:-translate-y-0.5">
              View the work <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a data-sfx="sword" href="#contact" className="group inline-flex items-center gap-2 rounded-full border border-accent/60 px-7 py-3.5 font-display text-sm uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:border-accent hover:bg-accent/10">
              Raise a banner <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <dl className="mt-16 grid max-w-3xl grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl font-semibold text-accent"><CountUp value={stat.value} suffix={stat.suffix} /></dd>
                <p className="mt-2 text-base text-muted">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
        <div className="block lg:block"><Hero3D /></div>
      </div>

      <a data-sfx="click" href="#about" aria-label="Scroll to about" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-accent">
        <span className="flex h-12 w-7 justify-center rounded-full border border-accent/60 pt-2"><span className="animate-scroll-cue h-2 w-1 rounded-full bg-accent" /></span>
      </a>
    </section>
  );
}
