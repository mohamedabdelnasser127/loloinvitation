import { motion } from "motion/react";

import { Eyebrow, Ornament, SectionHeading } from "./Ornament";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { scrapbook } from "./content";

/** Three tilted photo cards that straighten and lift on hover. */
export function Scrapbook() {
  return (
    <section id="scrapbook" className="bg-background px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="flex flex-col items-center gap-4">
          <Eyebrow>Chapter Three</Eyebrow>
          <SectionHeading
            title="What Awaits You at the Party"
            subtitle="Come for the celebration, stay for the memories"
          />
          <Ornament className="text-ember" />
        </Reveal>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" step={0.14}>
          {scrapbook.map((item, index) => (
            <StaggerItem key={item.caption}>
              <motion.figure
                className="paper-card h-full p-3"
                initial={{ rotate: index % 2 === 0 ? -1.6 : 1.4 }}
                whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.caption}
                    width={900}
                    height={700}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                  />
                </div>
                <figcaption className="px-2 py-4">
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                    {item.caption}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground italic">{item.note}</p>
                </figcaption>
              </motion.figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
