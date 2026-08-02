import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import DomeGallery, {
  type DomeImage,
} from "@/components/Sections/bcf/DomeGallery";
import {
  bcfCopy,
  type BcfLang,
  type HumanStoryId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import school from "@/assets/images/PrimeMinistir/education.webp";
import shelter from "@/assets/images/PrimeMinistir/infrastructure.webp";
import care from "@/assets/images/PrimeMinistir/service.webp";
import displaced from "@/assets/images/PrimeMinistir/isis.webp";
import skills from "@/assets/images/PrimeMinistir/job.webp";
import cash from "@/assets/images/PrimeMinistir/economic.webp";
import autism from "@/assets/images/women/w-4.webp";
import recovery from "@/assets/images/PrimeMinistir/formation.webp";

type BcfHumanStoriesProps = {
  lang: BcfLang;
  onBack: () => void;
};

const STORY_IMAGES: Record<HumanStoryId, string> = {
  school,
  shelter,
  care,
  displaced,
  skills,
  cash,
  autism,
  recovery,
};

/** The dome's own dark field — the scene carries no photograph behind it. */
const DOME_BG = "#0d0b09";

/**
 * Human Stories — every project begins with a human need and ends with a human
 * story, so the eight story categories are a dome of photographs a visitor can
 * spin, and any tile opens the work that stands behind it.
 */
export default function BcfHumanStories({ lang, onBack }: BcfHumanStoriesProps) {
  const c = bcfCopy[lang];
  const stories = c.humanStories;
  const [openId, setOpenId] = React.useState<HumanStoryId | null>(null);
  const open = stories.find((story) => story.id === openId) ?? null;

  const images = React.useMemo<DomeImage[]>(
    () =>
      stories.map((story) => ({
        src: STORY_IMAGES[story.id],
        alt: story.title,
      })),
    [stories],
  );

  /** Tiles repeat around the sphere, so a tap resolves back through its src. */
  const openBySrc = React.useCallback(
    (src: string) => {
      const match = stories.find((story) => src.endsWith(STORY_IMAGES[story.id]));
      if (match) setOpenId(match.id);
    },
    [stories],
  );

  const goBack = () => {
    if (openId) {
      setOpenId(null);
      return;
    }
    onBack();
  };

  return (
    <BcfShell showLogo={false} backgroundStyle={{ backgroundColor: DOME_BG }}>
      <div className="relative flex min-h-[1920px] flex-col">
        <BcfBackButton onClick={goBack} label={c.back} />

        <motion.div
          className="relative z-20 mx-auto flex w-full max-w-[900px] flex-col items-center px-12 pt-28 text-center"
          variants={bcfStagger(0.1, 0.16)}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={bcfRise}
            className="text-[64px] font-bold leading-tight"
            style={{ color: BCF.gold }}
          >
            {c.humanStoriesTitle}
          </motion.h1>
          <motion.span
            variants={bcfDrawX}
            className="mt-7 block h-px w-[320px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
            }}
          />
          <motion.p
            variants={bcfRise}
            className="mt-8 text-[30px] leading-relaxed text-[#fdeed4]"
          >
            {c.humanStoriesTagline}
          </motion.p>
          <motion.p
            variants={bcfRise}
            className="mt-6 text-[24px] tracking-[0.16em] text-white/45"
          >
            {c.tapToExplore}
          </motion.p>
        </motion.div>

        {/* The dome takes the rest of the panel. Default reactbits styling —
            its own overlays and edge fades are what frame it, so there is no
            photograph behind the scene. */}
        {/* Explicit height: `.sphere-root` sizes at 100%, and a flex-derived
            height would let the dome collapse to nothing. */}
        <motion.div
          className="relative z-10 mt-8 h-[1480px] w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: BCF_EASE }}
        >
          <DomeGallery
            images={images}
            overlayBlurColor={DOME_BG}
            onItemClick={openBySrc}
          />
        </motion.div>

        {/* Detail page for the chosen story. */}
        <AnimatePresence>
          {open ? (
            <motion.div
              className="absolute inset-0 z-40 flex items-center justify-center px-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenId(null)}
            >
              <div
                className="absolute inset-0 backdrop-blur-[3px]"
                style={{ backgroundColor: "rgba(4,6,9,0.8)" }}
              />

              <motion.article
                role="dialog"
                aria-modal="true"
                aria-label={open.title}
                onClick={(event) => event.stopPropagation()}
                className={`${BCF_GLASS_CARD} relative w-full max-w-[860px] overflow-hidden`}
                initial={{ opacity: 0, scale: 0.95, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 16 }}
                transition={{ duration: 0.44, ease: BCF_EASE }}
                style={{ boxShadow: "0 44px 120px rgba(0,0,0,0.66)" }}
              >
                <img
                  src={STORY_IMAGES[open.id]}
                  alt=""
                  decoding="async"
                  className="h-[520px] w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,6,9,0.3) 0%, rgba(4,6,9,0.1) 45%, rgba(0,0,0,0.9) 100%)",
                  }}
                />

                <div className="p-12 pt-10">
                  <h2
                    className="text-[52px] font-semibold leading-tight"
                    style={{ color: BCF.gold }}
                  >
                    {open.title}
                  </h2>
                  <p className="mt-8 text-[32px] leading-relaxed text-[#fdeed4]">
                    {open.body}
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setOpenId(null)}
                  whileTap={BCF_TAP}
                  transition={BCF_TAP_TRANSITION}
                  className="absolute end-7 top-7 grid h-16 w-16 transform-gpu place-items-center rounded-full border border-white/30 bg-black/55 backdrop-blur-md will-change-transform"
                  aria-label={c.close}
                >
                  <X className="h-8 w-8 text-white" />
                </motion.button>
              </motion.article>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </BcfShell>
  );
}
