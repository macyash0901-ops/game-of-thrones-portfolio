import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_SOUND_ENABLED, PortfolioAudio, type SoundName } from '@/lib/portfolio-audio';
export type { SoundName } from '@/lib/portfolio-audio';
interface SoundContextValue {
  enabled: boolean;
  playing: boolean;
  toggleSound: () => void;
  playSound: (name: SoundName) => void;
}
export const SoundContext = createContext<SoundContextValue | null>(null);
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(DEFAULT_SOUND_ENABLED);
  const [playing, setPlaying] = useState(false);
  const enabledRef = useRef(DEFAULT_SOUND_ENABLED);
  const audioRef = useRef<PortfolioAudio | null>(null);
  const start = useCallback(async () => {
    if (!enabledRef.current) return;
    try {
      if (!audioRef.current) audioRef.current = new PortfolioAudio();
      const started = await audioRef.current.start();
      if (enabledRef.current) setPlaying(started);
      else audioRef.current.stop();
    } catch { setPlaying(false); }
  }, []);
  useEffect(() => {
    void start();
  }, [start]);
  const playSound = useCallback((name: SoundName) => {
    if (enabledRef.current) audioRef.current?.play(name);
  }, []);
  const toggleSound = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    if (next) void start();
    else { audioRef.current?.stop(); setPlaying(false); }
  }, [start]);
  useEffect(() => {
    // Retry blocked autoplay on the first genuine interaction, not just the toggle.
    const activate = (event: Event) => {
      if (!event.isTrusted) return;
      if (event instanceof KeyboardEvent && !['Enter', ' ', 'Tab'].includes(event.key)) return;
      void start().then(() => {
        if (!(event.target instanceof Element)) return;
        const sound = event.target.closest<HTMLElement>('[data-sfx]')?.dataset['sfx'];
        if (sound === 'click' || sound === 'sword') playSound(sound);
      });
    };
    const visibility = () => {
      if (document.hidden) { audioRef.current?.stop(); setPlaying(false); }
      else if (audioRef.current && enabledRef.current) void start();
    };
    document.addEventListener('pointerdown', activate);
    document.addEventListener('keydown', activate);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      document.removeEventListener('pointerdown', activate);
      document.removeEventListener('keydown', activate);
      document.removeEventListener('visibilitychange', visibility);
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, [start, playSound]);
  const value = useMemo(() => ({ enabled, playing, toggleSound, playSound }), [enabled, playing, toggleSound, playSound]);
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
