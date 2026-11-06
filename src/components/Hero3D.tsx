import { useState, type CSSProperties, type PointerEvent } from 'react';
import { Braces, BrainCircuit, Cloud, Crown, Database, ShieldCheck, Smartphone } from 'lucide-react';

export function Hero3D() {
  const [rotation, setRotation] = useState({ x: -7, y: 12 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 18 - 4, y: x * 22 + 8 });
  };

  const resetRotation = () => setRotation({ x: -7, y: 12 });
  const sceneStyle = {
    '--hero-rotate-x': `${rotation.x}deg`,
    '--hero-rotate-y': `${rotation.y}deg`,
  } as CSSProperties;

  return (
    <div
      className="hero-3d-scene relative mx-auto h-[320px] w-full max-w-[520px] [perspective:1200px] lg:h-[420px]"
      style={sceneStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetRotation}
      aria-label="Interactive three-dimensional technology sigil"
      role="img"
    >
      <div className="hero-3d-orbit hero-3d-orbit-one" />
      <div className="hero-3d-orbit hero-3d-orbit-two" />
      <div className="hero-3d-card absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-accent/60 sigil-surface">
        <div className="absolute inset-3 rounded-[1.5rem] border border-accent/20" />
        <div className="relative flex h-full flex-col items-center justify-center gap-5 text-center">
          <div className="hero-3d-crown flex h-20 w-20 items-center justify-center rounded-full border border-accent/70 bg-accent/10 text-accent sigil-crown-shadow">
            <Crown size={42} strokeWidth={1.2} />
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">The builder's sigil</p>
            <p className="mt-2 font-display text-xl text-ink">Code. Clarity. Craft.</p>
          </div>
        </div>
      </div>

      <div className="hero-3d-badge hero-3d-badge-top flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-sm text-ink shadow-xl backdrop-blur">
        <Braces size={16} className="text-accent" /> React / Next.js
      </div>
      <div className="hero-3d-badge hero-3d-badge-right flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-sm text-ink shadow-xl backdrop-blur">
        <Database size={16} className="text-accent" /> Python / Data
      </div>
      <div className="hero-3d-badge hero-3d-badge-bottom flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-sm text-ink shadow-xl backdrop-blur">
        <ShieldCheck size={16} className="text-accent" /> Secure by design
      </div>
      <div className="hero-3d-badge hero-3d-badge-mobile flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-sm text-ink shadow-xl backdrop-blur">
        <Smartphone size={16} className="text-accent" /> Flutter/React Native
      </div>
      <div className="hero-3d-badge hero-3d-badge-ai flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-sm text-ink shadow-xl backdrop-blur">
        <BrainCircuit size={16} className="text-accent" /> AI/ML
      </div>
      <div className="hero-3d-badge hero-3d-badge-cloud flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-sm text-ink shadow-xl backdrop-blur">
        <Cloud size={16} className="text-accent" /> Cloud/DevOps
      </div>
    </div>
  );
}
