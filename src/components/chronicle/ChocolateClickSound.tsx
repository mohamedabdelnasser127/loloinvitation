import { useEffect } from "react";

function playChocolateClick(audioContext: AudioContext) {
  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  const oscillator = audioContext.createOscillator();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(180, now);
  oscillator.frequency.exponentialRampToValueAtTime(72, now + 0.12);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.15);
}

const clickableSelector =
  "button, a, summary, [role='button'], [onclick], input[type='button'], input[type='submit'], input[type='reset']";

/** Adds a soft chocolate-like pop to every interactive element without changing markup. */
export function ChocolateClickSound() {
  useEffect(() => {
    const audioContext = new AudioContext();

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(clickableSelector)) return;

      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }
      playChocolateClick(audioContext);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      void audioContext.close();
    };
  }, []);

  return null;
}
