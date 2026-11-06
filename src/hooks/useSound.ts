import { useContext } from 'react';
import { SoundContext } from '@/context/sound-state';
import type { SoundName } from '@/lib/portfolio-audio';

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within a SoundProvider');
  return context;
}

export type { SoundName };
