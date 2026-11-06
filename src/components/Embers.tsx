import type { CSSProperties } from 'react';

const EMBER_COUNT = 22;

export function Embers() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: EMBER_COUNT }, (_, index) => {
        const size = 2 + (index % 3);
        const style = {
          left: `${(index * 37) % 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          '--dur': `${7 + ((index * 13) % 7)}s`,
          '--delay': `${-((index * 5) % 11)}s`,
          '--drift': `${((index % 5) - 2) * 18}px`,
        } as CSSProperties;
        return <span key={index} className="ember animate-ember-rise" style={style} />;
      })}
    </div>
  );
}
