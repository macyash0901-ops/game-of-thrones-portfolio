import { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { experience } from '@/data/portfolio';

export function Experience() {
  const [active, setActive] = useState(0);
  const entry = experience[active] ?? experience[0]!;

  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading chapter="Chapter II" title="Every stronghold is built by many hands" />

        <Reveal>
          <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
            <div role="tablist" aria-label="Experience" className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
              {experience.map((item, index) => (
                <button
                  key={item.company}
                  role="tab"
                  type="button"
                  aria-selected={index === active}
                  onClick={() => setActive(index)}
                  className={`shrink-0 rounded-lg border px-5 py-4 text-left transition-colors duration-300 ${index === active ? 'border-accent bg-accent/15' : 'border-line bg-surface/60 hover:border-accent/60'}`}
                >
                  <span className="block font-display text-sm uppercase tracking-[0.14em] text-ink">{item.company}</span>
                  <span className="mt-1 block text-sm text-muted">{item.period}</span>
                </button>
              ))}
            </div>

            <div key={entry.company} role="tabpanel" className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-line bg-surface/70 p-6 backdrop-blur duration-500 md:p-8">
              <h3 className="font-display text-2xl font-semibold text-ink">{entry.role}</h3>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base text-muted">
                <span className="font-display text-sm uppercase tracking-[0.18em] text-crimson">{entry.company}</span>
                <span className="inline-flex items-center gap-2"><Calendar size={16} className="text-accent" />{entry.period}</span>
                <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-accent" />{entry.location}</span>
              </div>

              <ul className="mt-6 grid gap-x-8 gap-y-3 lg:grid-cols-2">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-base leading-relaxed text-muted">
                    <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {entry.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-line px-3 py-1 text-sm text-ink/80">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
