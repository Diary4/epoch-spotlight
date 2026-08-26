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
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] ${className ?? ""}`}
      style={{
        border: `1.5px solid ${BCF.gold}`,
        boxShadow: `0 0 28px ${BCF.gold}40, 0 18px 48px rgba(0,0,0,0.55)`,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        decoding="async"
        className="h-full w-full object-cover"
        style={{ filter: PHOTO_FILTER }}
      />
    </div>
  );
}

/**
 * One gold-framed plate per beat. Sized to leave the flanking chapter controls
 * their own gutter, so a photograph never runs under Back or Next.
 */
function StoryPhoto({ src, label }: { src: string; label: string }) {
  return (
    <GoldPhoto
      src={src}
      alt={label}
      className="h-[420px] w-[560px] shrink-0"
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
  const Chevron = isPrev ? ChevronLeft : ChevronRight;

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
          <Chevron
            className={`h-5 w-5 shrink-0 ${rtl ? "rotate-180" : ""}`}
            style={{ color: BCF.gold }}
          />
          {label}
        </>
      ) : (
        <>
          {label}
          <Chevron
            className={`h-5 w-5 shrink-0 ${rtl ? "rotate-180" : ""}`}
            style={{ color: BCF.gold }}
          />
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
      <div className="relative flex h-[1920px] min-h-[1920px] w-full flex-col overflow-hidden px-12 pt-[130px]">
        <BcfBackButton onClick={onBack} label={c.back} className="z-50" />

        {/* Chapter controls belong to the page, not to the photographs: pinned
            to the artboard edges at its vertical middle so they hold still
            while each beat's copy and photo stack change behind them. */}
        <div className="pointer-events-none absolute inset-y-0 start-[100px] z-40 flex items-center">
          <div className="pointer-events-auto">
            <StoryNavButton
              label={c.back}
              disabled={isFirst}
              onClick={goPrev}
              side="prev"
              rtl={rtl}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 end-[100px] z-40 flex items-center">
          <div className="pointer-events-auto">
            <StoryNavButton
              label={c.storyNext}
              disabled={isLast}
              onClick={goNext}
              side="next"
              rtl={rtl}
            />
          </div>
        </div>

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

        {/* Body row: rail + content */}
        <div className="relative z-10 mt-16 flex min-h-0 flex-1">
          {/* Left progress rail */}
          <div className="relative flex w-[72px] shrink-0 flex-col items-center pt-6">
            <span
              className="absolute top-8 bottom-24 w-px"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            />
            <div className="relative z-10 flex flex-1 flex-col items-center justify-between py-4">
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
                        className="absolute start-full top-1/2 h-px w-8 -translate-y-1/2"
                        style={{
                          background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
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
                      className={`max-w-[820px] ${rtl ? "text-end" : "text-start"}`}
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
                      className="flex flex-1 items-start justify-center pt-10"
                      style={{ marginInlineStart: -96, marginInlineEnd: -16 }}
                    >
                      <StoryPhoto src={photos.front} label={active.data.title} />
                    </motion.div>
                  </>
                ) : isValues ? (
                  <>
                    <motion.div
                      variants={bcfRise}
                      className={`max-w-[920px] ${rtl ? "text-end" : "text-start"}`}
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
                      className={`max-w-[900px] ${rtl ? "text-end" : "text-start"}`}
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
                      {active.data.body ? (
                        <p
                          className={`mt-8 max-w-[820px] text-[32px] font-medium text-[#fcdfaa] ${
                            lang === "en" ? "leading-snug" : "leading-[1.75]"
                          }`}
                        >
                          {active.data.body}
                        </p>
                      ) : null}
                    </motion.div>

                    <motion.div
                      variants={bcfRise}
                      className="flex flex-1 items-start justify-center pt-10"
                      style={{ marginInlineStart: -96, marginInlineEnd: -16 }}
                    >
                      <StoryPhoto
                        src={photos.front}
                        label={beatLabel(active)}
                      />
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </BcfShell>
  );
}
