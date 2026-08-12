import React from "react";
import { motion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import {
  GovernanceTimeline,
} from "@/components/Sections/bcf/BcfBoardChief";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_FIELD_BG } from "@/components/Sections/bcf/bcfTheme";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import {
  BCF_EASE,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
  bcfBloom,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
/** Placeholder portrait until a dedicated crop is commissioned. */
import presidentPortrait from "@/assets/images/bcf/optimized/administration/fff.webp";

export type PresidentView = "profile" | "timeline";

type BcfPresidentProps = {
  lang: BcfLang;
  view: PresidentView;
  onOpenTimeline: () => void;
  onBack: () => void;
};

const PLATE_CLIP =
  "polygon(32px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0 calc(100% - 32px), 0 32px)";

const NODE_IMAGES = [
  presidentPortrait,
  presidentPortrait,
  presidentPortrait,
  presidentPortrait,
  presidentPortrait,
];

/**
 * BCF President — profile biography and career timeline, mirroring the Board
 * Chief chapter layout.
 */
export default function BcfPresident({
  lang,
  view,
  onOpenTimeline,
  onBack,
}: BcfPresidentProps) {
  const c = bcfCopy[lang];
  const president = c.bcfPresident;
  const rtl = lang !== "en";

  if (view === "timeline") {
    return (
      <BcfShell
        key="president-timeline"
        showLogo={false}
        overlayClassName="bg-black/0"
        backgroundStyle={{ background: BCF_FIELD_BG }}
      >
        <div className="relative flex min-h-[1920px] flex-col px-12 pb-12 pt-28">
          <BcfBackButton onClick={onBack} label={c.back} />

          <motion.div
            className="relative z-10 flex w-full items-end justify-between gap-8 px-6"
            variants={bcfStagger(0.1, 0.16)}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={bcfRise}
              className="max-w-[720px] text-start text-[62px] font-bold leading-none"
              style={{ color: BCF.cream }}
            >
              {president.timelineTitle}
            </motion.h1>
            <motion.span
              variants={bcfRise}
              className="pb-2 text-[34px] font-medium tabular-nums"
              style={{ color: BCF.gold }}
            >
              {bcfDigits(president.timelineRange, lang)}
            </motion.span>
          </motion.div>

          <motion.span
            className="relative z-10 mx-6 mt-8 block h-px origin-left"
            style={{
              background: `linear-gradient(90deg, ${BCF.gold}, ${BCF.gold}22)`,
            }}
            initial={{
              opacity: 0,
              scaleX: 0,
              transformOrigin: rtl ? "right" : "left",
            }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.85, delay: 0.22, ease: BCF_EASE }}
          />

          <GovernanceTimeline
            milestones={president.timelineMilestones}
            rtl={rtl}
            lang={lang}
            nodeImages={NODE_IMAGES}
          />
        </div>
      </BcfShell>
    );
  }

  return (
    <BcfShell
      key="president-profile"
      showLogo={false}
      overlayClassName="bg-black/0"
      backgroundStyle={{ background: BCF_FIELD_BG }}
    >
      <div className="relative flex min-h-[1920px] flex-col items-center px-12 pb-12 pt-20">
        <BcfBackButton onClick={onBack} label={c.back} />

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
          <span
            className="pointer-events-none absolute inset-[9px]"
            style={{
              border: `1px solid ${BCF.gold}2e`,
              clipPath:
                "polygon(26px 0, calc(100% - 26px) 0, 100% 26px, 100% calc(100% - 26px), calc(100% - 26px) 100%, 26px 100%, 0 calc(100% - 26px), 0 26px)",
            }}
          />
          <h1
            className="text-[44px] font-bold leading-tight"
            style={{ color: BCF.cream }}
          >
            {president.name}
          </h1>
          <p className="mt-3 text-[26px] font-medium" style={{ color: BCF.gold }}>
            {president.role}
          </p>
          <p className="mt-2 text-[20px] text-white/50">{president.meta}</p>
        </motion.div>

        <motion.div
          className="mt-8 h-[320px] w-[320px] overflow-hidden rounded-full border-2"
          style={{
            borderColor: BCF.gold,
            boxShadow: `0 28px 70px rgba(0,0,0,0.55), 0 0 48px ${BCF.gold}22`,
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.28, ease: BCF_EASE }}
        >
          <img
            src={presidentPortrait}
            alt=""
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="mt-8 flex w-full max-w-[920px] flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.46, ease: BCF_EASE }}
        >
          <h2
            className="text-[32px] font-semibold leading-tight"
            style={{ color: BCF.gold }}
          >
            {president.introTitle}
          </h2>
          <p className="whitespace-pre-line text-[24px] leading-relaxed text-white/75">
            {president.intro}
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onOpenTimeline}
          whileTap={BCF_TAP_FIRM}
          className="mt-10 w-full max-w-[580px] transform-gpu rounded-full px-12 py-6 text-[29px] font-semibold"
          style={{
            background:
              "linear-gradient(165deg, #e2b66a 0%, #b07a2e 60%, #8a5c1c 100%)",
            color: "#2a1808",
            boxShadow: `0 18px 46px rgba(0,0,0,0.5), 0 0 40px ${BCF.gold}22`,
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...BCF_TAP_TRANSITION,
            duration: 0.7,
            delay: 0.62,
            ease: BCF_EASE,
          }}
        >
          {president.timelineCta}
        </motion.button>
      </div>
    </BcfShell>
  );
}
