import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import {
  bcfCopy,
  type BcfLang,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfCorridor, bcfErbil, bcfJourneyStory } from "@/components/Sections/bcf/bcfAssets";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";

type BcfStoryProps = {
  lang: BcfLang;
  onBack: () => void;
};

const PANE_HEIGHT = 1920;

function chapterLabel(index: number, lang: BcfLang) {
  return bcfDigits(String(index + 1).padStart(2, "0"), lang);
}

/**
 * The opener every chapter shares: the number, the title typing itself in, and
 * the line beneath it.
 */
function BcfChapterHead({
  label,
  titleGold,
  titleWhite,
  body,
}: {
  label: string;
  titleGold: string;
  titleWhite?: string;
  body?: string;
}) {
  const goldDelayChars = Array.from(titleGold).length;

  return (
    <>
      <motion.p
        variants={bcfRise}
        dir="ltr"
        className="text-[80px] font-bold leading-none tracking-wide"
      >
        <span className="text-[#fbf4e4]">{label[0]}</span>
        <span style={{ color: BCF.gold }}>{label[1]}</span>
      </motion.p>

      <motion.div
        variants={bcfRise}
        className="mt-8 max-w-[1000px] font-sans text-[80px] font-bold leading-[1.05]"
      >
        <TextType
          key={`gold-${titleGold}`}
          as="span"
          text={titleGold}
          typingSpeed={45}
          loop={false}
          showCursor={!titleWhite}
          cursorCharacter="|"
          cursorClassName="text-[#fbc158]"
          className="text-[80px] font-bold"
          textColors={[BCF.gold]}
        />
        {titleWhite ? (
          <>
            {" "}
            <TextType
              key={`white-${titleWhite}`}
              as="span"
              text={titleWhite}
              typingSpeed={45}
              initialDelay={goldDelayChars * 45 + 120}
              loop={false}
              showCursor
              cursorCharacter="|"
              cursorClassName="text-[#fbf4e4]"
              className="text-[80px] font-bold text-[#fbf4e4]"
              textColors={["#fbf4e4"]}
            />
          </>
        ) : null}
      </motion.div>

      {body ? (
        <motion.p
          variants={bcfRise}
          className="mt-8 max-w-[920px] text-[40px] font-medium leading-snug text-[#fcdfaa]"
        >
          {body}
        </motion.p>
      ) : null}
    </>
  );
}

/**
 * Our Story — foundation, mission, vision, philosophy.
 *
 * The Values long-read (six principles + presidency plates) is parked for now;
 * the chapter rail only walks the four panes above.
 */
export default function BcfStory({ lang, onBack }: BcfStoryProps) {
  const c = bcfCopy[lang];
  const sections = c.storySections;
  const storyLabel =
    c.journeyChapters.find((chapter) => chapter.id === "story")?.title ??
    c.journeyChapters[0].title;

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const tickingRef = React.useRef(false);

  const totalHeight = sections.length * PANE_HEIGHT;

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
  const label = chapterLabel(activeIndex, lang);
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

          <motion.div
            className="absolute inset-x-0 top-10 z-20 px-14"
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: BCF_EASE }}
          >
            <BcfChapterPill title={storyLabel} thumb={bcfJourneyStory} />
          </motion.div>

          <div className="absolute end-12 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-4">
            {sections.map((section, index) => (
              <span
                key={section.id}
                className="rounded-full transition-all duration-500 ease-smooth-out"
                style={{
                  width: index === activeIndex ? 5 : 3,
                  height: index === activeIndex ? 56 : 22,
                  backgroundColor:
                    index === activeIndex ? BCF.goldBright : "rgba(255,255,255,0.28)",
                  boxShadow:
                    index === activeIndex ? `0 0 16px ${BCF.gold}` : "none",
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${activeIndex}`}
              className="absolute inset-x-0 top-[300px] z-20 px-14"
              variants={bcfStagger(0.08, 0.06)}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -24, transition: { duration: 0.28 } }}
            >
              <div className="mx-auto w-full max-w-[1080px]">
                <BcfChapterHead
                  label={label}
                  titleGold={active.titleGold}
                  titleWhite={active.titleWhite}
                  body={active.body}
                />

                {isFoundation ? (
                  <motion.div
                    variants={bcfRise}
                    className="mt-14 flex w-full max-w-[920px] flex-col gap-3"
                  >
                    <div className="flex items-center justify-between text-[40px] font-medium text-white">
                      <span>{bcfDigits(c.storyTimelineStart, lang)}</span>
                      <span>{bcfDigits(c.storyTimelineEnd, lang)}</span>
                    </div>
                    <span className="relative h-1 w-full bg-white/25">
                      <motion.span
                        className="absolute left-0 top-0 h-full origin-left"
                        style={{ backgroundColor: `${BCF.gold}88` }}
                        initial={{ width: "2%" }}
                        animate={{ width: "2%" }}
                      />
                      <span
                        className="absolute left-[2%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          backgroundColor: BCF.gold,
                          boxShadow: `0 0 16px ${BCF.gold}`,
                        }}
                      />
                    </span>
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {isFoundation ? (
              <motion.div
                className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex flex-col items-center gap-3 text-white"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.5, delay: 0.8, ease: BCF_EASE }}
              >
                <span className="text-[42px] font-medium tracking-wide">
                  {c.storyScrollHint}
                </span>
                <ChevronDown className="h-12 w-12 animate-bounce" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <BcfBackButton onClick={onBack} label={c.back} className="z-50" />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute inset-0 z-40 overflow-y-auto overscroll-contain opacity-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div style={{ height: totalHeight }} />
        </div>
      </div>
    </BcfShell>
  );
}
