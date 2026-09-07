import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Feather } from "lucide-react";

import { Ornament } from "./Ornament";
import { invitation } from "./content";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Wax seal that pulses gently, then cracks open when the invitation is unsealed. */
function WaxSeal({ broken }: { broken: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      className="relative grid size-7 shrink-0 place-items-center rounded-full bg-paper/90 text-[0.6rem] font-semibold text-ember"
      animate={
        broken || reduced ? { scale: 1, rotate: 0 } : { scale: [1, 1.08, 1], rotate: [0, -4, 0] }
      }
      transition={
        broken || reduced
          ? { duration: 0.4 }
          : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
      }
    >
      20
      <motion.span
        className="absolute inset-0 rounded-full border border-ember/40"
        animate={broken ? { scale: 1.9, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </motion.span>
  );
}

export function Hero({
  guestName,
  onUnseal,
}: {
  guestName: string;
  onUnseal: (name: string) => void;
}) {
  const [value, setValue] = useState("");
  const unsealed = guestName.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = value.trim() || "Guest";
    onUnseal(name);
    setTimeout(() => {
      document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
    }, 1400);
  }

  return (
    <section className="night-vignette relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <p className="absolute top-6 left-6 max-w-[12rem] text-left text-[0.62rem] leading-relaxed tracking-[0.16em] text-paper/55 uppercase sm:top-8 sm:left-8">
        {invitation.dateNumeric} · {invitation.timeShort} · {invitation.venue}
      </p>
      <motion.div
        className="relative w-full max-w-xl"
        initial={{ opacity: 0, y: 40, scale: 0.96, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        style={{ perspective: 1200 }}
      >
        <div className="paper-card relative px-6 py-10 text-center sm:px-12">
          <span className="eyebrow absolute top-6 right-6 hidden rounded-full border border-border px-3 py-1 text-muted-foreground sm:block">
            No. 020
          </span>

          <motion.p
            className="eyebrow inline-block rounded-full bg-ember/10 px-3 py-1 text-ember"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            SPECIAL DELIVERANCE
          </motion.p>

          <motion.p
            className="eyebrow mt-5 text-muted-foreground"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.24em" }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          >
            A CHRONICLE FOR HER
          </motion.p>

          <AnimatePresence mode="wait">
            {unsealed ? (
              <motion.div
                key="opened"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="mt-4"
              >
                <h1 className="text-4xl leading-tight font-semibold sm:text-5xl">
                  Welcome, {guestName}
                </h1>
                <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-ember-soft italic">
                  The seal is broken — the storybook is open
                </p>
                <Ornament className="mt-6 text-ember" />
                <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Turn the pages below for the letter, the road to twenty, and the proclamation of
                  the banquet.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="sealed"
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-4"
              >
                <motion.h1
                  className="text-4xl leading-tight font-semibold sm:text-5xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62, duration: 0.8, ease: EASE }}
                >
                  A Sealed Destiny Awaits You
                </motion.h1>
                <motion.p
                  className="mt-2 font-[family-name:var(--font-display)] text-xl text-ember-soft italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.78, duration: 0.8 }}
                >
                  Honouring {invitation.milestone.toLowerCase()} autumns
                </motion.p>

                <Ornament className="mt-6 text-ember" />

                <motion.blockquote
                  className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-muted-foreground italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  "Before we turn the chronicle pages, by what name shall history remember your
                  arrival?"
                </motion.blockquote>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
          >
            <label htmlFor="guest-name" className="sr-only">
              Your name
            </label>
            <div className="flex items-center gap-3 rounded-full border border-border bg-secondary/60 px-5 py-3 transition-colors focus-within:border-ember-soft">
              <Feather className="size-4 shrink-0 text-ember-soft" aria-hidden />
              <input
                id="guest-name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Traveller's name (e.g. Alaa…)"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground italic placeholder:text-muted-foreground/70 focus:outline-none"
              />
            </div>

            <motion.button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-sm bg-ember px-6 py-4 text-primary-foreground"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <WaxSeal broken={unsealed} />
              <span className="eyebrow">
                {unsealed ? "Storybook opened" : "Unseal & enter storybook"}
              </span>
            </motion.button>

            <p className="mt-3 font-[family-name:var(--font-display)] text-sm text-muted-foreground italic">
              Click the wax seal to break the ribbon &amp; open the book
            </p>
          </motion.form>

          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-5 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase sm:flex-row">
            <span>{invitation.folio}</span>
            <span>{invitation.dateLong}</span>
            <span>{invitation.venue}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
