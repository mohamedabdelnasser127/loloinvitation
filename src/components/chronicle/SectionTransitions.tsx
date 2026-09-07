import { useEffect, useRef, useState, type CSSProperties } from "react";

type TransitionSpark = {
  id: number;
  angle: number;
  distance: number;
  size: number;
};

const sparkCount = 14;

function createSparks(seed: number): TransitionSpark[] {
  return Array.from({ length: sparkCount }, (_, index) => ({
    id: seed * sparkCount + index,
    angle: (360 / sparkCount) * index + (seed % 4) * 7,
    distance: 34 + ((index * 19) % 42),
    size: 3 + (index % 3) * 2,
  }));
}

export function SectionTransitions() {
  const [active, setActive] = useState(false);
  const [sparks, setSparks] = useState<TransitionSpark[]>([]);
  const activeSection = useRef<string | null>(null);
  const transitionCount = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const observer = new IntersectionObserver(
      (entries) => {
        const next = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!next || next.target.id === activeSection.current) return;

        const isFirstSection = activeSection.current === null;
        activeSection.current = next.target.id;
        if (isFirstSection) return;

        transitionCount.current += 1;
        setSparks(createSparks(transitionCount.current));
        setActive(false);
        requestAnimationFrame(() => setActive(true));
        window.setTimeout(() => {
          setActive(false);
          setSparks([]);
        }, 850);
      },
      { threshold: [0.35, 0.6], rootMargin: "-8% 0px -8% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`section-transition-layer ${active ? "is-active" : ""}`} aria-hidden="true">
      <span className="section-flash" />
      <span className="section-glow" />
      {sparks.map((spark) => (
        <span
          className="section-spark"
          key={spark.id}
          style={
            {
              "--spark-angle": `${spark.angle}deg`,
              "--spark-distance": `${spark.distance}px`,
              "--spark-size": `${spark.size}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
