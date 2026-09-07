import { motion } from "motion/react";
import storyImage from "@/assets/story.jpg";
import { Eyebrow, Ornament, SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";
import { useState } from "react";

/** The personal letter section: a two-column editorial spread on desktop. */
export function Story() {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <section id="story" className="bg-background px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="flex flex-col items-center gap-4">
          <Eyebrow>A Letter From the Family</Eyebrow>
          <SectionHeading title="The Chronicle of Lolo’s Light" />
          <Ornament className="text-ember" />
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start">
          <Reveal className="paper-card p-7 sm:p-10">
            <p className="text-base leading-loose">
              <span className="float-left mr-3 font-[family-name:var(--font-display)] text-6xl leading-[0.8] font-semibold text-ember">
                T
              </span>
              wenty years ago the house was quieter, and the mornings began later. Then
              came a small, insistent voice and every ordinary hour since has been a
              little louder, a little warmer, and considerably more interesting.
            </p>
            <p className="mt-6 text-base leading-loose">
              We have watched a child become a person with opinions on music, strong
              feelings about breakfast, and a gift for making strangers feel like old
              friends. We have kept the drawings, the ticket stubs, the notes left on the
              kitchen table.
            </p>
            <p className="mt-6 text-base leading-loose">
              So this autumn we are lighting the candles, laying the long table, and asking
              the people who shaped these twenty years to come and be in the room.
            </p>

            <div className="mt-8 border-l-2 border-ember/50 bg-secondary/60 py-4 pr-4 pl-5">
              <p className="font-[family-name:var(--font-display)] text-lg italic">
                "Come hungry, come early, and bring a story we haven't heard yet."
              </p>
              <p className="eyebrow mt-3 text-muted-foreground">— The Family</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.figure
              className="paper-card relative overflow-hidden p-[3px] rounded-xl" // Changed p-3 to p-[3px] to control border width
              whileHover={{ y: -6, scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.98 }} // Slight scale down on tap for responsiveness
              onTapStart={() => setIsTapped(true)}
              onTap={() => setIsTapped(false)}
              onTapCancel={() => setIsTapped(false)}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              {/* 1. Animated Fire Border Layer (Visible only on tap) */}
              {isTapped && (
                <motion.div
                  className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] z-0"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, #6B351D, #923F0F, #DABFAA, #F9C17A, transparent)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "linear",
                  }}
                />
              )}

              {/* 2. Card Content Mask (Keeps the background solid so fire only shows on the border) */}
              <div className="relative z-10 w-full h-full bg-white dark:bg-zinc-900 rounded-[10px] p-3 overflow-hidden">
                <img
                  src={storyImage}
                  alt="Autumn light falling on a stack of old books beside a lace-curtained window"
                  width={900}
                  height={1000}
                  loading="lazy"
                  className="w-full object-cover rounded-t-lg"
                />
                <figcaption className="px-2 py-4 text-center font-[family-name:var(--font-display)] text-sm text-muted-foreground italic">
                  One frame, countless memories, and the people who make every chapter brighter.
                </figcaption>
              </div>
            </motion.figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
