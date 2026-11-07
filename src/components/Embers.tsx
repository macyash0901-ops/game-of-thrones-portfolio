import type { CSSProperties } from 'react';

const EMBER_COUNT = 50;

export function Embers() {
  return (
    <div aria-hidden="true" className="ambient-embers pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: EMBER_COUNT }, (_, index) => {
        const size = 2 + (index % 3);
        const style = {
          left: `${(index * 37) % 100}%`,
          top: `${(index * 53) % 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          '--dur': `${2.5 + ((index * 13) % 2)}s`,
          '--delay': `${-((index * 5) % 17)}s`,
          '--drift-x': `${((index * 37) % 241) - 120}px`,
          '--drift-y': `${((index * 53) % 201) - 100}px`,
          '--ember-size': `${size}px`,
        } as CSSProperties;
        return <span key={index} className="ember" style={style} />;
      })}
    </div>
  );
}
