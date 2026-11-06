import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SoundProvider } from '@/context/SoundContext';
import { PortfolioAudio } from '@/lib/portfolio-audio';
import { resetPortfolioScroll } from '@/lib/portfolio-navigation';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('Portfolio startup', () => {
  it('clears Chapter III from the opening URL and scrolls to the top', () => {
    window.history.replaceState(null, '', '/#work');
    const scroll = vi.spyOn(window, 'scrollTo');
    resetPortfolioScroll();
    expect(window.location.hash).toBe('');
    expect(scroll).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
    expect(window.history.scrollRestoration).toBe('manual');
  });

  it('attempts music on load without toggling mute', async () => {
    const start = vi.spyOn(PortfolioAudio.prototype, 'start').mockResolvedValue(true);
    vi.spyOn(PortfolioAudio.prototype, 'dispose').mockImplementation(() => {});
    // Constructor dependencies are inert: this test exercises provider startup.
    const node = { gain: {}, threshold: {}, ratio: {}, connect: vi.fn().mockReturnThis() };
    vi.stubGlobal('AudioContext', class {
      createGain() { return node; }
      createDynamicsCompressor() { return node; }
      createMediaElementSource() { return node; }
    });
    render(<SoundProvider><div /></SoundProvider>);
    await waitFor(() => expect(start).toHaveBeenCalledOnce());
  });

  it('does not autoplay when the visitor previously muted music', async () => {
    localStorage.setItem('yd-sound', 'off');
    const start = vi.spyOn(PortfolioAudio.prototype, 'start').mockResolvedValue(true);
    render(<SoundProvider><div /></SoundProvider>);
    expect(start).not.toHaveBeenCalled();
  });
});