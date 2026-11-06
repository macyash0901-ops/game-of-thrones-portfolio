import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ value, suffix = '', duration = 1600 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
