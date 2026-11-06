import musicAsset from '@/assets/portfolio-music.mp3.asset.json';

export const SOUND_STORAGE_KEY = 'yd-sound';
export const DEFAULT_SOUND_ENABLED = true;

export function soundPreference(stored: string | null): boolean {
  return stored !== 'off';
}

export type SoundName = 'click' | 'sword';

/** Uploaded looping music and interaction effects share one audio engine. */
export class PortfolioAudio {
  private context: AudioContext;
  private master: GainNode;
  private music: HTMLAudioElement;
  private musicSource: MediaElementAudioSourceNode;
  private active = false;

  constructor() {
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = 0.55;
    const compressor = this.context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.ratio.value = 4;
    this.master.connect(compressor).connect(this.context.destination);
    this.music = new Audio(musicAsset.url);
    this.music.loop = true;
    this.music.preload = 'auto';
    this.music.crossOrigin = 'anonymous';
    this.musicSource = this.context.createMediaElementSource(this.music);
    this.musicSource.connect(this.master);
  }

  async start() {
    if (this.context.state === 'closed') return false;
    this.active = true;
    // Issue both requests immediately, preserving the browser's user-gesture
    // activation when this is a retry after blocked autoplay.
    await Promise.all([this.context.resume(), this.music.play()]);
    if (!this.active) this.music.pause();
    return this.active && this.context.state === 'running' && !this.music.paused;
  }

  stop() {
    this.active = false;
    this.music.pause();
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
    this.music.removeAttribute('src');
    this.music.load();
    this.musicSource.disconnect();
    void this.context.close().catch(() => undefined);
  }
}