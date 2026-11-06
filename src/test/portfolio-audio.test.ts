import { describe, expect, it } from 'vitest';
import { DEFAULT_SOUND_ENABLED, soundPreference } from '@/lib/portfolio-audio';

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