import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Hero } from "@/components/chronicle/Hero";
import { Story } from "@/components/chronicle/Story";
import { Timeline } from "@/components/chronicle/Timeline";
import { Scrapbook } from "@/components/chronicle/Scrapbook";
import { Proclamation } from "@/components/chronicle/Proclamation";
import { Footer } from "@/components/chronicle/Footer";
import { CakeCursor } from "@/components/chronicle/CakeCursor";
import { SectionTransitions } from "@/components/chronicle/SectionTransitions";
import { ScrollNavigator } from "@/components/chronicle/ScrollNavigator";
import { SecretMessage } from "@/components/chronicle/SecretMessage";
import { AutoScroll } from "@/components/chronicle/AutoScroll";
import { SoundControl } from "@/components/chronicle/SoundControl";
import { ChocolateClickSound } from "@/components/chronicle/ChocolateClickSound";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOLO INVITATION" },
      {
        name: "description",
        content:
          "An autumn chronicle marking twenty years: the letter, the road to twenty, the scrapbook, and the banquet proclamation. Kindly reply.",
      },
      { property: "og:title", content: "LOLO INVITATION" },
      {
        property: "og:description",
        content: "Twenty years of light and love, gathered into one evening. Kindly reply.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // The name entered in the hero personalises the invitation below.
  const [guestName, setGuestName] = useState("");

  return (
    <>
      <CakeCursor />
      <SectionTransitions />
      <ScrollNavigator />
      <SecretMessage />
      <AutoScroll />
      <SoundControl />
      <ChocolateClickSound />
      <main className="bg-background text-foreground">
        <Hero guestName={guestName} onUnseal={setGuestName} />
        <Story />
        <Timeline />
        <Scrapbook />
        <Proclamation guestName={guestName} />
        <Footer />
      </main>
    </>
  );
}
