import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SoundProvider } from '@/context/SoundContext';
import { PortfolioAudio } from '@/lib/portfolio-audio';
import { resetPortfolioScroll } from '@/lib/portfolio-navigation';
import { useSound } from '@/hooks/useSound';

function SoundProbe() {
  const { enabled, toggleSound } = useSound();
  return <button onClick={toggleSound}>{enabled ? 'on' : 'off'}</button>;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
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
    localStorage.setItem('yd-sound', 'off');
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

  it('keeps mute local to the page and resets to on after a remount', async () => {
    const start = vi.spyOn(PortfolioAudio.prototype, 'start').mockResolvedValue(true);
    vi.spyOn(PortfolioAudio.prototype, 'stop').mockImplementation(() => {});
    vi.spyOn(PortfolioAudio.prototype, 'dispose').mockImplementation(() => {});
    const node = { gain: {}, threshold: {}, ratio: {}, connect: vi.fn().mockReturnThis() };
    vi.stubGlobal('AudioContext', class {
      createGain() { return node; }
      createDynamicsCompressor() { return node; }
      createMediaElementSource() { return node; }
    });
    const stored = vi.spyOn(Storage.prototype, 'setItem');
    const first = render(<SoundProvider><SoundProbe /></SoundProvider>);
    await waitFor(() => expect(start).toHaveBeenCalledOnce());
    fireEvent.click(first.getByRole('button', { name: 'on' }));
    expect(first.getByRole('button', { name: 'off' })).toBeInTheDocument();
    expect(stored).not.toHaveBeenCalled();
    first.unmount();
    const refreshed = render(<SoundProvider><SoundProbe /></SoundProvider>);
    expect(refreshed.getByRole('button', { name: 'on' })).toBeInTheDocument();
    await waitFor(() => expect(start).toHaveBeenCalledTimes(2));
  });
});