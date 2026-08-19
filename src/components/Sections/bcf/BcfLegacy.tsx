import type React from "react";
import { motion, useReducedMotion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfFutureDetailBg } from "@/components/Sections/bcf/bcfAssets";
import pillarService from "@/assets/images/bcf/future/service-is-dignity.jpeg";
import pillarHumanity from "@/assets/images/bcf/future/human-responsibility.jpeg";
import pillarHope from "@/assets/images/bcf/future/hope-through-action.jpeg";

type BcfLegacyProps = {
  lang: BcfLang;
  onBack: () => void;
};

const PILLAR_IMAGES = [pillarService, pillarHumanity, pillarHope];

/**
 * Closing page — "A Legacy That Continues" (roadmap page 29).
 *
 * Same landscape plate as The Future We Build, with three pillars that arrive
 * on a stagger so the visitor feels the room settling rather than another list
 * opening.
 */
export default function BcfLegacy({ lang, onBack }: BcfLegacyProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();

  return (
    <BcfShell
      showLogo={false}
      backgroundImage={bcfFutureDetailBg}
      overlayClassName="bg-black/60"
    >
      <div className="relative flex min-h-[1920px] flex-col">
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          className="relative z-10 flex flex-1 flex-col px-14 pb-20 pt-[180px]"
          variants={bcfStagger(0.12, 0.2)}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={bcfRise}
            className="text-[92px] font-bold leading-[1.02]"
          >
            <span className="block text-[#fbf4e4]">{c.legacyTitleWhite}</span>
            <span className="block" style={{ color: BCF.gold }}>
              {c.legacyTitleGold}
            </span>
          </motion.h1>

          <motion.div
            variants={bcfDrawX}
            className="mt-9 flex w-[420px] max-w-full origin-left items-center gap-3 rtl:origin-right"
          >
            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${BCF.gold}, ${BCF.gold}22)`,
              }}
            />
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: BCF.gold }}
            />
          </motion.div>

          <motion.p
            variants={bcfRise}
            className="mt-10 max-w-[900px] text-[30px] leading-relaxed text-white/80"
          >
            {c.legacyLead}
          </motion.p>

          <motion.p
            variants={bcfRise}
            className="mt-7 max-w-[900px] text-[28px] leading-relaxed text-white/60"
          >
            {c.legacyBridge}
          </motion.p>

          {/* The three pillars. */}
          <div className="mt-12 flex flex-col gap-6">
            {c.legacyPillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                variants={bcfRiseCard}
                className="relative flex h-[170px] items-stretch overflow-hidden rounded-[26px] border"
                style={{
                  borderColor: "rgba(251,193,88,0.28)",
                  background:
                    "linear-gradient(100deg, rgba(18,14,8,0.95) 0%, rgba(12,11,10,0.9) 58%, rgba(12,11,10,0.4) 100%)",
                  boxShadow: "0 22px 56px rgba(0,0,0,0.5)",
                }}
              >
                <span className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-10">
                  <span className="text-[42px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#fbf4e4]">
                    {pillar.titleWhite}
                  </span>
                  <span
                    className="text-[42px] font-semibold uppercase leading-tight tracking-[0.04em]"
                    style={{ color: BCF.gold }}
                  >
                    {pillar.titleGold}
                  </span>
                </span>

                <span className="relative w-[280px] shrink-0 overflow-hidden">
                  <img
                    src={PILLAR_IMAGES[index % PILLAR_IMAGES.length]}
                    alt=""
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </span>
              </motion.div>
            ))}
          </div>

          {/* A last slow breath of gold under the pillars. */}
          {!reduceMotion ? (
            <span
              aria-hidden="true"
              className="bcf-breathe pointer-events-none absolute inset-x-0 bottom-0 h-[320px]"
              style={
                {
                  background: `radial-gradient(60% 100% at 50% 100%, ${BCF.gold}1f, transparent 70%)`,
                  "--breathe-from": "0.5",
                  "--breathe-to": "1",
                  "--breathe-duration": "7s",
                } as React.CSSProperties
              }
            />
          ) : null}
        </motion.div>
      </div>
    </BcfShell>
  );
}
