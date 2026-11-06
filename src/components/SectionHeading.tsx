import { SplitText } from '@/components/SplitText';
import { Reveal } from '@/components/Reveal';

interface SectionHeadingProps {
  chapter: string;
  title: string;
  description?: string;
}

export function SectionHeading({ chapter, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <Reveal>
        <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">{chapter}</p>
        <div className="hairline mx-auto mt-4 h-px w-24" />
      </Reveal>
      <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl"><SplitText text={title} /></h2>
      {description && <Reveal delay={150}><p className="mt-5 text-lg leading-relaxed text-muted">{description}</p></Reveal>}
    </div>
  );
}
