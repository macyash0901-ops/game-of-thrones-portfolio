import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { education } from '@/data/portfolio';

export function Education() {
  const Icon = education.icon;

  return (
    <section id="education" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading chapter="Chapter V" title="No throne stands without foundations" />

        <Reveal>
          <TiltCard maxTilt={5} className="rounded-3xl border border-line bg-surface/80 p-8 backdrop-blur md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-accent/50 bg-accent/10 text-accent">
                <Icon size={36} strokeWidth={1.4} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">{education.degree}</h3>
                <p className="mt-2 text-lg text-crimson dark:text-steel-300">{education.school}</p>
                <div className="mt-4 flex flex-wrap gap-6 text-base text-muted">
                  <span>{education.period}</span>
                  <span className="font-display text-accent">{education.score}</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
