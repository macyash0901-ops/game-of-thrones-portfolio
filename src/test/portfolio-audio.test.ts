import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_SOUND_ENABLED, PortfolioAudio } from '@/lib/portfolio-audio';

describe('Portfolio sound preference', () => {
  it('enables sound for first-time visitors by default', () => {
    expect(DEFAULT_SOUND_ENABLED).toBe(true);
  });
});

describe('Uploaded background music', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('does not resume a suspended audio context until a user gesture', async () => {
    const listeners = new Map<string, EventListener>();
    const music = {
      loop: false,
      paused: true,
      preload: '',
      crossOrigin: '',
      play: vi.fn().mockImplementation(() => {
        music.paused = false;
        return Promise.resolve();
      }),
      pause: vi.fn(),
      addEventListener: vi.fn((type: string, listener: EventListener) => listeners.set(type, listener)),
      removeEventListener: vi.fn(),
      removeAttribute: vi.fn(),
      load: vi.fn(),
    };
    const node = { gain: { value: 0 }, threshold: { value: 0 }, ratio: { value: 0 }, connect: vi.fn().mockReturnThis(), disconnect: vi.fn() };
    const resumeContext = vi.fn().mockImplementation(function (this: { state: string }) {
      this.state = 'running';
      return Promise.resolve();
    });
    vi.stubGlobal('Audio', class { constructor() { return music; } });
    vi.stubGlobal('AudioContext', class {
      state = 'suspended';
      destination = {};
      createGain() { return node; }
      createDynamicsCompressor() { return node; }
      createMediaElementSource() { return node; }
      resume = resumeContext;
      close = vi.fn().mockResolvedValue(undefined);
    });

    const audio = new PortfolioAudio();
    expect(await audio.start()).toBe(false);
    expect(resumeContext).not.toHaveBeenCalled();
    expect(music.play).toHaveBeenCalledOnce();

    expect(await audio.start(true)).toBe(true);
    expect(resumeContext).toHaveBeenCalledOnce();
    expect(music.play).toHaveBeenCalledTimes(2);
    audio.dispose();
    expect(music.removeEventListener).toHaveBeenCalledWith('ended', expect.any(Function));
  });

  it('restarts the track five seconds after it ends and pauses when muted', async () => {
    vi.useFakeTimers();
    const listeners = new Map<string, EventListener>();
    const music = {
      loop: false,
      paused: true,
      preload: '',
      crossOrigin: '',
      play: vi.fn().mockImplementation(() => {
        music.paused = false;
        return Promise.resolve();
      }),
      pause: vi.fn().mockImplementation(() => {
        music.paused = true;
      }),
      addEventListener: vi.fn((type: string, listener: EventListener) => listeners.set(type, listener)),
      removeEventListener: vi.fn((type: string) => listeners.delete(type)),
      removeAttribute: vi.fn(),
      load: vi.fn(),
    };
    const node = { gain: { value: 0 }, threshold: { value: 0 }, ratio: { value: 0 }, connect: vi.fn().mockReturnThis(), disconnect: vi.fn() };
    vi.stubGlobal('Audio', class { constructor() { return music; } });
    vi.stubGlobal('AudioContext', class {
      state = 'running';
      destination = {};
      createGain() { return node; }
      createDynamicsCompressor() { return node; }
      createMediaElementSource() { return node; }
      resume() { return Promise.resolve(); }
      close() { return Promise.resolve(); }
    });
    const audio = new PortfolioAudio();
    expect(await audio.start()).toBe(true);
    expect(music.play).toHaveBeenCalledOnce();
    expect(music.loop).toBe(false);

    music.paused = true;
    listeners.get('ended')?.(new Event('ended'));
    await vi.advanceTimersByTimeAsync(4999);
    expect(music.play).toHaveBeenCalledOnce();
    await vi.advanceTimersByTimeAsync(1);
    expect(music.play).toHaveBeenCalledTimes(2);

    audio.stop();
    expect(music.pause).toHaveBeenCalled();
    audio.dispose();
    expect(listeners.has('ended')).toBe(false);
  });
});