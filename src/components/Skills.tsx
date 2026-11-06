import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { skillGroups } from '@/data/portfolio';

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          chapter="Chapter IV"
          title="The armory"
          description="Every craft has its weapon: frontend, mobile, backend, cloud, and AI, sharpened to ship complete products."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 90}>
              <div className="h-full rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur transition-colors duration-500 hover:border-accent/60">
                <h3 className="font-display text-sm uppercase tracking-[0.18em] text-accent">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-bg/60 px-2.5 py-1 text-base text-ink/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
