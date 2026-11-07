import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export function SoundToggle() {
  const { enabled, playing, toggleSound } = useSound();

  return (
    <Button variant="imported" size="imported"
      type="button"
      aria-pressed={enabled}
      data-playing={playing}
      onClick={toggleSound}
      aria-label={enabled ? 'Mute ambient sound' : 'Enable ambient sound'}
      title={enabled ? (playing ? 'Sound on · Mute' : 'Sound on · Trying to start automatically') : 'Enable ambient sound'}
      className="sound-control flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-accent backdrop-blur transition-all duration-300 hover:-rotate-6 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {enabled ? <Volume2 size={18} strokeWidth={1.75} /> : <VolumeX size={18} strokeWidth={1.75} />}
    </Button>
  );
}
