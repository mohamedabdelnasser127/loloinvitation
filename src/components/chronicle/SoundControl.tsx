import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const videoId = "xVxD-u1DhVQ";

export function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playerUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

  return (
    <>
      <button
        type="button"
        className="sound-control"
        onClick={() => setIsPlaying((current) => !current)}
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
      {isPlaying && (
        <iframe
          title="Invitation song"
          src={playerUrl}
          allow="autoplay; encrypted-media"
          className="sound-control-player"
        />
      )}
    </>
  );
}
