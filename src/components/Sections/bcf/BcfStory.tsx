import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfCorridor, bcfErbil } from "@/components/Sections/bcf/bcfAssets";
import storyThumb from "@/assets/images/religions/kurds/cover.webp";

type BcfStoryProps = {
  lang: BcfLang;
  onBack: () => void;
};

const PANE_HEIGHT = 1920;

function chapterLabel(index: number) {
  return String(index + 1).padStart(2, "0");
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
  const label = chapterLabel(activeIndex);
  const showCorridor = activeIndex > 0;

  return (
    <BcfShell showLogo={false} overlayClassName="bg-black/0">
      <div className="relative h-[1920px] min-h-[1920px] w-full overflow-hidden">
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={bcfErbil}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                showCorridor ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={bcfCorridor}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                showCorridor ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(4, 9, 12) 0%, rgba(4, 9, 12, 0) 55%), linear-gradient(0deg, rgb(4, 9, 12) 8%, rgba(4, 9, 12, 0) 50%), linear-gradient(180deg, rgb(4, 9, 12) 20%, rgba(29, 24, 22, 0) 55%)",
            }}
          />

          <div className="absolute inset-x-0 top-10 z-20 px-14">
            <BcfChapterPill title={storyLabel} thumb={storyThumb} />
          </div>

          <div
            key={activeIndex}
            className="absolute inset-x-0 top-[300px] z-20 animate-fade-in px-14"
          >
            <div className="mx-auto w-full max-w-[1080px]">
              <p dir="ltr" className="text-[80px] font-bold leading-none tracking-wide">
                <span className="text-[#fbf4e4]">{label[0]}</span>
                <span style={{ color: BCF.gold }}>{label[1]}</span>
              </p>

              <div className="mt-8 max-w-[1000px] font-sans text-[80px] font-bold leading-[1.05]">
                <TextType
                  as="span"
                  text={active.titleGold}
                  typingSpeed={45}
                  loop={false}
                  showCursor={!active.titleWhite}
                  cursorCharacter="|"
                  cursorClassName="text-[#fbc158]"
                  className="text-[80px] font-bold"
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
                      cursorClassName="text-[#fbf4e4]"
                      className="text-[80px] font-bold text-[#fbf4e4]"
                      textColors={["#fbf4e4"]}
                    />
                  </>
                ) : null}
              </div>

              {active.body ? (
                <p className="mt-8 max-w-[920px] text-[40px] font-medium leading-snug text-[#fcdfaa]">
                  {active.body}
                </p>
              ) : null}

              {isValues && active.values ? (
                <div className="relative mx-auto mt-14 h-[800px] w-full max-w-[900px]">
                  {active.values.map((value, i) => {
                    const layouts = [
                      "left-0 top-0",
                      "right-0 top-[160px]",
                      "left-0 top-[320px]",
                      "right-8 top-[480px]",
                      "left-0 top-[640px]",
                    ];
                    const dotEnd = i % 2 === 1;
                    return (
                      <span
                        key={value}
                        className={`absolute flex items-center gap-4 bg-black/25 px-8 py-5 text-[40px] font-medium text-[#fbf4e4] backdrop-blur-sm ${layouts[i]} ${
                          dotEnd
                            ? "flex-row-reverse rounded-bl-[42px] rounded-tr-[42px]"
                            : i === 4
                              ? "rounded-full"
                              : "rounded-br-[42px] rounded-tl-[42px]"
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded-full"
                          style={{ backgroundColor: BCF.goldBright }}
                        />
                        {value}
                      </span>
                    );
                  })}
                </div>
              ) : null}

              {isFoundation ? (
                <div className="mt-14 flex w-full max-w-[920px] flex-col gap-3">
                  <div className="flex items-center justify-between text-[40px] font-medium text-white">
                    <span>{c.storyTimelineStart}</span>
                    <span>{c.storyTimelineEnd}</span>
                  </div>
                  <span className="relative h-1 w-full bg-white/25">
                    <span
                      className="absolute left-[2%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: BCF.gold, boxShadow: `0 0 16px ${BCF.gold}` }}
                    />
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {isFoundation ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex flex-col items-center gap-3 text-white">
              <span className="text-[42px] font-medium tracking-wide">{c.storyScrollHint}</span>
              <ChevronDown className="h-12 w-12 animate-bounce" />
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="absolute right-8 top-8 z-50 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute inset-0 z-40 overflow-y-auto overscroll-contain opacity-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div style={{ height: sections.length * PANE_HEIGHT }} />
        </div>
      </div>
    </BcfShell>
  );
}
