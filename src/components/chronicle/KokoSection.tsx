import { motion } from "motion/react";

import koko from "@/assets/koko.jpg";
import kokoSun from "@/assets/koko-sun.jpeg";
import kokoWindow from "@/assets/koko-window.jpeg";
import { Eyebrow, Ornament, SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";

export function KokoSection() {
  return (
    <section
      id="koko"
      className="koko-section relative overflow-hidden px-4 py-24 sm:py-32"
      style={{ backgroundImage: `url("${koko}")` }}
    >
      <div className="koko-section-overlay" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>A Special Interlude</Eyebrow>
          <SectionHeading
            title="My Special Pet, Koko"
            subtitle="A little character with a big place in my heart"
          />
          <Ornament className="text-ember" />
        </Reveal>

        <div className="mt-14 grid items-center gap-8 sm:grid-cols-2 sm:gap-12">
          <motion.article
            className="koko-card koko-card-left"
            whileHover={{ rotate: -4, y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <img
              src={kokoWindow}
              alt="Koko by the window"
              className="koko-card-image koko-card-image-window"
            />
            <p className="eyebrow text-ember">Meet Koko</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
              Small paws, unforgettable personality.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Koko brings a little mischief, a lot of comfort, and plenty of charm to every chapter.
            </p>
          </motion.article>

          <motion.article
            className="koko-card koko-card-right"
            whileHover={{ rotate: 4, y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <img
              src={kokoSun}
              alt="Koko relaxing in the sunlight"
              className="koko-card-image koko-card-image-sun"
            />
            <p className="eyebrow text-ember">A Favorite Memory</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
              Always ready for a close-up.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              One look from that face, and the whole room feels warmer.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
