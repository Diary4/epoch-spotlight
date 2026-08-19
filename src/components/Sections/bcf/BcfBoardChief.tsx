import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { bcfTrustBg } from "@/components/Sections/bcf/bcfAssets";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfProfileHero from "@/components/Sections/bcf/BcfProfileHero";
import BcfFilmstrip from "@/components/Sections/bcf/BcfFilmstrip";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import {
  BCF_EASE,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
  bcfBloom,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
/** Full-bleed plate at the head of the profile. */
import heroPortrait from "@/assets/images/bcf/optimized/board-chief/main.webp";
import slideHonour from "@/assets/images/bcf/optimized/board-chief/309413182_646064353547301_6647496102934481967_n.webp";
import slideMedal from "@/assets/images/bcf/optimized/board-chief/8C6A0117.webp";
import slideGift from "@/assets/images/bcf/optimized/board-chief/8D1A9629.webp";
import slideChild from "@/assets/images/bcf/optimized/board-chief/FY1A6788.webp";
import slideDistribution from "@/assets/images/bcf/board-chief/WhatsApp Image 2026-08-19 at 10.36.07.jpeg";
import slideCeremony from "@/assets/images/bcf/optimized/board-chief/8C6A3599.webp";
import nodeOrigins from "@/assets/images/PrimeMinistir/formation.webp";
import nodeYouth from "@/assets/images/bcf/optimized/board-chief/youth-1985.webp";
import nodeEducation from "@/assets/images/PrimeMinistir/education.webp";
import nodeSecurity from "@/assets/images/PrimeMinistir/security.webp";
import nodeService from "@/assets/images/PrimeMinistir/service.webp";
import nodeCabinet from "@/assets/images/PrimeMinistir/2019.webp";

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
  nodeOrigins,
  nodeYouth,
  nodeEducation,
  nodeSecurity,
  nodeService,
  nodeCabinet,
];

const NODE_FOCUS = [
  "50% 28%",
  "50% 18%",
  "50% 24%",
  "28% 26%",
  "50% 30%",
  "50% 22%",
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
        backgroundImage={bcfTrustBg}
        overlayClassName="bg-black/35"
      >
        <div className="relative flex min-h-[1920px] flex-col px-12 pb-12 pt-[136px]">
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
              {bcfDigits(chief.timelineRange, lang)}
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
            lang={lang}
          />
        </div>
      </BcfShell>
    );
  }

  return (
    /* The photograph is the head of the page now rather than a blurred plate
       behind it. Below the hero the scene falls back to the same deep-field
       gradient the timeline reads on, so the filmstrip has nothing competing
       with it. */
    <BcfShell
      key="chief-profile"
      showLogo={false}
      backgroundImage={bcfTrustBg}
      overlayClassName="bg-black/35"
    >
      {/* Every block below is sized so the column lands inside the 1920 artboard
          in all three languages. It used to run 2101px, and the canvas scrolls
          whatever it cannot fit — on a kiosk that means the CTA is off-screen
          until someone drags a page nobody expects to move. */}
      <div className="relative flex min-h-[1920px] flex-col items-center pb-14">
        <BcfBackButton onClick={onBack} label={c.back} />

        <BcfProfileHero
          image={heroPortrait}
          name={chief.name}
          role={chief.role}
          meta={chief.meta}
          align="start"
          height={700}
          objectPosition="50% 42%"
        />

        <BcfFilmstrip
          className="mt-8"
          images={SLIDE_IMAGES}
          alts={chief.slides.map((slide) => slide.caption)}
          rtl={rtl}
          controls
          width={1080}
        />

        <motion.p
          className={`mt-9 max-w-[840px] px-12 text-center text-[25px] text-white/70 ${
            lang === "en" ? "leading-relaxed" : "leading-[1.85]"
          }`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease: BCF_EASE }}
        >
          {chief.intro}
        </motion.p>

        {/* Outlined rather than the filled gold slab it used to be. On this page
            the gold now belongs to the plate in the film gate, and a solid gold
            bar under it was the brightest object on a screen whose subject is
            the photograph. */}
        <motion.button
          type="button"
          onClick={onOpenTimeline}
          whileTap={BCF_TAP_FIRM}
          className="mt-10 flex w-full max-w-[740px] transform-gpu items-center justify-between gap-6 rounded-full py-5 ps-12 pe-5 text-start backdrop-blur-md"
          style={{
            border: "1px solid rgba(255,255,255,0.30)",
            backgroundColor: "rgba(0,0,0,0.42)",
            boxShadow: "0 18px 46px rgba(0,0,0,0.45)",
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...BCF_TAP_TRANSITION, duration: 0.7, delay: 0.66, ease: BCF_EASE }}
        >
          <span
            className="text-[30px] font-medium leading-tight"
            style={{ color: BCF.cream }}
          >
            {chief.timelineCta}
          </span>
          <span
            className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-full border"
            style={{ borderColor: `${BCF.gold}8c` }}
          >
            <ArrowRight
              className="h-8 w-8 rtl:rotate-180"
              style={{ color: BCF.sand }}
            />
          </span>
        </motion.button>
      </div>
    </BcfShell>
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
export function GovernanceTimeline({
  milestones,
  rtl,
  lang,
  nodeImages = NODE_IMAGES,
}: {
  milestones: { id: string; year: string; title: string; body: string }[];
  rtl: boolean;
  lang: BcfLang;
  nodeImages?: string[];
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
                src={nodeImages[index % nodeImages.length]}
                alt=""
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: NODE_FOCUS[index % NODE_FOCUS.length] }}
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
                {bcfDigits(milestone.year, lang)}
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
