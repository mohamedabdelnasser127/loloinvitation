import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eyebrow, Ornament, SectionHeading } from "./Ornament";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { photoCardTransforms, photoTransforms, timeline } from "./content";

type TimelineEntry = (typeof timeline)[number];

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const reduced = useReducedMotion();
  const slideDirection = index % 2 === 0 ? -1 : 1;
  const selectedPhoto = entry.collection[selectedImage];

  return (
    <Dialog onOpenChange={(open) => open && setSelectedImage(0)}>
      <DialogTrigger asChild>
        <motion.button
          type="button"
          className={`paper-card group w-full overflow-hidden rounded-3xl text-left ${
            index % 2 === 0 ? "sm:col-start-1" : "sm:col-start-2"
          }`}
          initial={
            reduced
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  x: slideDirection * 42,
                  y: 22,
                  scale: 0.94,
                  rotate: slideDirection * 1.5,
                }
          }
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
          whileHover={{ y: -4 }}
          transition={{
            type: "spring",
            stiffness: 95,
            damping: 18,
            mass: 0.7,
            opacity: { duration: 0.45, ease: "easeOut" },
          }}
        >
          <div
            className={`w-full overflow-hidden ${
              entry.imageAspect ?? "aspect-[4/3]"
            }`}
          >
            <img
              src={entry.image}
              alt={entry.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                objectPosition: entry.imagePosition,
                transform:
                  photoCardTransforms.get(entry.image) ??
                  photoTransforms.get(entry.image) ??
                  undefined,
                transformOrigin: "center",
              }}
            />
          </div>
          <div className="p-6">
            <p className="eyebrow text-ember">{entry.year}</p>
            <h3 className="mt-2 text-2xl font-semibold">{entry.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.body}</p>
            <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-ember uppercase">
              Open photo collection · {entry.collection.length} photographs
            </p>
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl rounded-3xl border-border bg-paper p-5 sm:p-7">
        <DialogHeader className="pr-8">
          <DialogTitle className="font-[family-name:var(--font-display)] text-3xl text-ink">
            {entry.title}
          </DialogTitle>
          <DialogDescription className="text-ink/65">
            {entry.year} · A small collection from this chapter
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-hidden rounded-2xl bg-night">
          <img
            src={selectedPhoto}
            alt={`${entry.title} photograph ${selectedImage + 1}`}
            className="max-h-[55vh] w-full object-contain"
            style={{
              transform: photoTransforms.get(selectedPhoto) ?? undefined,
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {entry.collection.map((image, imageIndex) => (
            <button
              type="button"
              key={`${entry.year}-${imageIndex}`}
              onClick={() => setSelectedImage(imageIndex)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                selectedImage === imageIndex
                  ? "border-ember"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt=""
                className="aspect-[4/3] w-full object-contain"
                style={{
                  transform: photoTransforms.get(image) ?? undefined,
                  transformOrigin: "center",
                }}
              />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Vertical chronicle of milestones with a scroll-drawn centre line. */
export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="journey" className="bg-secondary/50 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="flex flex-col items-center gap-4">
          <Eyebrow>Chapter Two</Eyebrow>
          <SectionHeading
            title="The Winding Road to Twenty"
            subtitle="A visual journey through the moments and people who shaped my story"
          />
          <Ornament className="text-ember" />
        </Reveal>

        <div ref={trackRef} className="relative mt-16 pl-10 sm:pl-0">
          {/* Track line: left rail on mobile, centred on desktop */}
          <div className="absolute top-0 bottom-0 left-3 w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            className="absolute top-0 left-3 w-px origin-top bg-ember sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY: progress, height: "100%" }}
            aria-hidden
          />

          <Stagger className="space-y-10">
            {timeline.map((entry, index) => (
              <StaggerItem key={entry.year}>
                <div className="relative sm:grid sm:grid-cols-2 sm:gap-10">
                  <span
                    className="absolute top-6 -left-[1.9rem] z-10 size-2.5 rotate-45 border border-ember bg-background sm:left-1/2 sm:-translate-x-1/2"
                    aria-hidden
                  />
                  <TimelineCard entry={entry} index={index} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
