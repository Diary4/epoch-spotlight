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
import { bcfStoryBg } from "@/components/Sections/bcf/bcfAssets";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";

type BcfStoryProps = {
  lang: BcfLang;
  onBack: () => void;
};

const PANE_HEIGHT = 1920;

/**
 * The opener every chapter shares: the title typing itself in, and the line
 * beneath it.
 */
function BcfChapterHead({
  titleGold,
  titleWhite,
  body,
}: {
  titleGold: string;
  titleWhite?: string;
  body?: string;
}) {
  const goldDelayChars = Array.from(titleGold).length;

  return (
    <>
      <motion.div
        variants={bcfRise}
        className="max-w-[1000px] font-sans text-[80px] font-bold leading-[1.05]"
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
 * Our Story — foundation, institutional timeline, mission, vision,
 * philosophy, then five principle pills on a single pane.
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
  const isFoundation = active.id === "foundation";
  const isValues = active.id === "values";
  const isTimeline = active.id === "timeline";

  return (
    <BcfShell showLogo={false} overlayClassName="bg-black/0">
      <div className="relative h-[1920px] min-h-[1920px] w-full overflow-hidden">
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={bcfStoryBg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
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
            <BcfChapterPill title={storyLabel} />
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
              className={`absolute inset-x-0 z-20 px-14 ${
                isTimeline || isValues ? "top-[220px]" : "top-[300px]"
              }`}
              variants={bcfStagger(0.08, 0.06)}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -24, transition: { duration: 0.28 } }}
            >
              <div className="mx-auto w-full max-w-[1080px]">
                <BcfChapterHead
                  titleGold={active.titleGold}
                  titleWhite={active.titleWhite}
                  body={active.body}
                />

                {isValues ? (
                  <motion.div
                    variants={bcfStagger(0.05, 0.08)}
                    className="mt-10 flex max-h-[1180px] max-w-[980px] flex-col gap-5 overflow-y-auto overscroll-contain pe-4"
                  >
                    {c.storyValues.map((value) => (
                      <motion.div
                        key={value.id}
                        variants={bcfRise}
                        className="rounded-[28px] border border-white/15 bg-black/45 px-8 py-6 backdrop-blur-sm"
                      >
                        <p
                          className="text-[32px] font-semibold leading-tight"
                          style={{ color: BCF.gold }}
                        >
                          {value.title}
                        </p>
                        <p
                          className={`mt-3 text-[26px] text-[#fdeed4] ${
                            lang === "en" ? "leading-snug" : "leading-[1.7]"
                          }`}
                        >
                          {value.body}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}

                {isTimeline ? (
                  <motion.div
                    variants={bcfStagger(0.05, 0.1)}
                    className="mt-12 flex max-w-[980px] flex-col"
                  >
                    {c.storyMilestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        variants={bcfRise}
                        className="flex items-start gap-7 border-white/12 py-5"
                        style={{
                          borderBottomWidth:
                            index === c.storyMilestones.length - 1 ? 0 : 1,
                        }}
                      >
                        <span
                          className="w-[210px] shrink-0 text-[36px] font-semibold leading-tight"
                          style={{ color: BCF.gold }}
                        >
                          {bcfDigits(milestone.year, lang)}
                        </span>
                        <span
                          className={`min-w-0 flex-1 text-[30px] text-[#fdeed4] ${
                            lang === "en" ? "leading-snug" : "leading-[1.7]"
                          }`}
                        >
                          {milestone.body}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}

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
