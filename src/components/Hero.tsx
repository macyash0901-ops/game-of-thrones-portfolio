import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CountUp } from '@/components/CountUp';
import { Embers } from '@/components/Embers';
import { Hero3D } from '@/components/Hero3D';
import { SplitText } from '@/components/SplitText';
import { ValyrianText } from '@/components/ValyrianText';
import { heroStats, profile } from '@/data/portfolio';


const HERO_IMAGE = '/assets/gotbg2.jpg';

export function Hero() {


  return (
    <section id="top" className="portfolio-hero relative flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="hero-photo-frame absolute inset-0">
          <img src={HERO_IMAGE} alt="A golden-eyed dragon above a fiery battlefield" fetchPriority="high" className="hero-photo h-full w-full object-cover" />
        </div>
        <div className="hero-image-vignette absolute inset-0" />
        <div className="hero-image-bottom absolute inset-x-0 bottom-0 h-2/3" />
      </div>

      <Embers />

      <div className="hero-layout relative z-10 mx-auto grid w-full max-w-6xl items-center px-6">
        <div className="hero-motto col-span-full flex justify-center">
          <ValyrianText text="VALAR MORGHULIS" />
        </div>
        <div className="hero-copy">
          <p className="mb-6 flex items-center gap-4 font-display text-xs uppercase tracking-[0.35em] text-accent">
            <span className="hairline h-px w-12" />
            {profile.title}
          </p>

          <h1 className="hero-title font-display font-bold text-ink">
            <span className="gold-gradient-text block"><SplitText text={profile.name} charStep={45} /></span>
          </h1>

          <p className="mt-6 font-display text-lg uppercase tracking-[0.2em] text-crimson dark:text-steel-300 sm:text-xl">{profile.tagline}</p>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">{profile.heroIntro}</p>
          <p className="mt-5 max-w-xl border-l-2 border-accent/70 pl-4 font-display text-lg italic text-ink/80">“The realm remembers those who build what others only imagine.”</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a data-sfx="sword" href="#work" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm uppercase tracking-[0.15em] text-bg hero-cta-shadow transition-transform duration-300 hover:-translate-y-0.5">
              View the work <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a data-sfx="sword" href="#contact" className="group inline-flex items-center gap-2 rounded-full border border-accent/60 px-7 py-3.5 font-display text-sm uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:border-accent hover:bg-accent/10">
              Raise a banner <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <dl className="hero-stats grid grid-cols-3 gap-4 border-t border-line">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl font-semibold text-accent"><CountUp value={stat.value} suffix={stat.suffix} /></dd>
                <p className="mt-2 text-base text-muted">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-sigil"><Hero3D /></div>
      </div>

      <a data-sfx="click" href="#about" aria-label="Scroll to about" className="hero-scroll absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-accent">
        <span className="flex h-12 w-7 justify-center rounded-full border border-accent/60 pt-2"><span className="animate-scroll-cue h-2 w-1 rounded-full bg-accent" /></span>
      </a>
    </section>
  );
}
