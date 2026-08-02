import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { ChevronDown, Quote } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import {
  bcfCopy,
  type BcfLang,
  type StorySectionId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE, bcfRise, bcfStagger } from "@/components/Sections/bcf/bcfMotion";
import { bcfCorridor, bcfErbil } from "@/components/Sections/bcf/bcfAssets";
import storyThumb from "@/assets/images/religions/kurds/cover.webp";
// Placeholders until the official presidential photography arrives.
import presidentA from "@/assets/images/PrimeMinistir/masrur-barzani.webp";
import presidentB from "@/assets/images/PrimeMinistir/pm.webp";
import presidentC from "@/assets/images/religions/coexistence/masoud-barzani.webp";

type BcfStoryProps = {
  lang: BcfLang;
  onBack: () => void;
};

const PANE_HEIGHT = 1920;

/**
 * Most chapters are one screen of scroll. Values is a long read — a title, six
 * values and three portraits — so it is given extra scroll length, and the
 * column inside it travels with the surplus instead of cross-fading.
 */
const SECTION_PANES: Partial<Record<StorySectionId, number>> = { values: 3 };

const PRESIDENT_PLATES = [presidentA, presidentB, presidentC];

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

  /** Pane count and cumulative start pane for every section. */
  const { panes, starts, totalPanes } = React.useMemo(() => {
    const p = sections.map((s) => SECTION_PANES[s.id] ?? 1);
    const st: number[] = [];
    let running = 0;
    for (const count of p) {
      st.push(running);
      running += count;
    }
    return { panes: p, starts: st, totalPanes: running };
  }, [sections]);

  /**
   * Values-column travel, kept off React state: it changes every frame while
   * the visitor scrolls, and re-rendering the whole scene at 60fps would undo
   * the smoothness the long column is there to provide.
   */
  const valuesProgress = useMotionValue(0);
  const valuesTravelRef = React.useRef(0);
  const valuesY = useTransform(
    valuesProgress,
    (p) => -p * valuesTravelRef.current,
  );
  const [valuesStarted, setValuesStarted] = React.useState(false);

  const handleScroll = React.useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) {
        const top = el.scrollTop;
        let next = 0;
        for (let i = 0; i < starts.length; i += 1) {
          if (top >= starts[i] * PANE_HEIGHT) next = i;
        }
        setActiveIndex((prev) => (prev === next ? prev : next));

        const local = top - starts[next] * PANE_HEIGHT;
        const range = (panes[next] - 1) * PANE_HEIGHT;
        const p = range > 0 ? Math.min(1, Math.max(0, local / range)) : 0;
        valuesProgress.set(p);
        setValuesStarted(p > 0.02);
      }
      tickingRef.current = false;
    });
  }, [panes, starts, valuesProgress]);

  /** Measure the column so the travel is exact in every language. */
  const columnRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const node = columnRef.current;
    if (!node) return;
    const measure = () => {
      valuesTravelRef.current = Math.max(0, node.scrollHeight - PANE_HEIGHT);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [lang, activeIndex]);

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

          <motion.div
            className="absolute inset-x-0 top-10 z-20 px-14"
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: BCF_EASE }}
          >
            <BcfChapterPill title={storyLabel} thumb={storyThumb} />
          </motion.div>

          {/* Chapter rail — a scroll story with no position marker leaves the
              visitor unsure whether anything is left below. */}
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

          {/* Values reads as a chapter, not a pane: the column travels with the
              scroll instead of cross-fading, so the six values and the three
              portraits arrive under one continuous gesture. */}
          {isValues ? (
            <div className="absolute inset-0 z-20 overflow-hidden">
              <motion.div style={{ y: valuesY }} className="will-change-transform">
                <div ref={columnRef} className="px-14 pb-[240px] pt-[280px]">
                  <div className="mx-auto w-full max-w-[900px]">
                    <p
                      dir="ltr"
                      className="text-[80px] font-bold leading-none tracking-wide"
                    >
                      <span className="text-[#fbf4e4]">{label[0]}</span>
                      <span style={{ color: BCF.gold }}>{label[1]}</span>
                    </p>

                    <h2 className="mt-8 font-sans text-[80px] font-bold leading-[1.05]">
                      <span style={{ color: BCF.gold }}>{active.titleGold}</span>{" "}
                      <span className="text-[#fbf4e4]">{active.titleWhite}</span>
                    </h2>

                    <span
                      className="mt-10 block h-px w-[420px] max-w-full rtl:scale-x-[-1]"
                      style={{
                        background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
                      }}
                    />

                    <p className="mt-10 text-[40px] font-medium leading-snug text-[#fcdfaa]">
                      {c.storyValuesIntro}
                    </p>

                    {c.storyValues.map((value, index) => (
                      <React.Fragment key={value.id}>
                        <div className="mt-16 border-t border-white/12 pt-10">
                          <span
                            dir="ltr"
                            className="text-[28px] font-semibold tabular-nums"
                            style={{ color: `${BCF.gold}b3` }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3
                            className="mt-4 text-[52px] font-semibold leading-tight"
                            style={{ color: BCF.gold }}
                          >
                            {value.title}
                          </h3>
                          <p className="mt-5 text-[34px] leading-relaxed text-white/82">
                            {value.body}
                          </p>
                        </div>

                        {/* A portrait after every second value, the way the
                            chapter breathes between blocks of reading. */}
                        {index % 2 === 1 ? (
                          <figure className="mt-16">
                            <div className="overflow-hidden rounded-[32px] border border-[#fbc158]/25">
                              <img
                                src={PRESIDENT_PLATES[(index - 1) / 2]}
                                alt=""
                                decoding="async"
                                className="h-[620px] w-full object-cover"
                              />
                            </div>
                            <figcaption className="mt-5 text-[26px] leading-snug text-white/55">
                              {c.storyValuesCaptions[(index - 1) / 2]}
                            </figcaption>
                          </figure>
                        ) : null}
                      </React.Fragment>
                    ))}

                    <blockquote className="mt-20 flex flex-col items-start gap-6">
                      <Quote
                        className="h-14 w-14 rtl:scale-x-[-1]"
                        style={{ color: `${BCF.gold}80` }}
                        aria-hidden="true"
                      />
                      <p className="text-[46px] font-semibold italic leading-snug text-[#fbf4e4]">
                        {c.quote}
                      </p>
                      <footer className="text-[30px]" style={{ color: BCF.gold }}>
                        {c.quoteAttr}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </motion.div>

              {/* Bottom fade, so text leaving the frame dissolves into the
                  photograph rather than being sliced by the edge. */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(4,9,12,0) 0%, rgb(4,9,12) 88%)",
                }}
              />

              <AnimatePresence>
                {!valuesStarted ? (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center gap-3 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: BCF_EASE }}
                  >
                    <span className="text-[34px] font-medium tracking-wide">
                      {c.storyScrollHint}
                    </span>
                    <ChevronDown className="h-10 w-10 animate-bounce" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-x-0 top-[300px] z-20 px-14"
              variants={bcfStagger(0.08, 0.06)}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -24, transition: { duration: 0.28 } }}
            >
              <div className="mx-auto w-full max-w-[1080px]">
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
                </motion.div>

                {active.body ? (
                  <motion.p
                    variants={bcfRise}
                    className="mt-8 max-w-[920px] text-[40px] font-medium leading-snug text-[#fcdfaa]"
                  >
                    {active.body}
                  </motion.p>
                ) : null}

                {isFoundation ? (
                  <motion.div
                    variants={bcfRise}
                    className="mt-14 flex w-full max-w-[920px] flex-col gap-3"
                  >
                    <div className="flex items-center justify-between text-[40px] font-medium text-white">
                      <span>{c.storyTimelineStart}</span>
                      <span>{c.storyTimelineEnd}</span>
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
                        style={{ backgroundColor: BCF.gold, boxShadow: `0 0 16px ${BCF.gold}` }}
                      />
                    </span>
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
          )}

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
          <div style={{ height: totalPanes * PANE_HEIGHT }} />
        </div>
      </div>
    </BcfShell>
  );
}
