import React from "react";
import { motion, useReducedMotion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type JourneyChapterId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import {
  bcfJourneyBg,
  bcfJourneyStory,
  bcfJourneyHumanity,
  bcfJourneyMap,
  bcfJourneyImpact,
  bcfJourneyTrust,
  bcfJourneyFuture,
} from "@/components/Sections/bcf/bcfAssets";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";

type BcfSectionsProps = {
  lang: BcfLang;
  onBack: () => void;
  onSelect: (id: JourneyChapterId) => void;
};

const thumbs: Record<JourneyChapterId, string> = {
  story: bcfJourneyStory,
  humanity: bcfJourneyHumanity,
  map: bcfJourneyMap,
  impact: bcfJourneyImpact,
  trust: bcfJourneyTrust,
  future: bcfJourneyFuture,
};

/**
 * Reading order, which is not the order `journeyChapters` is authored in.
 * The numbers printed on the cards are this list's index — they are the
 * chapter's position in the walk, so the order lives here rather than in the
 * copy, where a translator reordering a list would renumber the experience.
 */
const ORDER: JourneyChapterId[] = [
  "story",
  "humanity",
  "map",
  "impact",
  "trust",
  "future",
];

/**
 * Vertical focus per chapter, as an `object-position` Y.
 *
 * The journey art is six 560×560 square centre-crops, and a card window is
 * 340×190 — so `object-cover` keeps a band 56% of the source's height and
 * throws the rest away. At a flat 50% that band runs 22%–78%, which decapitates
 * the Our Story portrait (his face sits at 13%) and cuts the hospital sign off
 * the Trust plate. These are the point of each photograph, measured, not
 * guessed: 0% pins the band to the top of the source, 100% to the bottom.
 */
const FOCUS: Record<JourneyChapterId, string> = {
  story: "0%",
  humanity: "16%",
  map: "41%",
  impact: "18%",
  trust: "32%",
  future: "41%",
};

/* -------------------------------------------------------------------------
 * Geometry (1080×1920 artboard)
 *
 * The cards descend a single spine, alternating which side of it they hang
 * from. Every card still crosses the centre line, so the thread between them
 * runs dead straight down the middle rather than zig-zagging — the stagger is
 * in the cards, not in the path connecting them.
 * ---------------------------------------------------------------------- */

const CARD_W = 620;
const CARD_H = 190;
const CARD_GAP = 43;
const FIRST_TOP = 414;
/** How far a card sits in from whichever edge it hangs off. */
const SIDE_INSET = 150;
const SPINE_X = 540;
/** Share of the card the photograph covers before the gradient takes it. */
const PHOTO_W = 340;

const cardTop = (index: number) => FIRST_TOP + index * (CARD_H + CARD_GAP);

export default function BcfSections({ lang, onBack, onSelect }: BcfSectionsProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const rtl = lang !== "en";
  const [activeId, setActiveId] = React.useState<JourneyChapterId>("story");

  return (
    <BcfShell
      showLogo={false}
      backgroundImage={bcfJourneyBg}
      /* The plate is a dark valley with a gold ridge; this depth keeps the
         silhouette behind the cards without washing out the sunlight. */
      overlayClassName="bg-black/55"
    >
      <div className="relative min-h-[1920px] w-full overflow-hidden">
        {/* Local dark lift under the header so the title stays readable over
            whatever part of the ridge line sits behind it. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[460px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,6,9,0.82) 0%, rgba(4,6,9,0.42) 58%, transparent 100%)",
          }}
        />

        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          className="absolute inset-x-0 top-[128px] z-20 flex flex-col items-center"
          variants={bcfStagger(0.09, 0.14)}
          initial="initial"
          animate="animate"
        >
          <motion.p
            variants={bcfRise}
            className="text-[24px] font-medium uppercase tracking-[0.28em]"
            style={{ color: BCF.gold }}
          >
            {c.journeyEyebrow}
          </motion.p>

          {/* One colour across the whole title. The gold on this screen belongs
              to the eyebrow and the chapter numbers; a gold half-title as well
              put three competing accents in the top third of the page. */}
          <motion.h1
            variants={bcfRise}
            className="mt-5 text-[68px] font-semibold leading-[1.06]"
            style={{
              color: "#fff6e6",
              textShadow: "0 8px 28px rgba(0,0,0,0.65)",
            }}
          >
            {c.journeyTitleLead} {c.journeyTitleGold}
          </motion.h1>

          <motion.div
            variants={bcfDrawX}
            className="mt-6 flex w-[330px] items-center gap-3"
          >
            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${BCF.gold}b3)`,
              }}
            />
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: BCF.goldBright }}
            />
            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${BCF.gold}b3, transparent)`,
              }}
            />
          </motion.div>

          <motion.p
            variants={bcfRise}
            className="mt-5 text-[25px] text-white/45"
          >
            {c.journeySubtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20"
          variants={bcfStagger(0.1, 0.42)}
          initial="initial"
          animate="animate"
        >
          {ORDER.map((id, index) => {
            const chapter = c.journeyChapters.find((ch) => ch.id === id);
            if (!chapter) return null;
            const top = cardTop(index);

            return (
              <React.Fragment key={id}>
                {index > 0 ? (
                  <SpineLink
                    top={top - CARD_GAP}
                    delay={0.5 + index * 0.1}
                    reduceMotion={reduceMotion}
                  />
                ) : null}

                <ChapterCard
                  top={top}
                  /* Odd cards hang off the start edge, even off the end, so the
                     column reads as a descent rather than a list. Logical
                     insets, so the stagger mirrors with the language. */
                  fromStart={index % 2 === 0}
                  number={bcfDigits(String(index + 1).padStart(2, "0"), lang)}
                  title={chapter.title}
                  image={thumbs[id]}
                  focus={FOCUS[id]}
                  rtl={rtl}
                  active={activeId === id}
                  onActivate={() => setActiveId(id)}
                  onSelect={() => {
                    setActiveId(id);
                    onSelect(id);
                  }}
                />
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </BcfShell>
  );
}

/** Wide enough to hold the bead's halo without clipping it. */
const LINK_W = 64;

/**
 * The thread between two cards: a lit filament down the spine with a bead on
 * it. The bead is what makes the six cards read as one route — without it the
 * gaps are just gaps.
 *
 * The light is painted, not filtered. Every glow here is a `box-shadow` or a
 * radial gradient rather than a `blur()`, because five of these are on screen
 * at once and a filtered layer is one Chrome draws to a texture and convolves
 * before it can composite — the same reason the halos on the constellation
 * this replaced had to lose their `blur-2xl`.
 */
function SpineLink({
  top,
  delay,
  reduceMotion,
}: {
  top: number;
  delay: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute z-10 flex flex-col items-center"
      style={{ left: SPINE_X - LINK_W / 2, top, height: CARD_GAP, width: LINK_W }}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.5, delay, ease: BCF_EASE }}
    >
      <span
        className="w-[2px] flex-1 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${BCF.gold}00, ${BCF.goldBright})`,
          boxShadow: `0 0 10px ${BCF.gold}b3, 0 0 22px ${BCF.gold}59`,
        }}
      />
      <span className="relative grid shrink-0 place-items-center">
        {/* Wide, soft falloff under the bead — this is the part that reads as
            glow from across the room; the shadows below only sharpen its core. */}
        <span
          className="absolute h-[46px] w-[46px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${BCF.gold}80 0%, ${BCF.gold}33 38%, transparent 72%)`,
          }}
        />
        <span
          className="relative h-[11px] w-[11px] rounded-full"
          style={{
            backgroundColor: "#fff2d4",
            boxShadow: `0 0 8px ${BCF.goldBright}, 0 0 20px ${BCF.gold}cc, 0 0 40px ${BCF.gold}80`,
          }}
        />
      </span>
      <span
        className="w-[2px] flex-1 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${BCF.goldBright}, ${BCF.gold}00)`,
          boxShadow: `0 0 10px ${BCF.gold}b3, 0 0 22px ${BCF.gold}59`,
        }}
      />
    </motion.span>
  );
}

const CARD_VARIANTS = {
  initial: { opacity: 0, y: 26 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: BCF_EASE },
  },
};

function ChapterCard({
  top,
  fromStart,
  number,
  title,
  image,
  focus,
  rtl,
  active,
  onActivate,
  onSelect,
}: {
  top: number;
  fromStart: boolean;
  number: string;
  title: string;
  image: string;
  focus: string;
  rtl: boolean;
  active: boolean;
  onActivate: () => void;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      variants={CARD_VARIANTS}
      onClick={onSelect}
      onPointerEnter={onActivate}
      onPointerDown={onActivate}
      whileTap={BCF_TAP}
      transition={BCF_TAP_TRANSITION}
      className="absolute z-20 transform-gpu overflow-hidden text-start"
      style={{
        top,
        width: CARD_W,
        height: CARD_H,
        [fromStart ? "insetInlineStart" : "insetInlineEnd"]: SIDE_INSET,
        borderRadius: 18,
        border: `1px solid ${active ? BCF.gold : `${BCF.gold}33`}`,
        background:
          "linear-gradient(100deg, rgba(9,8,6,0.94) 0%, rgba(12,10,7,0.86) 55%, rgba(12,10,7,0.55) 100%)",
        boxShadow: active
          ? `0 0 40px ${BCF.gold}2e, 0 22px 56px rgba(0,0,0,0.6)`
          : "0 18px 44px rgba(0,0,0,0.5)",
        transition:
          "border-color 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* The photograph is masked rather than scrimmed: a scrim leaves a hard
          vertical edge where the image stops, which on six stacked cards is six
          seams down the page. The mask direction follows the text, so in RTL
          the picture moves to the other end and fades the other way.

          It carries the card's own end-corner radii as well. A masked child is
          composited on its own layer, and it was escaping the parent's rounded
          `overflow-hidden` — a square photo corner poking past the gold border
          on every card. Logical corners, so they follow the picture when the
          layout mirrors. */}
      <span
        className="pointer-events-none absolute inset-y-0 end-0 block overflow-hidden"
        style={{
          width: PHOTO_W,
          borderStartEndRadius: 17,
          borderEndEndRadius: 17,
          maskImage: `linear-gradient(${rtl ? 270 : 90}deg, transparent 0%, rgba(0,0,0,0.5) 26%, #000 64%)`,
          WebkitMaskImage: `linear-gradient(${rtl ? 270 : 90}deg, transparent 0%, rgba(0,0,0,0.5) 26%, #000 64%)`,
        }}
      >
        <img
          src={image}
          alt=""
          decoding="async"
          className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-smooth-out motion-reduce:transition-none"
          style={{
            objectPosition: `50% ${focus}`,
            transform: active ? "scale(1.06)" : "scale(1)",
          }}
        />
        <span
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundColor: "rgba(4,6,9,0.28)",
            opacity: active ? 0 : 1,
          }}
        />
      </span>

      <span className="relative z-10 flex h-full flex-col justify-center ps-11 pe-8">
        <span
          className="text-[46px] font-light leading-none tabular-nums"
          style={{ color: BCF.gold }}
        >
          {number}
        </span>
        <span
          className="mt-4 max-w-[280px] text-[34px] font-semibold leading-tight"
          style={{ color: "#fff6e6" }}
        >
          {title}
        </span>
      </span>
    </motion.button>
  );
}
