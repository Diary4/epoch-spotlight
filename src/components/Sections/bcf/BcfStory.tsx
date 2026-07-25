import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import TextType from "@/components/TextType";
import CountUp from "@/components/CountUp";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfErbil } from "@/components/Sections/bcf/bcfAssets";
import storyThumb from "@/assets/images/religions/kurds/cover.jpeg";

type BcfStoryProps = {
  lang: BcfLang;
  onBack: () => void;
};

// One "screen" of scroll per chapter, matching the page's 1920px design height.
const PANE_HEIGHT = 1920;

// Warm accent tint per chapter (2-5 share a crafted architectural backdrop —
// no real corridor photography was available yet, so this is a placeholder
// until VIP photography arrives, same as the rest of bcfAssets.ts).
const SECTION_ACCENTS = [
  "transparent",
  "rgba(232,197,106,0.16)",
  "rgba(120,160,190,0.14)",
  "rgba(196,30,58,0.14)",
  "rgba(232,197,106,0.18)",
];

function corridorBackground(accent: string) {
  return [
    `radial-gradient(ellipse 900px 700px at 50% 20%, ${accent}, transparent 65%)`,
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 96px)",
    "linear-gradient(180deg, #17140f 0%, #0b0906 55%, #050403 100%)",
  ].join(", ");
}

export default function BcfStory({ lang, onBack }: BcfStoryProps) {
  const c = bcfCopy[lang];
  const sections = c.storySections;
  const storyLabel =
    c.journeyChapters.find((chapter) => chapter.id === "story")?.title ?? c.journeyChapters[0].title;

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const tickingRef = React.useRef(false);

  const handleScroll = React.useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) {
        const next = Math.min(
          sections.length - 1,
          Math.max(0, Math.round(el.scrollTop / PANE_HEIGHT)),
        );
        setActiveIndex((prev) => (prev === next ? prev : next));
      }
      tickingRef.current = false;
    });
  }, [sections.length]);

  const active = sections[activeIndex];
  const isFoundation = activeIndex === 0;
  const isValues = active.id === "values";

  return (
    <BcfShell showLogo={false} overlayClassName="bg-black/0">
      <div className="relative h-[1920px] min-h-[1920px] w-full overflow-hidden">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-10 top-10 z-30 flex w-fit items-center gap-2 rounded-full bg-black/40 px-5 py-3 text-[22px] text-white/85 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
          {c.back}
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative h-full w-full overflow-y-auto overscroll-contain"
        >
          <div className="relative" style={{ height: sections.length * PANE_HEIGHT }}>
            <div className="sticky top-0 z-10 w-full overflow-hidden" style={{ height: PANE_HEIGHT }}>
              {isFoundation ? (
                <img src={bcfErbil} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: corridorBackground(SECTION_ACCENTS[activeIndex]) }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />

              <div className="absolute left-10 top-10 z-20 flex items-center gap-3">
                <span
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2"
                  style={{ borderColor: BCF.gold }}
                >
                  <img src={storyThumb} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="rounded-full bg-black/50 px-6 py-3 text-[22px] text-white/90 backdrop-blur-sm">
                  {storyLabel}
                </span>
              </div>

              <div
                key={activeIndex}
                className="absolute inset-x-0 bottom-0 animate-fade-in px-14 pb-24"
              >
                <h2 className="flex items-baseline gap-4 text-[64px] font-bold leading-none">
                  <span style={{ color: BCF.gold }}>0</span>
                  <CountUp
                    to={activeIndex + 1}
                    duration={0.9}
                    className="text-[64px] font-bold leading-none text-[#e8c56a]"
                  />
                </h2>

                <div className="mt-4 max-w-[820px] font-sans text-[52px] font-bold leading-[1.1] tracking-[0.01em]">
                  <TextType
                    as="span"
                    text={active.titleGold}
                    typingSpeed={45}
                    loop={false}
                    showCursor={!active.titleWhite}
                    cursorCharacter="|"
                    cursorClassName="text-[#e8c56a]"
                    className="text-[52px] font-bold"
                    textColors={[BCF.gold]}
                  />
                  {active.titleWhite ? (
                    <>
                      {" "}
                      <TextType
                        as="span"
                        text={active.titleWhite}
                        typingSpeed={45}
                        initialDelay={active.titleGold.length * 45 + 120}
                        loop={false}
                        showCursor
                        cursorCharacter="|"
                        cursorClassName="text-white"
                        className="text-[52px] font-bold text-white"
                        textColors={["#ffffff"]}
                      />
                    </>
                  ) : null}
                </div>

                {active.body ? (
                  <p className="mt-8 max-w-[760px] text-[26px] font-light leading-relaxed text-white/85">
                    {active.body}
                  </p>
                ) : null}

                {isValues && active.values ? (
                  <div className="mt-10 flex max-w-[760px] flex-col gap-5">
                    {active.values.map((value, i) => (
                      <div key={value} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                        <span
                          className={`flex items-center gap-3 rounded-full border border-white/15 bg-black/45 px-7 py-4 text-[24px] text-white backdrop-blur-sm ${
                            i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                          }`}
                        >
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: BCF.gold }} />
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {isFoundation ? (
                  <div className="mt-12 flex max-w-[560px] items-center gap-4">
                    <span className="text-[20px] text-white/70">{c.storyTimelineStart}</span>
                    <span className="relative h-px flex-1 bg-white/25">
                      <span
                        className="absolute left-[8%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: BCF.gold, boxShadow: `0 0 14px ${BCF.gold}` }}
                      />
                    </span>
                    <span className="text-[20px] text-white/70">{c.storyTimelineEnd}</span>
                  </div>
                ) : null}
              </div>

              {isFoundation ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-white/70">
                  <span className="text-[18px] tracking-wide">{c.storyScrollHint}</span>
                  <ChevronDown className="h-6 w-6 animate-bounce" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </BcfShell>
  );
}
