import musicUrl from '@/assets/videoplayback.webm';

export const DEFAULT_SOUND_ENABLED = true;

export type SoundName = 'click' | 'sword';

/** Uploaded looping music and interaction effects share one audio engine. */
export class PortfolioAudio {
  private context: AudioContext;
  private master: GainNode;
  private music: HTMLAudioElement;
  private musicSource: MediaElementAudioSourceNode;
  private active = false;
  private restartTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = 0.55;
    const compressor = this.context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.ratio.value = 4;
    this.master.connect(compressor).connect(this.context.destination);
    this.music = new Audio(musicUrl);
    this.music.loop = false;
    this.music.preload = 'auto';
    this.music.crossOrigin = 'anonymous';
    this.musicSource = this.context.createMediaElementSource(this.music);
    this.musicSource.connect(this.master);
    this.music.addEventListener('ended', this.scheduleRestart);
  }

  async start(userGesture = false) {
    if (this.context.state === 'closed') return false;
    this.active = true;
    this.clearRestartTimer();
    const shouldResume = this.context.state !== 'running';

    const results = await Promise.allSettled([
      shouldResume && userGesture ? this.context.resume() : Promise.resolve(),
      this.music.play(),
    ]);
    const failures = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map((result) => result.reason);
    if (failures.length > 0) {
      this.music.pause();
      if (failures.some((error) => error instanceof DOMException && error.name === 'NotAllowedError')) return false;
      throw new AggregateError(failures, 'Unable to start portfolio audio');
    }

    if (!this.active) this.music.pause();
    return this.active && this.context.state === 'running' && !this.music.paused;
  }

  stop() {
    this.active = false;
    this.clearRestartTimer();
    this.music.pause();
  }

  private scheduleRestart = () => {
    if (!this.active) return;
    this.clearRestartTimer();
    this.restartTimer = setTimeout(() => {
      this.restartTimer = null;
      if (this.active) {
        void this.start().catch((error: unknown) => {
          console.error('Unable to restart portfolio music.', error);
        });
      }
    }, 5000);
  };

  private clearRestartTimer() {
    if (this.restartTimer) clearTimeout(this.restartTimer);
    this.restartTimer = null;
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
    this.music.removeEventListener('ended', this.scheduleRestart);
    this.music.removeAttribute('src');
    this.music.load();
    this.musicSource.disconnect();
    void this.context.close().catch(() => undefined);
  }
}