import { useCallback, useEffect, useState } from "react";
import HeroCharacter from "@/components/HeroCharacter";
import officeBg from "@/assets/office-bg.jpg";

const STORIES = [
  {
    title: "The Great Kurdistan",
    description: "An ancient land of mountains, poets, and resilience.",
  },
  {
    title: "The Silk Road",
    description: "Where empires, ideas, and caravans crossed continents.",
  },
  {
    title: "Mesopotamia",
    description: "The cradle of civilization between two rivers.",
  },
  {
    title: "The Ottoman Era",
    description: "Six centuries that reshaped three continents.",
  },
  {
    title: "The Persian Empire",
    description: "From Cyrus to Darius — an empire of tolerance and reach.",
  },
];

const Index = () => {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const advance = useCallback(() => {
    setInteracted(true);
    setIndex((i) => (i + 1) % STORIES.length);
  }, []);

  useEffect(() => {
    // Set page metadata for SEO
    document.title = "The Great Kurdistan — Historical Characters";
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    meta.setAttribute(
      "content",
      "Explore historical characters and civilizations — from The Great Kurdistan to the Silk Road, Mesopotamia, the Ottoman and Persian Empires.",
    );
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      advance();
    }
  };

  const current = STORIES[index];

  return (
    <main
      role="button"
      tabIndex={0}
      aria-label="Tap to explore the next historical context"
      onClick={advance}
      onKeyDown={onKeyDown}
      className="relative flex min-h-screen w-full cursor-pointer select-none items-center justify-center overflow-hidden outline-none"
      style={{ backgroundColor: "hsl(var(--hero-background))" }}
    >
      {/* Background image */}
      <img
        src={officeBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-sm scale-105"
      />
      {/* Dark overlay for readability */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--hero-overlay) / 0.55), hsl(var(--hero-overlay) / 0.75))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <HeroCharacter className="mb-8 h-40 w-auto md:mb-12 md:h-56" />

        {/* Keyed wrapper so text remounts and re-animates on each change */}
        <div key={index} className="animate-fade-in">
          <h1
            className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            style={{ color: "hsl(var(--hero-foreground))" }}
          >
            {current.title}
          </h1>
          <p
            className="mt-5 text-base font-light tracking-wide md:mt-7 md:text-lg"
            style={{ color: "hsl(var(--hero-muted))" }}
          >
            {current.description}
          </p>
        </div>
      </div>

      {/* Hint */}
      <div
        className={`pointer-events-none absolute bottom-8 left-0 right-0 z-10 text-center text-xs uppercase tracking-[0.3em] transition-opacity duration-500 md:text-sm ${
          interacted ? "opacity-0" : "opacity-70"
        }`}
        style={{ color: "hsl(var(--hero-muted))" }}
      >
        Tap anywhere to explore
      </div>
    </main>
  );
};

export default Index;
