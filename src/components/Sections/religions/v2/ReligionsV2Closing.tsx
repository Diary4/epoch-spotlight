import React from "react";
import gsap from "gsap";
import type { ReligionsPageContent, SectionCard } from "@/components/Sections/religions/religionsContent";

type ReligionsV2ClosingProps = {
  content: ReligionsPageContent;
  cards: SectionCard[];
  onReturnToHub: () => void;
  onOpenClosingChapter: () => void;
};

export default function ReligionsV2Closing({
  content,
  cards,
  onReturnToHub,
  onOpenClosingChapter,
}: ReligionsV2ClosingProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-rv2-close]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.1, ease: "power3.out" },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="One living homeland"
      className="relative flex min-h-full w-full flex-col overflow-hidden bg-[#faf8f5] px-16 pb-14 pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(185,130,34,0.12),transparent_55%)]"
      />

      <header data-rv2-close="true" className="relative z-10 mx-auto max-w-[860px] text-center">
        <p className="font-serif text-[13px] font-semibold uppercase tracking-[0.28em] text-[#b98222]">
          {content.closingEyebrow}
        </p>
        <div className="mx-auto mt-7 flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-[#c99a55]/70" />
          <span className="text-[18px] text-[#b98222]">✥</span>
          <span className="h-px w-20 bg-[#c99a55]/70" />
        </div>
        <h2 className="mt-7 font-serif text-[68px] font-normal leading-[0.95] text-[#2f1f12]">
          {content.closingTitle}
          <br />
          <em className="text-[#b98222] not-italic">{content.closingTitleEmphasis}</em>
        </h2>
        <blockquote className="mx-auto mt-8 max-w-[640px] font-serif text-[24px] leading-relaxed text-[#6a4a25]">
          {content.closingQuote.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>
      </header>

      <div
        data-rv2-close="true"
        className="relative z-10 mx-auto mt-14 flex w-full max-w-[1100px] gap-3"
      >
        {cards.slice(0, 6).map((card, index) => (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-[20px] border border-[#d7b77e]/35 ${
              index === 2 || index === 3 ? "h-[240px] flex-[1.25]" : "h-[200px] flex-1 self-end"
            }`}
          >
            <img src={card.image} alt="" className="h-full w-full object-cover saturate-[0.88]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5]/70 to-transparent" />
          </div>
        ))}
      </div>

      <div
        data-rv2-close="true"
        className="relative z-10 mx-auto mt-12 flex flex-col items-center text-center"
      >
        <p className="font-sans text-[13px] font-bold uppercase tracking-[0.22em] text-[#b98222]">
          {content.closingCore}
        </p>
        <p className="mt-2 font-serif text-[18px] text-[#8a6a45]">{content.closingCoreHint}</p>
      </div>

      <div data-rv2-close="true" className="relative z-10 mt-auto flex flex-col items-center gap-4 pt-12">
        <button
          type="button"
          onClick={onOpenClosingChapter}
          className="flex min-h-[64px] w-full max-w-[480px] items-center justify-center rounded-full border border-[#d7b77e] bg-[#b98222] px-8 font-serif text-[20px] uppercase tracking-[0.1em] text-white transition active:scale-[0.985]"
        >
          {content.cards[7]?.title} · {content.openLabel}
        </button>
        <button
          type="button"
          onClick={onReturnToHub}
          className="flex min-h-[64px] w-full max-w-[560px] flex-col items-center justify-center rounded-full border border-[#d7b77e]/55 bg-white px-8 py-3 text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.08)] transition active:scale-[0.985]"
        >
          <span className="font-serif text-[20px]">{content.returnToHubHint}</span>
        </button>
      </div>
    </section>
  );
}
