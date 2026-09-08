import { motion } from "motion/react";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Eyebrow, Ornament, SectionHeading } from "./Ornament";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { invitation } from "./content";

const details = [
  {
    icon: CalendarDays,
    label: "The Date",
    lines: [invitation.dateNumeric, "A Sunday soirée beneath the September sky"],
  },
  {
    icon: Clock,
    label: "The Hour",
    lines: [invitation.timeShort, "An afternoon of candlelight, music, and wonder"],
  },
  {
    icon: MapPin,
    label: "The Place",
    lines: [invitation.venue, invitation.address],
  },
] as const;

/** The personal invitation and event details. */
export function Proclamation({ guestName }: { guestName: string }) {
  const invitedName = guestName.trim() || "Guest";

  return (
    <section id="rsvp" className="proclamation-section relative bg-secondary/50 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="paper-card px-6 py-12 sm:px-12">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow>Personal Invitation</Eyebrow>
            <SectionHeading
              title="The Banquet Proclamation"
              subtitle={`A special invitation for ${invitedName}`}
            />
            <Ornament className="text-ember" />
          </div>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {details.map(({ icon: Icon, label, lines }) => (
              <StaggerItem key={label}>
                <motion.div
                  className="proclamation-card h-full p-6 text-center"
                  whileHover={{ y: -6, scale: 1.012, rotateX: 3 }}
                  whileTap={{ scale: 0.985, y: -2, rotateX: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Icon className="mx-auto size-5 text-ember" aria-hidden />
                  <p className="eyebrow mt-3 text-muted-foreground">{label}</p>
                  {lines.map((line) => (
                    <p
                      key={line}
                      className="mt-2 font-[family-name:var(--font-display)] text-lg leading-snug"
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="proclamation-dress mt-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-ember">
            Dress code: Light colors
          </p>

          <div className="mt-10 border-t border-border pt-10 text-center">
            <p className="eyebrow text-ember">Dear {invitedName}</p>
            <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">You are warmly invited</h3>
            <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-display)] text-xl leading-relaxed text-muted-foreground italic">
              to celebrate her twentieth birthday with candles, music, and the people who love her
              most.
            </p>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Come share this beautiful evening with Alaa at the long table. Your presence would
              make her celebration complete.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}