import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type StoryMilestone,
  type StorySection,
  type StorySectionId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfStoryBg } from "@/components/Sections/bcf/bcfAssets";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import {
  bcfStoryImageFallback,
  bcfStoryImagePairs,
} from "@/components/Sections/bcf/bcfStoryImages";

type BcfStoryProps = {
  lang: BcfLang;
  onBack: () => void;
};

/** Sections that sit directly after the 2005 founding beat. */
const AFTER_2005_IDS: StorySectionId[] = [
  "mission",
  "vision",
  "philosophy",
  "values",
];

type StoryBeat =
  | { kind: "milestone"; data: StoryMilestone }
  | { kind: "section"; data: StorySection };

const PHOTO_FILTER = "saturate(0.55) sepia(0.22) contrast(1.05) brightness(0.92)";

function GoldPhoto({
  src,
  alt,
  className,
  style,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] ${className ?? ""}`}
      style={{
        border: `2px solid ${BCF.gold}`,
        boxShadow: `0 0 0 1px ${BCF.gold}33, 0 0 60px ${BCF.gold}45, 0 28px 70px rgba(0,0,0,0.6)`,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        decoding="async"
        className="h-full w-full object-cover"
        style={{ filter: PHOTO_FILTER, objectPosition }}
      />
    </div>
  );
}

/**
 * One gold-framed plate per beat, and the loudest thing on the screen after
 * the headline.
 *
 * 780 is the widest the plate can go before it collides with something. It is
 * centred on the artboard rather than on its own column — the wrapper's
 * negative start margin pulls it back over the rail's gutter — so half of it
 * lives left of centre, and at 940 its edge reached x≈76 while the timeline
 * dots sit at x≈84: the rail ended up drawn across the photograph. 780 leaves
 * its edge at x=150, clear of the 120px the rail occupies.
 *
 * The size is fixed rather than stretched to the leftover space: every beat
 * carries a different amount of copy, and a plate that changed size on each
 * tap of Next drew attention to itself instead of to the picture. 560 tall
 * fits under the wordiest milestone without crowding the Back/Next band.
 */
function StoryPhoto({
  src,
  label,
  objectPosition = "center",
}: {
  src: string;
  label: string;
  objectPosition?: string;
}) {
  return (
    <GoldPhoto
      src={src}
      alt={label}
      objectPosition={objectPosition}
      className="h-[560px] w-[780px] shrink-0"
    />
  );
}

function StoryNavButton({
  label,
  disabled,
  onClick,
  side,
  rtl,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  side: "prev" | "next";
  rtl: boolean;
}) {
  const isPrev = side === "prev";
  const Chevron = isPrev
    ? rtl
      ? ChevronRight
      : ChevronLeft
    : rtl
      ? ChevronLeft
      : ChevronRight;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : BCF_TAP}
      transition={BCF_TAP_TRANSITION}
      className="flex h-[64px] w-[132px] shrink-0 items-center justify-center gap-2 rounded-full border text-[22px] font-medium disabled:cursor-default disabled:opacity-30"
      style={{
        borderColor: BCF.gold,
        backgroundColor: isPrev
          ? "rgba(0,0,0,0.55)"
          : disabled
            ? "rgba(0,0,0,0.35)"
            : "rgba(70, 48, 18, 0.58)",
        color: "#ffffff",
        boxShadow: disabled ? "none" : `0 0 20px ${BCF.gold}22`,
      }}
    >
      {isPrev ? (
        <>
          <Chevron className="h-5 w-5 shrink-0" style={{ color: BCF.gold }} />
          {label}
        </>
      ) : (
        <>
          {label}
          <Chevron className="h-5 w-5 shrink-0" style={{ color: BCF.gold }} />
        </>
      )}
    </motion.button>
  );
}

function beatKey(beat: StoryBeat) {
  return beat.data.id;
}

function beatLabel(beat: StoryBeat) {
  if (beat.kind === "milestone") return beat.data.title;
  const { titleGold, titleWhite } = beat.data;
  return [titleGold, titleWhite].filter(Boolean).join(" ");
}

/**
 * Our Story — founding year (2005), then Mission / Vision / Humanitarian
 * Philosophy / Values, then the remaining institutional timeline.
 */
export default function BcfStory({ lang, onBack }: BcfStoryProps) {
  const c = bcfCopy[lang];
  const milestones = c.storyMilestones;

  const beats = React.useMemo<StoryBeat[]>(() => {
    const identitySections = AFTER_2005_IDS.map((id) =>
      c.storySections.find((section) => section.id === id),
    ).filter((section): section is StorySection => Boolean(section));

    const [first, ...rest] = milestones;
    const identity = identitySections.map((data) => ({
      kind: "section" as const,
      data,
    }));

    // Identity panes sit directly after the founding year (2005), then the
    // rest of the institutional timeline continues.
    return [
      ...(first ? [{ kind: "milestone" as const, data: first }] : []),
      ...identity,
      ...rest.map((data) => ({ kind: "milestone" as const, data })),
    ];
  }, [c.storySections, milestones]);

  const storyLabel =
    c.journeyChapters.find((chapter) => chapter.id === "story")?.title ??
    c.journeyChapters[0].title;
  const rtl = lang !== "en";

  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = beats[activeIndex] ?? beats[0];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === beats.length - 1;
  const isValues = active?.kind === "section" && active.data.id === "values";
  const photos =
    bcfStoryImagePairs[beatKey(active)] ?? bcfStoryImageFallback;

  const goPrev = () => {
    if (isFirst) return;
    setActiveIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    if (isLast) return;
    setActiveIndex((i) => Math.min(beats.length - 1, i + 1));
  };

  return (
    <BcfShell
      showLogo={false}
      overlayClassName="bg-black/0"
      overlayFade={false}
      atmosphere={false}
      backgroundSlot={
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #050505 0%, #0a0b10 42%, #14161c 100%)",
            }}
          />
          <img
            src={bcfStoryBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 45% at 50% 8%, rgba(251,193,88,0.09), transparent 55%)",
            }}
          />
        </>
      }
    >
      <div className="relative flex h-[1920px] min-h-[1920px] w-full flex-col overflow-hidden px-12 pb-[560px] pt-[130px]">
        <BcfBackButton onClick={onBack} label={c.back} className="z-50" />

        {/* Title */}
        <motion.header
          className="relative z-20 flex shrink-0 flex-col items-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: BCF_EASE }}
        >
          <h1
            className="text-[52px] font-medium tracking-wide"
            style={{ color: BCF.cream }}
          >
            {storyLabel}
          </h1>
          <span
            className="mt-6 h-px w-[280px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
              boxShadow: `0 0 22px ${BCF.gold}`,
            }}
          />
        </motion.header>

        {/* Timeline rail sits on the start edge — left in English, right in
            Kurdish and Arabic — so it never draws through the photograph.
            Copy uses the same direction as the page, so the heading and body
            start from the right in ku/ar. */}
        <div
          className="relative z-10 mt-16 flex min-h-0 flex-1"
          dir={rtl ? "rtl" : "ltr"}
        >
          {/* Progress rail */}
          <div className="relative flex w-[72px] shrink-0 flex-col items-center pt-6">
            <div className="relative z-10 flex flex-1 flex-col items-center justify-between py-4">
              {/* The thread runs dot centre to dot centre: `inset-y-9` is the
                  column's own py-4 (16px) plus half a 40px dot button, so it
                  meets the first and last dots exactly however many beats the
                  language produces. A fixed inset measured from the rail
                  instead used to stop short and leave the last two dots
                  hanging off the end of the line. */}
              <span
                className="pointer-events-none absolute inset-y-9 left-1/2 w-px -translate-x-1/2"
                style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
              />
              {beats.map((beat, index) => {
                const on = index === activeIndex;
                const passed = index < activeIndex;
                return (
                  <button
                    key={beatKey(beat)}
                    type="button"
                    aria-label={beatLabel(beat)}
                    aria-current={on ? "step" : undefined}
                    onClick={() => setActiveIndex(index)}
                    className="relative grid h-10 w-10 place-items-center"
                  >
                    {on ? (
                      <span
                        // `start-full` mirrors the spur with the rail, but a
                        // gradient does not follow direction: at 90deg the gold
                        // end landed away from the dot in ku/ar and the line
                        // read as pointing at nothing.
                        className="absolute start-full top-1/2 h-px w-8 -translate-y-1/2"
                        style={{
                          background: `linear-gradient(${
                            rtl ? "270deg" : "90deg"
                          }, ${BCF.gold}, transparent)`,
                          boxShadow: `0 0 10px ${BCF.gold}`,
                        }}
                      />
                    ) : null}
                    <span
                      className="rounded-full transition-all duration-500 ease-smooth-out"
                      style={{
                        width: on ? 16 : 9,
                        height: on ? 16 : 9,
                        backgroundColor:
                          on || passed
                            ? BCF.goldBright
                            : "rgba(255,255,255,0.28)",
                        boxShadow: on
                          ? `0 0 0 6px ${BCF.gold}22, 0 0 22px ${BCF.gold}`
                          : "none",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active beat */}
          <div className="relative flex min-w-0 flex-1 flex-col pe-4 ps-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lang}-${beatKey(active)}`}
                className="flex flex-1 flex-col"
                variants={bcfStagger(0.08, 0.05)}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
              >
                {active.kind === "milestone" ? (
                  <>
                    <motion.div
                      variants={bcfRise}
                      className="max-w-[820px] text-start"
                    >
                      <p
                        className="text-[96px] font-light leading-none tracking-tight tabular-nums"
                        style={{ color: "rgba(251,244,228,0.95)" }}
                      >
                        {bcfDigits(active.data.year, lang)}
                      </p>
                      <h2
                        className={`mt-5 text-[30px] font-semibold uppercase leading-snug ${
                          lang === "en" ? "tracking-[0.04em]" : "tracking-normal"
                        }`}
                        style={{ color: BCF.gold }}
                      >
                        {active.data.title}
                      </h2>
                      <p
                        className={`mt-5 max-w-[700px] text-[26px] text-white/70 ${
                          lang === "en" ? "leading-relaxed" : "leading-[1.85]"
                        }`}
                      >
                        {active.data.body}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={bcfRise}
                      className="flex min-h-0 flex-1 items-start justify-center pt-10"
                      style={{ marginInlineStart: -96, marginInlineEnd: -16 }}
                    >
                      <StoryPhoto src={photos.front} label={active.data.title} />
                    </motion.div>
                  </>
                ) : isValues ? (
                  <>
                    <motion.div
                      variants={bcfRise}
                      className="max-w-[920px] text-start"
                    >
                      <h2
                        className="text-[64px] font-bold leading-[1.08]"
                        style={{ color: BCF.gold }}
                      >
                        {active.data.titleGold}
                        {active.data.titleWhite ? (
                          <span style={{ color: BCF.cream }}>
                            {" "}
                            {active.data.titleWhite}
                          </span>
                        ) : null}
                      </h2>
                      {active.data.body ? (
                        <p
                          className={`mt-6 max-w-[820px] text-[28px] text-white/70 ${
                            lang === "en" ? "leading-relaxed" : "leading-[1.85]"
                          }`}
                        >
                          {active.data.body}
                        </p>
                      ) : null}
                    </motion.div>

                    <motion.div
                      variants={bcfStagger(0.07, 0.1)}
                      className="mt-12 flex max-w-[920px] flex-col gap-6"
                    >
                      {c.storyValues.map((value, i) => (
                        <motion.div
                          key={value.id}
                          variants={bcfRise}
                          className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
                        >
                          <span
                            className={`flex items-center gap-4 rounded-full border border-white/15 bg-black/45 px-10 py-5 text-[30px] text-white backdrop-blur-sm ${
                              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                            }`}
                          >
                            <span
                              className="h-3.5 w-3.5 shrink-0 rounded-full"
                              style={{ backgroundColor: BCF.gold }}
                            />
                            {value.title}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      variants={bcfRise}
                      className="max-w-[900px] text-start"
                    >
                      <h2
                        className="text-[72px] font-bold leading-[1.05]"
                        style={{ color: BCF.gold }}
                      >
                        {active.data.titleGold}
                        {active.data.titleWhite ? (
                          <span style={{ color: BCF.cream }}>
                            {" "}
                            {active.data.titleWhite}
                          </span>
                        ) : null}
                      </h2>
                      {active.data.quote ? (
                        <div className="relative mt-8 max-w-[860px]">
                          <span
                            aria-hidden="true"
                            className="absolute -left-1 -top-8 font-display-num text-[92px] leading-none rtl:-right-1 rtl:left-auto"
                            style={{ color: `${BCF.gold}aa` }}
                          >
                            “
                          </span>
                          <p
                            className={`relative pt-4 text-[42px] ${
                              lang === "en"
                                ? "font-display-num font-semibold italic leading-snug"
                                : "font-amiri font-bold leading-[1.7]"
                            }`}
                            style={{
                              color: BCF.cream,
                              textShadow: "0 12px 40px rgba(0,0,0,0.55)",
                            }}
                          >
                            {active.data.quote}
                          </p>
                          {active.data.quoteAttr ? (
                            <p
                              className={`mt-5 text-[30px] font-medium ${
                                lang === "en" ? "" : "font-amiri"
                              }`}
                              style={{ color: BCF.gold }}
                            >
                              — {active.data.quoteAttr}
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                      {active.data.body ? (
                        <p
                          className={`max-w-[820px] text-[32px] font-medium text-[#fcdfaa] ${
                            active.data.quote ? "mt-6" : "mt-8"
                          } ${
                            lang === "en" ? "leading-snug" : "leading-[1.75]"
                          }`}
                        >
                          {active.data.body}
                        </p>
                      ) : null}
                    </motion.div>

                    <motion.div
                      variants={bcfRise}
                      className="flex min-h-0 flex-1 items-start justify-center pt-10"
                      style={{ marginInlineStart: -96, marginInlineEnd: -16 }}
                    >
                      <StoryPhoto src={photos.front} label={beatLabel(active)} />
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Back and Next sit together in one centred band. The artboard's
            bottom padding lifts that band off the floor of the 1920px canvas
            so it lands in the middle of the screen — on a 65" portrait TV the
            true bottom is near the ground and out of reach. It cannot be
            centred exactly: the tallest beat (Values) runs to roughly y=1160
            on its own, so the band sits just below the content it drives and
            holds still there as the beats change behind it. */}
        <nav
          className="relative z-40 flex shrink-0 items-center justify-center gap-12 pt-10"
          dir="ltr"
        >
          {rtl ? (
            <>
              <StoryNavButton
                label={c.storyNext}
                disabled={isLast}
                onClick={goNext}
                side="next"
                rtl={rtl}
              />
              <span
                className="min-w-[104px] text-center text-[24px] tabular-nums"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {bcfDigits(activeIndex + 1, lang)} / {bcfDigits(beats.length, lang)}
              </span>
              <StoryNavButton
                label={c.back}
                disabled={isFirst}
                onClick={goPrev}
                side="prev"
                rtl={rtl}
              />
            </>
          ) : (
            <>
              <StoryNavButton
                label={c.back}
                disabled={isFirst}
                onClick={goPrev}
                side="prev"
                rtl={rtl}
              />
              <span
                className="min-w-[104px] text-center text-[24px] tabular-nums"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {bcfDigits(activeIndex + 1, lang)} / {bcfDigits(beats.length, lang)}
              </span>
              <StoryNavButton
                label={c.storyNext}
                disabled={isLast}
                onClick={goNext}
                side="next"
                rtl={rtl}
              />
            </>
          )}
        </nav>
      </div>
    </BcfShell>
  );
}
