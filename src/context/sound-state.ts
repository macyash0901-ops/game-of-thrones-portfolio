import { createContext } from 'react';
import type { SoundName } from '@/lib/portfolio-audio';

interface SoundContextValue {
  enabled: boolean;
  playing: boolean;
  toggleSound: () => void;
  playSound: (name: SoundName) => void;
}

// Keep context identity outside the refresh boundary that exports the provider.
export const SoundContext = createContext<SoundContextValue | null>(null);