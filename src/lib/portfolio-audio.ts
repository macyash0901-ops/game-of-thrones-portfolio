export const SOUND_STORAGE_KEY = 'yd-sound';
export const DEFAULT_SOUND_ENABLED = true;

export function soundPreference(stored: string | null): boolean {
  return stored !== 'off';
}

export type SoundName = 'click' | 'sword';

/** Midrange harmonics remain audible on laptop and phone speakers. */
export class PortfolioAudio {
  private context: AudioContext;
  private master: GainNode;
  private ambient: GainNode | null = null;
  private voices: OscillatorNode[] = [];

  constructor() {
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = 0.55;
    const compressor = this.context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.ratio.value = 4;
    this.master.connect(compressor).connect(this.context.destination);
  }

  async start() {
    if (this.context.state === 'closed') return;
    await this.context.resume();
    if (this.ambient || this.context.state !== 'running') return;
    const now = this.context.currentTime;
    const ambient = this.context.createGain();
    ambient.gain.setValueAtTime(0, now);
    ambient.gain.linearRampToValueAtTime(0.32, now + 0.8);
    ambient.connect(this.master);
    this.ambient = ambient;
    // A restrained, original D-minor pad rather than an inaudible sub-bass drone.
    [146.83, 220, 293.66, 349.23, 440].forEach((frequency, index) => {
      const voice = this.context.createOscillator();
      const level = this.context.createGain();
      voice.type = index < 2 ? 'triangle' : 'sine';
      voice.frequency.value = frequency;
      voice.detune.value = index % 2 ? 3 : -3;
      level.gain.value = index < 2 ? 0.35 : 0.2;
      voice.connect(level).connect(ambient);
      voice.start();
      this.voices.push(voice);
    });
  }

  stop() {
    const ambient = this.ambient;
    if (!ambient) return;
    const now = this.context.currentTime;
    ambient.gain.cancelScheduledValues(now);
    ambient.gain.setValueAtTime(ambient.gain.value, now);
    ambient.gain.linearRampToValueAtTime(0, now + 0.2);
    this.voices.forEach((voice) => {
      voice.stop(now + 0.22);
      voice.onended = () => voice.disconnect();
    });
    this.voices = [];
    this.ambient = null;
    setTimeout(() => ambient.disconnect(), 300);
  }

  play(name: SoundName) {
    if (this.context.state !== 'running') return;
    const now = this.context.currentTime;
    const voice = this.context.createOscillator();
    const level = this.context.createGain();
    voice.type = 'triangle';
    voice.frequency.setValueAtTime(name === 'sword' ? 880 : 660, now);
    voice.frequency.exponentialRampToValueAtTime(name === 'sword' ? 220 : 440, now + 0.16);
    level.gain.setValueAtTime(0.001, now);
    level.gain.exponentialRampToValueAtTime(0.3, now + 0.01);
    level.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    voice.connect(level).connect(this.master);
    voice.start();
    voice.stop(now + 0.24);
    voice.onended = () => { voice.disconnect(); level.disconnect(); };
  }

  dispose() {
    this.stop();
    void this.context.close().catch(() => undefined);
  }
}