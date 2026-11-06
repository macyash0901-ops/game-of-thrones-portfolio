import { Fragment, type CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

interface SplitTextProps {
  text: string;
  className?: string;
  charStep?: number;
  baseDelay?: number;
}

export function SplitText({ text, className, charStep = 28, baseDelay = 0 }: SplitTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const words = text.split(' ');
  let index = 0;

  return (
    <span ref={ref} aria-label={text} className={cn('inline', inView && 'is-split-visible', className)}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="split-word" aria-hidden="true">
            {Array.from(word).map((char) => {
              const delay = baseDelay + index * charStep;
              index += 1;
              return (
                <span key={index} className="split-char" style={{ '--d': `${delay}ms` } as CSSProperties}>
                  {char}
                </span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  );
}
