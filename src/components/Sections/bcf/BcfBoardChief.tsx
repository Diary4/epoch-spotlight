import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import {
  BCF,
  BCF_FIELD_BG,
  BCF_GLASS_CARD,
} from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
  bcfBloom,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import slideHonour from "@/assets/images/bcf/optimized/board-chief/309413182_646064353547301_6647496102934481967_n.webp";
import slideMedal from "@/assets/images/bcf/optimized/board-chief/8C6A0117.webp";
import slideGift from "@/assets/images/bcf/optimized/board-chief/8D1A9629.webp";
import slideChild from "@/assets/images/bcf/optimized/board-chief/FY1A6788.webp";
import slideDistribution from "@/assets/images/bcf/optimized/board-chief/FY1A7016.webp";
import slideCeremony from "@/assets/images/bcf/optimized/board-chief/8C6A3599.webp";
import nodeFounded from "@/assets/images/bcf/thumbs/board-chief/8C6A6742.webp";
import nodeEcosoc from "@/assets/images/bcf/thumbs/board-chief/8C6A0257.webp";
import nodeKuwait from "@/assets/images/bcf/thumbs/board-chief/8C6A0316.webp";
import nodeEarthquake from "@/assets/images/bcf/thumbs/board-chief/FY1A7010.webp";
import nodeHomes from "@/assets/images/bcf/thumbs/board-chief/8D1A9536.webp";
import nodeAwards from "@/assets/images/bcf/thumbs/board-chief/8D1A8564.webp";
import alongsideA from "@/assets/images/bcf/thumbs/board-chief/8C6A0152.webp";
import alongsideB from "@/assets/images/bcf/thumbs/board-chief/FY1A6986.webp";

export type BoardChiefView = "profile" | "timeline";

type BcfBoardChiefProps = {
  lang: BcfLang;
  view: BoardChiefView;
  onOpenTimeline: () => void;
  onBack: () => void;
};

/** Carousel plates, in the order the copy captions them. */
const SLIDE_IMAGES = [
  slideHonour,
  slideMedal,
  slideGift,
  slideChild,
  slideDistribution,
  slideCeremony,
];

/** One disc per milestone, in the order the copy lists them. */
const NODE_IMAGES = [
  nodeFounded,
  nodeEcosoc,
  nodeKuwait,
  nodeEarthquake,
  nodeHomes,
  nodeAwards,
];

/**
 * Board Chief — the one screen in Trust where a person, rather than a layer of
 * the org chart, is the subject.
 *
 * Two scenes share the file because they share the nameplate language and the
 * photography: the profile (nameplate, carousel, the bodies the chief sits
 * with) and the governance timeline it opens into. The parent owns which one is
 * up so both can take part in the chapter's own `AnimatePresence` dissolve.
 */
export default function BcfBoardChief({
  lang,
  view,
  onOpenTimeline,
  onBack,
}: BcfBoardChiefProps) {
  const c = bcfCopy[lang];
  const chief = c.boardChief;
  const rtl = lang !== "en";

  if (view === "timeline") {
    return (
      /* No photograph behind the timeline. A full-bleed portrait under a thread
         of six discs was two competing subjects on one plate — the deep-field
         gradient the chapter already defines for photograph-less scenes lets the
         discs be the only faces on the screen. */
      <BcfShell
        key="chief-timeline"
        showLogo={false}
        overlayClassName="bg-black/0"
        backgroundStyle={{ background: BCF_FIELD_BG }}
      >
        <div className="relative flex min-h-[1920px] flex-col px-12 pb-12 pt-28">
          <BcfBackButton onClick={onBack} label={c.back} />
          <OrnateFrame />

          <motion.div
            className="relative z-10 flex w-full items-end justify-between gap-8 px-6"
            variants={bcfStagger(0.1, 0.16)}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={bcfRise}
              className="max-w-[640px] text-start text-[62px] font-bold leading-none"
              style={{ color: BCF.cream }}
            >
              {chief.timelineTitle}
            </motion.h1>
            <motion.span
              variants={bcfRise}
              className="pb-2 text-[34px] font-medium tabular-nums"
              style={{ color: BCF.gold }}
            >
              {chief.timelineRange}
            </motion.span>
          </motion.div>

          <motion.span
            className="relative z-10 mx-6 mt-6 block h-px"
            style={{
              background: `linear-gradient(90deg, ${BCF.gold}, ${BCF.gold}22)`,
            }}
            initial={{ opacity: 0, scaleX: 0, transformOrigin: rtl ? "right" : "left" }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.85, delay: 0.22, ease: BCF_EASE }}
          />

          <GovernanceTimeline
            milestones={chief.timelineMilestones}
            rtl={rtl}
          />
        </div>
      </BcfShell>
    );
  }

  return (
    /* No photograph behind the profile either. The carousel directly under the
       nameplate is already six plates of the same man; a seventh, blurred and
       full-bleed behind them, only competed with the one the visitor is meant to
       be looking at. Same deep-field gradient the timeline reads on. */
    <BcfShell
      key="chief-profile"
      showLogo={false}
      overlayClassName="bg-black/0"
      backgroundStyle={{ background: BCF_FIELD_BG }}
    >
      {/* Every block below is sized so the column lands inside the 1920 artboard
          in all three languages. It used to run 2101px, and the canvas scrolls
          whatever it cannot fit — on a kiosk that means the CTA is off-screen
          until someone drags a page nobody expects to move. */}
      <div className="relative flex min-h-[1920px] flex-col items-center px-12 pb-12 pt-24">
        <BcfBackButton onClick={onBack} label={c.back} />

        <NamePlate name={chief.name} role={chief.role} meta={chief.meta} />

        <ChiefCarousel
          images={SLIDE_IMAGES}
          captions={chief.slides.map((slide) => slide.caption)}
          rtl={rtl}
        />

        <motion.p
          className="mt-6 max-w-[840px] text-center text-[25px] leading-relaxed text-white/70"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.46, ease: BCF_EASE }}
        >
          {chief.intro}
        </motion.p>

        {/* The two governance bodies the chief sits with. They carry the same
            copy as the cards on the Leadership grid, so a visitor arriving here
            first still learns where this office sits in the structure. */}
        <motion.p
          className="mt-7 text-[22px] tracking-[0.18em] text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.56 }}
        >
          {chief.alongside}
        </motion.p>

        <motion.div
          className="mt-6 flex w-full max-w-[800px] items-start justify-center gap-14"
          variants={bcfStagger(0.1, 0.62)}
          initial="initial"
          animate="animate"
        >
          {[c.trustFounders[1], c.trustFounders[2]].map((body, index) => (
            <motion.div
              key={body?.title ?? index}
              variants={bcfRiseCard}
              className="flex w-[300px] flex-col items-center text-center"
            >
              <span
                className="h-[132px] w-[132px] overflow-hidden rounded-full border-2"
                style={{
                  borderColor: `${BCF.gold}aa`,
                  boxShadow: "0 18px 44px rgba(0,0,0,0.55)",
                }}
              >
                <img
                  src={index === 0 ? alongsideA : alongsideB}
                  alt=""
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </span>
              <span
                className="mt-4 border-b-2 pb-2 text-[26px] font-semibold leading-tight"
                style={{ color: BCF.creamSoft, borderColor: `${BCF.gold}66` }}
              >
                {body?.title}
              </span>
              <span className="mt-3 text-[20px] leading-snug text-white/60">
                {body?.subtitle}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          type="button"
          onClick={onOpenTimeline}
          whileTap={BCF_TAP_FIRM}
          /* Sits a fixed step under the last card rather than on `mt-auto`.
             Pinned to the foot of the artboard it stranded itself at the bottom
             of the screen no matter how much air the column above gave back. */
          className="mt-14 w-full max-w-[580px] transform-gpu rounded-full px-12 py-6 text-[29px] font-semibold"
          style={{
            background: "linear-gradient(165deg, #e2b66a 0%, #b07a2e 60%, #8a5c1c 100%)",
            color: "#2a1808",
            boxShadow: `0 18px 46px rgba(0,0,0,0.5), 0 0 40px ${BCF.gold}22`,
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...BCF_TAP_TRANSITION, duration: 0.7, delay: 0.8, ease: BCF_EASE }}
        >
          {chief.timelineCta}
        </motion.button>
      </div>
    </BcfShell>
  );
}

/**
 * The nameplate.
 *
 * A solid gold block was the single loudest object in the chapter — brighter
 * than the photography under it and unrelated to the glass the carousel, the
 * cards and the timeline are all drawn in. It is now that same glass: dark
 * plate, gold hairline, gold type. Its cut corners are a clip-path rather than
 * a border image, so it stays crisp at the 2× the 4K portrait panel scales this
 * artboard to.
 */
const PLATE_CLIP =
  "polygon(32px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0 calc(100% - 32px), 0 32px)";

function NamePlate({
  name,
  role,
  meta,
}: {
  name: string;
  role: string;
  meta: string;
}) {
  return (
    <motion.div
      className="relative w-full max-w-[640px] px-9 py-6 text-center backdrop-blur-md"
      style={{
        background:
          "linear-gradient(165deg, rgba(28,20,8,0.82) 0%, rgba(10,10,10,0.72) 100%)",
        border: `1px solid ${BCF.gold}66`,
        clipPath: PLATE_CLIP,
        boxShadow: `0 22px 60px rgba(0,0,0,0.55), inset 0 0 60px ${BCF.gold}0f`,
      }}
      variants={bcfBloom}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.7, delay: 0.14, ease: BCF_EASE }}
    >
      {/* Inner hairline, inset from the cut edge — the detail that reads as an
          engraved plate rather than a filled rectangle. */}
      <span
        className="pointer-events-none absolute inset-[9px]"
        style={{
          border: `1px solid ${BCF.gold}2e`,
          clipPath:
            "polygon(26px 0, calc(100% - 26px) 0, 100% 26px, 100% calc(100% - 26px), calc(100% - 26px) 100%, 26px 100%, 0 calc(100% - 26px), 0 26px)",
        }}
      />
      <h1 className="text-[54px] font-bold leading-none" style={{ color: BCF.cream }}>
        {name}
      </h1>
      <p className="mt-3 text-[27px] font-medium" style={{ color: BCF.gold }}>
        {role}
      </p>
      <p className="mt-2 text-[21px] text-white/50">{meta}</p>
    </motion.div>
  );
}

/** Dwell on each plate before it advances on its own. Long enough to read the
 *  caption under it in all three languages. */
const SLIDE_DWELL_MS = 5600;

/**
 * Photography carousel.
 *
 * Advances on its own — nobody walks up to a kiosk and starts tapping chevrons,
 * so the plates have to be the thing that invites them. The controls stay for
 * whoever does reach out, and touching one restarts the dwell rather than
 * fighting a timer that was already half spent.
 *
 * Chevrons and dots sit under the plate rather than over it: on a kiosk the
 * visitor's hand is already on the glass, and controls laid over the image are
 * exactly what their palm covers.
 */
function ChiefCarousel({
  images,
  captions,
  rtl,
}: {
  images: string[];
  captions: string[];
  rtl: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  /** Bumped on every manual pick, purely to restart the effect below. */
  const [touched, setTouched] = React.useState(0);
  const count = Math.min(images.length, captions.length);

  const go = (next: number) => {
    setIndex(((next % count) + count) % count);
    setTouched((n) => n + 1);
  };
  const step = (delta: number) => go(index + delta);

  React.useEffect(() => {
    if (reduceMotion || count < 2) return;
    const id = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      SLIDE_DWELL_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, touched, count, reduceMotion]);

  return (
    <motion.div
      className="mt-7 flex w-full max-w-[860px] flex-col items-center"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: BCF_EASE }}
    >
      <div
        className={`${BCF_GLASS_CARD} relative h-[478px] w-full overflow-hidden p-3`}
      >
        {/* One plate at a time, cross-dissolved. `mode="wait"` would leave the
            frame empty mid-swap, which on a slow panel reads as a broken image. */}
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            decoding="async"
            className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-xl object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: BCF_EASE }}
          />
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-7">
        <CarouselArrow
          direction="prev"
          rtl={rtl}
          onClick={() => step(-1)}
        />
        <div className="flex items-center gap-3">
          {Array.from({ length: count }).map((_, dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => go(dot)}
              aria-label={`${dot + 1}`}
              aria-current={dot === index}
              className="grid h-[40px] w-[40px] place-items-center"
            >
              <span
                className="block rounded-full transition-all duration-400 ease-smooth-out"
                style={{
                  width: dot === index ? 16 : 10,
                  height: dot === index ? 16 : 10,
                  backgroundColor:
                    dot === index ? BCF.goldBright : "rgba(255,255,255,0.3)",
                }}
              />
            </button>
          ))}
        </div>
        <CarouselArrow direction="next" rtl={rtl} onClick={() => step(1)} />
      </div>

      {/* The caption belongs to the plate, so it changes with it. A fixed
          minimum height keeps the two-line captions from shifting the page. */}
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="mt-4 min-h-[84px] max-w-[780px] text-center text-[26px] leading-relaxed"
          style={{ color: BCF.creamSoft }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: BCF_EASE }}
        >
          {captions[index]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

function CarouselArrow({
  direction,
  rtl,
  onClick,
}: {
  direction: "prev" | "next";
  rtl: boolean;
  onClick: () => void;
}) {
  // "Previous" points back along the reading direction, so the glyph flips with
  // the language rather than always pointing left.
  const pointsLeft = direction === "prev" ? !rtl : rtl;
  const Icon = pointsLeft ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={direction}
      whileTap={BCF_TAP_FIRM}
      transition={BCF_TAP_TRANSITION}
      className="grid h-[68px] w-[68px] transform-gpu place-items-center rounded-full border bg-black/45 backdrop-blur-md"
      style={{ borderColor: `${BCF.gold}59` }}
    >
      <Icon className="h-8 w-8" style={{ color: BCF.sand }} />
    </motion.button>
  );
}

/* -------------------------------------------------------------------------
 * Governance timeline
 * ---------------------------------------------------------------------- */

const TL_W = 1000;
const TL_TOP = 120;
const TL_GAP = 258;
const TL_NODE_R = 86;
/** Nodes alternate across the thread; labels take the side the node left open. */
const TL_LEFT_X = 232;
const TL_RIGHT_X = TL_W - TL_LEFT_X;

function nodeCentre(index: number, rtl: boolean) {
  const base = index % 2 === 0 ? TL_LEFT_X : TL_RIGHT_X;
  return { x: rtl ? TL_W - base : base, y: TL_TOP + index * TL_GAP };
}

/** Smooth S-curve through the node centres — control points sit half a step out. */
function threadPath(count: number, rtl: boolean) {
  if (count === 0) return "";
  const first = nodeCentre(0, rtl);
  let d = `M${first.x} ${first.y}`;
  for (let i = 1; i < count; i += 1) {
    const a = nodeCentre(i - 1, rtl);
    const b = nodeCentre(i, rtl);
    const half = (b.y - a.y) / 2;
    d += ` C${a.x} ${a.y + half} ${b.x} ${b.y - half} ${b.x} ${b.y}`;
  }
  return d;
}

/**
 * The record the office is answerable for, as one descending thread. Every
 * entry restates a fact carried elsewhere in the experience — the founding, the
 * credentials, the recognition — so the timeline is a reading of the chapter
 * rather than a second, unsourced account of it.
 */
function GovernanceTimeline({
  milestones,
  rtl,
}: {
  milestones: { id: string; year: string; title: string; body: string }[];
  rtl: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const count = milestones.length;
  const height = TL_TOP + (count - 1) * TL_GAP + TL_NODE_R + 40;
  const thread = React.useMemo(() => threadPath(count, rtl), [count, rtl]);

  return (
    <div
      className="relative z-10 mx-auto mt-4"
      style={{ width: TL_W, height }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${TL_W} ${height}`}
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d={thread}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1.5}
          initial={reduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.6, delay: 0.3, ease: BCF_EASE },
          }}
        />
        {/* The travelling glint that used to run along this thread is gone, for
            the same reason as the one on the recognition arc in BcfTrust:
            `stroke-dashoffset` is not a compositor property, so it re-rastered
            the full timeline path on the main thread every frame, forever. */}
      </svg>

      {milestones.map((milestone, index) => {
        const centre = nodeCentre(index, rtl);
        /** Copy fills the half of the stage the disc is not standing in. */
        const labelOnRight = centre.x < TL_W / 2;
        const gap = TL_NODE_R + 34;
        const labelStyle: React.CSSProperties = labelOnRight
          ? { left: centre.x + gap, right: 8 }
          : { right: TL_W - centre.x + gap, left: 8 };

        return (
          <React.Fragment key={milestone.id}>
            <motion.div
              className="absolute z-20 overflow-hidden rounded-full border-2"
              style={{
                left: centre.x - TL_NODE_R,
                top: centre.y - TL_NODE_R,
                width: TL_NODE_R * 2,
                height: TL_NODE_R * 2,
                borderColor: `${BCF.gold}99`,
                boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
              }}
              variants={bcfBloom}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.42 + index * 0.1, ease: BCF_EASE }}
            >
              <img
                src={NODE_IMAGES[index % NODE_IMAGES.length]}
                alt=""
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 38%, rgba(4,7,10,0.12), rgba(4,7,10,0.55) 94%)",
                }}
              />
            </motion.div>

            {/* Centring lives on a plain wrapper, not on the animated element:
                motion owns `transform` to slide the label in on `x`, and would
                drop the -50% that lines the copy up with its disc. Without it
                every label hung a half-height low and ran under the next node. */}
            <div
              className="absolute z-10"
              style={{
                ...labelStyle,
                top: centre.y,
                transform: "translateY(-50%)",
              }}
            >
            <motion.div
              style={{ textAlign: labelOnRight === !rtl ? "start" : "end" }}
              initial={{ opacity: 0, x: labelOnRight ? -22 : 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.66,
                delay: 0.52 + index * 0.1,
                ease: BCF_EASE,
              }}
            >
              <p
                className="text-[46px] font-bold leading-none tabular-nums"
                style={{ color: BCF.gold }}
              >
                {milestone.year}
              </p>
              <p
                className="mt-3 text-[31px] font-semibold leading-tight"
                style={{ color: BCF.cream }}
              >
                {milestone.title}
              </p>
              <p className="mt-3 text-[24px] leading-snug text-white/65">
                {milestone.body}
              </p>
            </motion.div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/**
 * The drawn border the timeline is read inside — two nested rules with the
 * corners cut away, so the page reads as a plate in a frame the way the rest of
 * the chapter's photography does.
 */
function OrnateFrame() {
  return (
    <motion.span
      className="pointer-events-none absolute inset-x-8 inset-y-16 z-0"
      style={{
        border: `1px solid ${BCF.gold}3d`,
        clipPath:
          "polygon(64px 0, 100% 0, 100% calc(100% - 64px), calc(100% - 64px) 100%, 0 100%, 0 64px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.36 }}
    >
      <span
        className="absolute inset-3"
        style={{
          border: `1px solid ${BCF.gold}1f`,
          clipPath:
            "polygon(56px 0, 100% 0, 100% calc(100% - 56px), calc(100% - 56px) 100%, 0 100%, 0 56px)",
        }}
      />
    </motion.span>
  );
}
