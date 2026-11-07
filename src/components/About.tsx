import { Reveal } from '@/components/Reveal';
import { Embers } from '@/components/Embers';
import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { highlights, profile } from '@/data/portfolio';
import { useParallax } from '@/hooks/useParallax';

export function About() {
  const backdropRef = useParallax<HTMLDivElement>(0.12);

  return (
    <section id="about" className="relative overflow-hidden px-6 py-32">
      <Embers />
      <div ref={backdropRef} aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading chapter="Chapter I" title="A sharp mind builds a stronger realm" />

        <Reveal>
          <p className="mx-auto mb-20 max-w-3xl text-center text-xl leading-relaxed text-muted">{profile.summary}</p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 120}>
                <TiltCard className="h-full rounded-2xl border border-line bg-surface/80 p-8 backdrop-blur transition-colors duration-500 hover:border-accent/70">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">{item.description}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
