import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import song from "@/assets/song.mp3";

export function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    await audio.play();
    setIsPlaying(true);
  };

  return (
    <>
      <button
        type="button"
        className="sound-control"
        onClick={() => void togglePlayback()}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause the invitation song" : "Play the invitation song"}
        title={isPlaying ? "Pause song" : "Play song"}
      >
        {isPlaying ? (
          <Volume2 className="size-4" aria-hidden />
        ) : (
          <VolumeX className="size-4" aria-hidden />
        )}
      </button>
      <audio ref={audioRef} src={song} loop preload="auto" className="sound-control-player" />
    </>
  );
}
