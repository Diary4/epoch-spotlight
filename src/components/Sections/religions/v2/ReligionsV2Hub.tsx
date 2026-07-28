import React from "react";
import gsap from "gsap";
import type { ReligionsPageContent, SectionCard } from "@/components/Sections/religions/religionsContent";

type ReligionsV2HubProps = {
  content: ReligionsPageContent;
  cards: SectionCard[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onOpenChapter: (index: number) => void;
  onBeginJourney: () => void;
};

export default function ReligionsV2Hub({
  content,
  cards,
  activeIndex,
  onActiveIndexChange,
  onOpenChapter,
  onBeginJourney,
}: ReligionsV2HubProps) {
  const activeCard = cards[activeIndex] ?? cards[0];
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const previewRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-rv2-hub]",
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, stagger: 0.16, duration: 1.8, ease: "power2.out" },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  React.useLayoutEffect(() => {
    if (!previewRef.current) return;
    const img = previewRef.current.querySelector("img");
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(img, { scale: 1, autoAlpha: 1 });
      return;
    }
    gsap.fromTo(
      img,
      { scale: 1.06, autoAlpha: 0.55 },
      { scale: 1, autoAlpha: 1, duration: 1.45, ease: "power2.out", overwrite: "auto" },
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      aria-label="Choose a chapter"
      className="relative flex min-h-full w-full flex-col overflow-hidden bg-[#faf8f5] px-12 pb-10 pt-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(185,130,34,0.1),transparent_50%)]"
      />

      <header data-rv2-hub="true" className="relative z-10 text-center">
        <p className="font-serif text-[13px] font-semibold uppercase tracking-[0.28em] text-[#b98222]">
          {content.hubEyebrow}
        </p>
        <h2 className="mt-3 font-serif text-[44px] font-normal leading-[1.05] text-[#2f1f12]">
          {content.hubTitle}{" "}
          <em className="text-[#b98222] not-italic">{content.hubTitleEmphasis}</em>
        </h2>
      </header>

      {/* Featured chapter — fills portrait width */}
      <div
        ref={previewRef}
        data-rv2-hub="true"
        className="relative z-10 mt-8 overflow-hidden rounded-[28px] border border-[#d7b77e]/55 bg-white shadow-[0_18px_42px_rgba(75,45,12,0.12)]"
      >
        <div className="relative h-[480px] w-full overflow-hidden">
          <img
            key={activeCard.id}
            src={activeCard.image}
            alt=""
            decoding="async"
            className="h-full w-full transform-gpu object-cover will-change-[transform,opacity]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f160e]/85 via-[#1f160e]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-9 text-white">
            <div className="min-w-0">
              <p className="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-[#e7cc8a]">
                {activeCard.number} · {activeCard.line}
              </p>
              <h3 className="mt-2 font-serif text-[48px] font-normal leading-[1.02]">
                {activeCard.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenChapter(activeIndex)}
              className="shrink-0 rounded-full border border-[#e7cc8a]/60 bg-[#b98222] px-8 py-4 font-serif text-[18px] uppercase tracking-[0.12em] text-white transition active:scale-[0.98]"
            >
              {content.openLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Chapter grid — uses remaining height */}
      <div
        data-rv2-hub="true"
        className="relative z-10 mt-7 grid flex-1 grid-cols-4 content-start gap-4"
      >
        {cards.map((card, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={isActive}
              onFocus={() => onActiveIndexChange(index)}
              onPointerEnter={() => onActiveIndexChange(index)}
              onClick={() => onOpenChapter(index)}
              className={`group flex min-h-[250px] transform-gpu flex-col overflow-hidden rounded-[22px] border text-start transition-[transform,border-color,background-color,box-shadow] duration-300 ease-smooth-out will-change-transform active:scale-[0.985] ${
                isActive
                  ? "-translate-y-1 border-[#b98222] bg-white shadow-[0_14px_32px_rgba(75,45,12,0.14)]"
                  : "border-[#d7b77e]/40 bg-white/70 "
              }`}
            >
              <div className="relative h-[140px] w-full overflow-hidden">
                <img
                  src={card.image}
                  alt=""
                  decoding="async"
                  className={`h-full w-full transform-gpu object-cover transition-transform duration-600 ease-smooth-out will-change-transform ${
                    isActive ? "scale-[1.04]" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/35 to-transparent" />
                <span className="absolute left-3 top-3 font-serif text-[18px] text-[#b98222]">
                  {card.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-1">
                <span className="font-serif text-[20px] leading-tight text-[#2f1f12]">{card.title}</span>
                <span className="mt-1.5 font-sans text-[12px] leading-snug text-[#8a6a45]">
                  {card.line}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        data-rv2-hub="true"
        type="button"
        onClick={onBeginJourney}
        className="relative z-10 mx-auto mt-8 flex min-h-[72px] w-full max-w-[640px] flex-col items-center justify-center rounded-full border border-[#d7b77e]/55 bg-white px-8 py-4 text-[#3f2b17] shadow-[0_12px_28px_rgba(75,45,12,0.1)] transition-transform duration-200 active:scale-[0.985]"
      >
        <span className="font-serif text-[20px] leading-none">
          <span className="mr-3 text-[#b98222]">▶</span>
          {content.guidedJourney}
        </span>
        <small className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-[#8a6a45]">
          {content.guidedJourneyHint}
        </small>
      </button>
    </section>
  );
}
