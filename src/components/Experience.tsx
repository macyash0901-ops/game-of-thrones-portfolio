import { Calendar, MapPin } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { experience } from '@/data/portfolio';

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading chapter="Chapter II" title="Every stronghold is built by many hands" />

        <ol className="relative border-l border-line pl-8 md:pl-12">
          {experience.map((entry, index) => (
            <li key={entry.company} className="relative pb-16 last:pb-0">
              <Reveal delay={index * 150}>
                <span className="absolute -left-[37px] top-2 flex h-4 w-4 items-center justify-center md:-left-[53px]" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-accent timeline-glow" />
                </span>

                <div className="rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur transition-colors duration-500 hover:border-accent/60 md:p-10">
                  <h3 className="font-display text-2xl font-semibold text-ink">{entry.role}</h3>
                  <p className="mt-2 font-display text-sm uppercase tracking-[0.18em] text-crimson dark:text-steel-300">{entry.company}</p>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-muted">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={16} className="text-accent" />
                      {entry.period}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      {entry.location}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-lg leading-relaxed text-muted">
                        <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {entry.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-line px-3 py-1 text-sm text-ink/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
