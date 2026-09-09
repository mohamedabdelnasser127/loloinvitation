import scrap1 from "@/assets/scrap-1.jpg";
import scrap2 from "@/assets/scrap-2.jpg";
import scrap3 from "@/assets/scrap-3.jpg";
import scrap5 from "@/assets/scrap-5.jpg";
import friends1 from "@/assets/meFriends/meFriends-1.jpeg";
import friends2 from "@/assets/meFriends/meFriends-2.jpeg";
import aseel1 from "@/assets/with aseel/meAseel-2.jpeg";
import aseel2 from "@/assets/with aseel/meAseel-4.jpeg";
import aseel3 from "@/assets/with aseel/meAseel-5.jpeg";
import baby1 from "@/assets/meBaby/meBaby-1.jpeg";
import khwla1 from "@/assets/withKhwla/meKhwla-1.jpeg";
import khwla2 from "@/assets/withKhwla/meKhwla-2.jpeg";
import khwla3 from "@/assets/withKhwla/meKhwla-3.jpeg";
import khwla4 from "@/assets/withKhwla/meKhwla-4.jpeg";
import aya1 from "@/assets/meAya/WhatsApp Image 2026-09-07 at 10.56.11 PM.jpeg";

export const photoTransforms = new Map<string, string>();

export const photoCardTransforms = new Map<string, string>();

/**
 * All copy and event details for the invitation live here so they can be
 * edited in one place without touching layout code.
 */

export const invitation = {
  guestOfHonour: "Alaa",
  milestone: "Twentieth Birthday",
  dateLong: "Sunday, the thirteenth of September",
  dateNumeric: "13 September 2026",
  year: "Two Thousand Twenty-Six",
  timeLong: "Four o'clock in the afternoon",
  timeShort: "4:00 PM",
  venue: "My home",
  address: "A warm place waiting for you",
  dress: "Light colors only — soft neutrals, pastels, and elegant whites",
  rsvpBy: "the twelfth of September",
  folio: "Folio No. 020",
} as const;

export const timeline = [
  {
    year: "Chapter One",
    title: "Me as a Baby",
    body: "The earliest chapter of my story, filled with innocence, warmth, and treasured beginnings.",
    image: baby1,
    collection: [baby1],
    imagePosition: "center 48%",
  },
  {
    year: "Chapter Two",
    title: "Me with Aseel and Eman",
    body: "A collection of meaningful moments, shared laughter, and memories created together with Aseel and Eman.",
    image: aseel2,
    collection: [aseel2, aseel3],
    imagePosition: "center 28%",
    imageAspect: "aspect-[16/9]",
  },
  {
    year: "Chapter Three",
    title: "Me with Khwla",
    body: "A collection of memorable moments, heartfelt laughter, and a friendship to cherish.",
    image: khwla1,
    collection: [khwla1, khwla2, khwla3, khwla4],
    imagePosition: "center 28%",
  },
  {
    year: "Chapter Four",
    title: "Me with Aya",
    body: "A collection of warm moments, shared smiles, and memories made with Aya.",
    image: aya1,
    collection: [aya1],
    imagePosition: "center 28%",
  },
  {
    year: "Chapter Five",
    title: "Me with My Friends",
    body: "The friendships, joyful moments, and shared adventures that continue to make life special.",
    image: friends1,
    collection: [friends1, friends2],
    imagePosition: "center 28%",
  },
] as const;

export const scrapbook = [
  {
    src: scrap1,
    caption: "A Table Full of Treats",
    note: "Sweet bites, a birthday cake, and a table made for sharing stories.",
  },
  {
    src: scrap5,
    caption: "Karaoke to Sing",
    note: "karaoke to sing your heart out.",
  },
  {
    src: scrap3,
    caption: "Memories to Keep",
    note: "A photo corner, little surprises, and beautiful moments to take home with you.",
  },

] as const;
