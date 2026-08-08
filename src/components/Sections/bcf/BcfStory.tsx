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
import BcfParallaxPlate from "@/components/Sections/bcf/BcfParallaxPlate";
import BcfScrollReveal from "@/components/Sections/bcf/BcfScrollReveal";
import {
  bcfCopy,
  type BcfLang,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  LOCO_LERP,
  LOCO_SETTLE,
  bcfRise,
  bcfStagger,
  lerp,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfCorridor, bcfErbil, bcfJourneyStory } from "@/components/Sections/bcf/bcfAssets";
import presidentA from "@/assets/images/bcf/selected/humanity-relief.webp";
import presidentB from "@/assets/images/bcf/selected/humanity-community.webp";
import presidentC from "@/assets/images/bcf/selected/humanstories-recovery.webp";

type BcfStoryProps = {
  lang: BcfLang;
  onBack: () => void;
};

const PANE_HEIGHT = 1920;

/** Room for the smoothing to settle once the column has run out of travel. */
const VALUES_TAIL = 260;

const PRESIDENT_PLATES = [presidentA, presidentB, presidentC];

/** Arabic-Indic digits used for Kurdish and Arabic chapter markers. */
const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩";

/**
 * `data-scroll-speed` per portrait. All three drift with the scroll rather than
 * against it; it is the difference between them that reads as depth, and
 * keeping the gaps small enough means the plates never close on each other.
 */
const PLATE_SPEEDS = [2, 1, 2.5];

const PLATE_LAYOUT = [
  { frame: "w-full", height: "h-[660px]" },
  { frame: "w-[74%] ms-auto", height: "h-[540px]" },
  { frame: "w-[74%]", height: "h-[580px]" },
];

function formatChapterDigits(value: number, lang: BcfLang) {
  const latin = String(value).padStart(2, "0");
  if (lang === "en") return latin;
  return latin.replace(/\d/g, (digit) => ARABIC_INDIC[Number(digit)] ?? digit);
}

function chapterLabel(index: number, lang: BcfLang) {
  return formatChapterDigits(index + 1, lang);
}

/**
 * The opener every chapter shares: the number, the title typing itself in, and
 * the line beneath it. Values used to draw its own — a smaller column with the
 * six values already under it — which read as a different screen rather than
 * the next chapter. It is one component now so the two cannot drift again.
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

export default function BcfStory({ lang, onBack }: BcfStoryProps) {
  const c = bcfCopy[lang];
  const sections = c.storySections;
  const storyLabel =
    c.journeyChapters.find((chapter) => chapter.id === "story")?.title ?? c.journeyChapters[0].title;

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const tickingRef = React.useRef(false);

  const valuesIndex = React.useMemo(
    () => sections.findIndex((section) => section.id === "values"),
    [sections],
  );

  /**
   * Column travel, in px. Every other chapter is one screen; values is a long
   * read — a title, six values and the presidency plates — so it buys exactly
   * as much scroll as its column overflows by, and travels through it.
   */
  const [valuesTravel, setValuesTravel] = React.useState(0);

  /** Section start offsets in px, so the scroll maps 1:1 onto the travel. */
  const { starts, totalHeight } = React.useMemo(() => {
    const st: number[] = [];
    let running = 0;
    sections.forEach((section, index) => {
      st.push(running);
      running +=
        index === valuesIndex
          ? Math.max(PANE_HEIGHT, valuesTravel + VALUES_TAIL)
          : PANE_HEIGHT;
    });
    return { starts: st, totalHeight: running };
  }, [sections, valuesIndex, valuesTravel]);

  /**
   * Locomotive keeps two positions: the raw one the input has reached, and the
   * one on screen, which lerps toward it every frame. Both are kept off React
   * state — re-rendering the scene at 60fps would undo the smoothness the
   * whole arrangement exists to provide.
   */
  const targetRef = React.useRef(0);
  const smooth = useMotionValue(0);
  const valuesY = useTransform(smooth, (value) => -value);
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
          if (top >= starts[i]) next = i;
        }
        setActiveIndex((prev) => (prev === next ? prev : next));

        const local = top - starts[valuesIndex];
        targetRef.current = Math.min(valuesTravel, Math.max(0, local));
        setValuesStarted(targetRef.current > 40);
      }
      tickingRef.current = false;
    });
  }, [starts, valuesIndex, valuesTravel]);

  const active = sections[activeIndex];
  const isFoundation = activeIndex === 0;
  const isValues = active.id === "values";
  const label = chapterLabel(activeIndex, lang);
  const showCorridor = activeIndex > 0;

  /** The lerp itself: one frame of Locomotive, for as long as the chapter is up. */
  React.useEffect(() => {
    // Leaving the chapter snaps the smoothed position, so coming back to it
    // does not replay the glide the visitor already scrolled through.
    if (!isValues) {
      smooth.set(targetRef.current);
      return;
    }
    let frame = 0;
    const step = () => {
      const current = smooth.get();
      const target = targetRef.current;
      if (current !== target) {
        const next =
          Math.abs(target - current) < LOCO_SETTLE
            ? target
            : lerp(current, target, LOCO_LERP);
        smooth.set(next);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isValues, smooth]);

  /** Measure the column so the travel is exact in every language. */
  const columnRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const node = columnRef.current;
    if (!node) return;
    const measure = () => {
      const travel = Math.max(0, node.scrollHeight - PANE_HEIGHT);
      setValuesTravel((prev) => (prev === travel ? prev : travel));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [lang, isValues]);

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
                <div ref={columnRef} className="pb-[240px]">
                  {/* The opener holds a full pane on its own, so the chapter
                      arrives as a title — exactly like the four before it —
                      and the read only begins once the visitor scrolls. */}
                  <motion.div
                    className="px-14 pt-[300px]"
                    style={{ height: PANE_HEIGHT }}
                    variants={bcfStagger(0.08, 0.06)}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="mx-auto w-full max-w-[1080px]">
                      <BcfChapterHead
                        label={label}
                        titleGold={active.titleGold}
                        titleWhite={active.titleWhite}
                        body={c.storyValuesIntro}
                      />
                    </div>
                  </motion.div>

                  <div className="px-14">
                    <div className="mx-auto w-full max-w-[1080px]">
                      {c.storyValues.map((value, index) => (
                        <BcfScrollReveal
                          key={value.id}
                          scroll={smooth}
                          containerRef={columnRef}
                          viewport={PANE_HEIGHT}
                          className={index === 0 ? "" : "mt-[170px]"}
                        >
                          <div className="border-t border-white/12 pt-12">
                            <span
                              dir="ltr"
                              className="text-[28px] font-semibold tabular-nums"
                              style={{ color: `${BCF.gold}b3` }}
                            >
                              {formatChapterDigits(index + 1, lang)}
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
                        </BcfScrollReveal>
                      ))}

                      {/* Presidency showcase. It follows the six values rather
                          than breaking them up, so the reading finishes before
                          the leadership behind it is shown. Each plate carries
                          its own scroll speed and drifts against the column —
                          the reveal is opacity only, so the drift stays true. */}
                      <div className="mt-[220px]">
                        <span
                          className="block h-px w-[420px] max-w-full rtl:scale-x-[-1]"
                          style={{
                            background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
                          }}
                        />

                        {PRESIDENT_PLATES.map((plate, index) => (
                          <BcfScrollReveal
                            key={c.storyValuesCaptions[index] ?? index}
                            scroll={smooth}
                            containerRef={columnRef}
                            viewport={PANE_HEIGHT}
                            distance={0}
                            className={`mt-[180px] ${PLATE_LAYOUT[index].frame}`}
                          >
                            <BcfParallaxPlate
                              scroll={smooth}
                              containerRef={columnRef}
                              viewport={PANE_HEIGHT}
                              speed={PLATE_SPEEDS[index]}
                            >
                              <figure>
                                <div className="overflow-hidden rounded-[32px] border border-[#fbc158]/25">
                                  <img
                                    src={plate}
                                    alt=""
                                    decoding="async"
                                    className={`w-full object-cover ${PLATE_LAYOUT[index].height}`}
                                  />
                                </div>
                                <figcaption className="mt-5 text-[26px] leading-snug text-white/55">
                                  {c.storyValuesCaptions[index]}
                                </figcaption>
                              </figure>
                            </BcfParallaxPlate>
                          </BcfScrollReveal>
                        ))}
                      </div>

                      <BcfScrollReveal
                        scroll={smooth}
                        containerRef={columnRef}
                        viewport={PANE_HEIGHT}
                        className="mt-[240px]"
                      >
                        <blockquote className="flex flex-col items-start gap-6">
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
                      </BcfScrollReveal>
                    </div>
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
                    <span className="text-[42px] font-medium tracking-wide">
                      {c.storyScrollHint}
                    </span>
                    <ChevronDown className="h-12 w-12 animate-bounce" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
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
          <div style={{ height: totalHeight }} />
        </div>
      </div>
    </BcfShell>
  );
}
