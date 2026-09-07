import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function AutoScroll() {
  const [isScrolling, setIsScrolling] = useState(false);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isScrolling) {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
      return;
    }

    const scroll = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const elapsed = Math.min(time - lastTime, 50);
      lastTimeRef.current = time;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 1) {
        setIsScrolling(false);
        return;
      }

      window.scrollTo({
        top: window.scrollY + (elapsed / 1000) * 300,
        behavior: "auto",
      });
      frameRef.current = window.requestAnimationFrame(scroll);
    };

    frameRef.current = window.requestAnimationFrame(scroll);

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [isScrolling]);

  return (
    <button
      type="button"
      className="auto-scroll-button"
      onClick={() => setIsScrolling((current) => !current)}
      aria-pressed={isScrolling}
      aria-label={isScrolling ? "Pause automatic scrolling" : "Start slow automatic scrolling"}
    >
      {isScrolling ? (
        <Pause className="size-4" aria-hidden />
      ) : (
        <Play className="size-4" aria-hidden />
      )}
    </button>
  );
}
