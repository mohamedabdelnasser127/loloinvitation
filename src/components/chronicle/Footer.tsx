import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

/** Dark closing note that mirrors the hero backdrop. */
export function Footer() {
  return (
    <footer className="night-vignette px-4 py-24 text-center text-paper">
      <Reveal className="mx-auto max-w-xl">
        <Ornament className="text-gilt" />
        <h2 className="mt-8 text-3xl font-semibold sm:text-4xl">Until the Next Chapter…</h2>
        <p className="mt-4 font-[family-name:var(--font-display)] text-lg text-paper/70 italic">
          With love, laughter, and a little more magic to come.
        </p>
        <p className="mt-14 text-[0.7rem] tracking-[0.22em] text-paper/50 uppercase">
          A sealed missive · With love
        </p>
      </Reveal>
    </footer>
  );
}
