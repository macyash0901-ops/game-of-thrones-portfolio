import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

export type SoundName = 'click' | 'sword';

interface SoundContextValue {
  enabled: boolean;
  toggleSound: () => void;
  playSound: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = 'yd-sound';

type AudioNodes = {
  context: AudioContext;
  master: GainNode;
  ambient: GainNode | null;
  ambientSources: OscillatorNode[];
};

type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

function readInitialSound(): boolean {
  return window.localStorage.getItem(STORAGE_KEY) === 'on';
}

function createAudioNodes(): AudioNodes | null {
  const AudioContextClass = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.value = 0.32;
  master.connect(context.destination);
  return { context, master, ambient: null, ambientSources: [] };
}

function startAmbient(nodes: AudioNodes) {
  if (nodes.ambient) return;
  const { context, master } = nodes;
  const ambient = context.createGain();
  ambient.gain.setValueAtTime(0, context.currentTime);
  ambient.gain.linearRampToValueAtTime(0.12, context.currentTime + 1.6);
  ambient.connect(master);

  const low = context.createOscillator();
  const high = context.createOscillator();
  low.type = 'sine';
  high.type = 'triangle';
  low.frequency.value = 72;
  high.frequency.value = 108;
  low.connect(ambient);
  high.connect(ambient);
  low.start();
  high.start();

  nodes.ambient = ambient;
  nodes.ambientSources = [low, high];
}

function stopAmbient(nodes: AudioNodes) {
  if (!nodes.ambient) return;
  const { context, ambient, ambientSources } = nodes;
  ambient.gain.cancelScheduledValues(context.currentTime);
  ambient.gain.setValueAtTime(ambient.gain.value, context.currentTime);
  ambient.gain.linearRampToValueAtTime(0, context.currentTime + 0.35);
  ambientSources.forEach((source) => source.stop(context.currentTime + 0.4));
  nodes.ambient = null;
  nodes.ambientSources = [];
}

function playClick(nodes: AudioNodes) {
  const { context, master } = nodes;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(540, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(300, context.currentTime + 0.07);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.09);
  oscillator.connect(gain).connect(master);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.1);
}

function playSwordClash(nodes: AudioNodes) {
  const { context, master } = nodes;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(1800, now);
  oscillator.frequency.exponentialRampToValueAtTime(240, now + 0.28);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
  oscillator.connect(gain).connect(master);
  oscillator.start(now);
  oscillator.stop(now + 0.36);

  const shimmer = context.createOscillator();
  const shimmerGain = context.createGain();
  shimmer.type = 'square';
  shimmer.frequency.setValueAtTime(2650, now);
  shimmer.frequency.exponentialRampToValueAtTime(700, now + 0.12);
  shimmerGain.gain.setValueAtTime(0.0001, now);
  shimmerGain.gain.exponentialRampToValueAtTime(0.12, now + 0.006);
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  shimmer.connect(shimmerGain).connect(master);
  shimmer.start(now);
  shimmer.stop(now + 0.18);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => { setEnabled(readInitialSound()); }, []);
  const nodesRef = useRef<AudioNodes | null>(null);

  const getNodes = useCallback(() => {
    if (!nodesRef.current) nodesRef.current = createAudioNodes();
    return nodesRef.current;
  }, []);

  const playSound = useCallback((name: SoundName) => {
    if (!enabled) return;
    const nodes = getNodes();
    if (!nodes) return;
    void nodes.context.resume();
    if (name === 'sword') playSwordClash(nodes);
    else playClick(nodes);
  }, [enabled, getNodes]);

  const toggleSound = useCallback(() => {
    const next = !enabled;
    const nodes = getNodes();
    if (nodes) {
      void nodes.context.resume();
      if (next) startAmbient(nodes);
      else stopAmbient(nodes);
    }
    window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    setEnabled(next);
  }, [enabled, getNodes]);

  useEffect(() => {
    if (enabled) {
      const nodes = getNodes();
      if (nodes) startAmbient(nodes);
    }

    const handlePointerDown = (event: PointerEvent) => {
      const nodes = enabled ? getNodes() : null;
      if (nodes) {
        void nodes.context.resume();
        startAmbient(nodes);
      }
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-sfx]');
      const sound = element?.dataset.sfx as SoundName | undefined;
      if (sound) playSound(sound);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [enabled, getNodes, playSound]);

  useEffect(() => () => {
    const nodes = nodesRef.current;
    nodes?.ambientSources.forEach((source) => source.stop());
    void nodes?.context.close();
    nodesRef.current = null;
  }, []);

  const value = useMemo(() => ({ enabled, toggleSound, playSound }), [enabled, toggleSound, playSound]);
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export { SoundContext };
