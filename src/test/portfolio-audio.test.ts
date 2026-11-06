import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_SOUND_ENABLED, PortfolioAudio, soundPreference } from '@/lib/portfolio-audio';

describe('Portfolio sound preference', () => {
  it('enables sound for first-time visitors by default', () => {
    expect(DEFAULT_SOUND_ENABLED).toBe(true);
    expect(soundPreference(null)).toBe(true);
  });
  it('preserves an explicit mute preference', () => {
    expect(soundPreference('off')).toBe(false);
    expect(soundPreference('on')).toBe(true);
  });
});

describe('Uploaded background music', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('repeats the uploaded track and pauses when muted', async () => {
    const music = { loop: false, preload: '', crossOrigin: '', play: vi.fn().mockResolvedValue(undefined), pause: vi.fn() };
    const node = { gain: { value: 0 }, threshold: { value: 0 }, ratio: { value: 0 }, connect: vi.fn().mockReturnThis() };
    vi.stubGlobal('Audio', class { constructor() { return music; } });
    vi.stubGlobal('AudioContext', class {
      state = 'running';
      destination = {};
      createGain() { return node; }
      createDynamicsCompressor() { return node; }
      createMediaElementSource() { return node; }
      resume() { return Promise.resolve(); }
    });
    const audio = new PortfolioAudio();
    expect(music.loop).toBe(true);
    await audio.start();
    expect(music.play).toHaveBeenCalledOnce();
    audio.stop();
    expect(music.pause).toHaveBeenCalledOnce();
  });
});