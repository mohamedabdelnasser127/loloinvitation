import { useEffect, useState } from "react";

const chapters = [
  { id: "story", label: "The letter" },
  { id: "journey", label: "The journey" },
  { id: "koko", label: "Koko" },
  { id: "scrapbook", label: "The scrapbook" },
  { id: "rsvp", label: "The invitation" },
];

export function ScrollNavigator() {
  const [activeChapter, setActiveChapter] = useState("story");

  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;
    const updateActiveChapter = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      const nearest = sections.reduce((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - viewportCenter);
        const closestDistance = Math.abs(closest.getBoundingClientRect().top - viewportCenter);
        return distance < closestDistance ? section : closest;
      });
      setActiveChapter(nearest.id);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveChapter);
    };

    updateActiveChapter();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="scroll-navigator" aria-label="Invitation chapters">
      <span className="scroll-navigator-line" aria-hidden />
      {chapters.map((chapter) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          aria-label={chapter.label}
          className={activeChapter === chapter.id ? "is-active" : ""}
          onClick={(event) => {
            event.preventDefault();
            document.getElementById(chapter.id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <span aria-hidden />
          <span className="scroll-navigator-label">{chapter.label}</span>
        </a>
      ))}
    </nav>
  );
}
