import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Hand } from "lucide-react";

import { bcfCopy } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  bcfScene,
  bcfSceneReduced,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfIntroBg, bcfLogo } from "@/components/Sections/bcf/bcfAssets";

type BcfAttractProps = {
  onEnter: () => void;
};

/** Quiet hold before the touch cue appears. */
const TOUCH_CUE_MS = 5000;

/**
 * Kiosk rest plate: photography and the lockup only. After a short hold a
 * touch mark fades in — no caption, no “start” copy. One tap anywhere opens
 * the language choice.
 */
export default function BcfAttract({ onEnter }: BcfAttractProps) {
  const reduceMotion = useReducedMotion();
  const [cueVisible, setCueVisible] = React.useState(Boolean(reduceMotion));

  React.useEffect(() => {
    if (reduceMotion) {
      setCueVisible(true);
      return;
    }
    const id = window.setTimeout(() => setCueVisible(true), TOUCH_CUE_MS);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  return (
    <motion.section
      className="relative flex h-full min-h-[1920px] w-full flex-col overflow-hidden bg-[#0a0a0a] text-white"
      variants={reduceMotion ? bcfSceneReduced : bcfScene}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={bcfIntroBg}
          alt=""
          decoding="async"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,6,9,0.42) 0%, rgba(4,6,9,0.12) 36%, rgba(4,6,9,0.28) 68%, rgba(4,6,9,0.72) 100%)",
          }}
        />
      </div>

      <button
        type="button"
        className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
        onClick={onEnter}
        aria-label={bcfCopy.en.attractStart}
      />

      <div className="pointer-events-none relative z-20 flex min-h-[1920px] flex-col items-center px-16 pt-[160px]">
        <motion.img
          src={bcfLogo}
          alt="Barzani Charity Foundation"
          decoding="async"
          fetchpriority="high"
          className="h-[300px] w-auto"
          style={{
            filter: `drop-shadow(0 0 60px ${BCF.gold}44) drop-shadow(0 12px 30px rgba(0,0,0,0.5))`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: BCF_EASE, delay: 0.15 }}
        />

        <div className="absolute inset-x-0 bottom-[240px] flex items-center justify-center">
          {cueVisible ? (
            <motion.span
              className="relative grid h-[140px] w-[140px] place-items-center rounded-full border"
              style={{
                borderColor: `${BCF.gold}55`,
                backgroundColor: "rgba(10,12,16,0.22)",
              }}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 3.4, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <Hand
                className="h-16 w-16"
                strokeWidth={1.4}
                style={{ color: BCF.gold }}
              />
            </motion.span>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
