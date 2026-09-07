import { useEffect, useState, type CSSProperties } from "react";

type CursorPosition = {
  x: number;
  y: number;
};

type ChocolateSparkle = CursorPosition & {
  id: number;
  angle: number;
  distance: number;
  size: number;
};

const sparkleCount = 12;

function createSparkles(x: number, y: number, id: number): ChocolateSparkle[] {
  return Array.from({ length: sparkleCount }, (_, index) => ({
    id: id * sparkleCount + index,
    x,
    y,
    angle: (360 / sparkleCount) * index + (id % 3) * 5,
    distance: 24 + ((index * 17) % 30),
    size: 4 + (index % 3) * 2,
  }));
}

export function CakeCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<ChocolateSparkle[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    let sparkleId = 0;
    let removeTimer: number | undefined;

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handlePointerDown = (event: PointerEvent) => {
      const nextSparkles = createSparkles(event.clientX, event.clientY, sparkleId);
      sparkleId += 1;
      setSparkles((current) => [...current, ...nextSparkles]);

      window.clearTimeout(removeTimer);
      removeTimer = window.setTimeout(() => {
        setSparkles([]);
      }, 700);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="cake-cursor-layer" aria-hidden="true">
      <span
        className="cake-cursor"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      >
        🍰
      </span>
      {sparkles.map((sparkle) => (
        <span
          className="chocolate-sparkle"
          key={sparkle.id}
          style={
            {
              left: sparkle.x,
              top: sparkle.y,
              "--sparkle-angle": `${sparkle.angle}deg`,
              "--sparkle-distance": `${sparkle.distance}px`,
              "--sparkle-size": `${sparkle.size}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
