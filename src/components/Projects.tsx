import { Reveal } from '@/components/Reveal';
import { Embers } from '@/components/Embers';
import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { projects } from '@/data/portfolio';

export function Projects() {
  return (
    <section id="work" className="relative px-6 py-32">
      <Embers />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          chapter="Chapter III"
          title="The work speaks for the builder"
          description="A record of the realms, tools, and systems brought from first spark to working kingdom."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.title} delay={(index % 3) * 120}>
                <TiltCard maxTilt={6} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/80 p-7 backdrop-blur transition-colors duration-500 hover:border-accent/70">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                        <Icon size={22} strokeWidth={1.6} />
                      </span>
                      <span className="font-display text-xs tracking-[0.2em] text-muted">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <p className="mt-6 font-display text-xs uppercase tracking-[0.2em] text-accent">{project.category}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">{project.title}</h3>
                    <p className="mt-3 flex-1 text-lg leading-relaxed text-muted">{project.description}</p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li key={tech} className="rounded-full bg-bg/70 px-3 py-1 text-sm text-ink/80 ring-1 ring-line">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
