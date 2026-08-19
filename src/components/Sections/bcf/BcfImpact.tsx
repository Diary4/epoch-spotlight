import React from "react";
import { motion } from "motion/react";
import { Sun } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfStatValue from "@/components/Sections/bcf/BcfStatValue";
import {
  bcfCopy,
  type BcfLang,
  type ImpactGalleryId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
// Four distinct field photos, one per stat, in the same order as impactItems
// below — the two placeholders this replaced were reused twice each, which
// read as a stock pair rather than four counts of real work.
import cardEmployees from "@/assets/images/bcf/from-source/impact-employees.webp";
import cardCamps from "@/assets/images/bcf/from-source/impact-camps.webp";
import cardIdps from "@/assets/images/bcf/selected/impact-idps.webp";
import cardSchools from "@/assets/images/bcf/selected/impact-schools.webp";
import cardBeneficiaries from "@/assets/images/bcf/from-source/impact-beneficiaries.webp";
import cardFamilies from "@/assets/images/bcf/from-source/impact-families.webp";

type BcfImpactProps = {
  lang: BcfLang;
  onBack: () => void;
  onOpenGallery: (id: ImpactGalleryId) => void;
};

const CARD_IMAGES: Record<ImpactGalleryId, string> = {
  employees: cardEmployees,
  camps: cardCamps,
  idps: cardIdps,
  schools: cardSchools,
};

/** Headline reach figures published on BCF's impact strip. */
const IMPACT_TOTALS = [
  {
    id: "families",
    value: "10,208,103",
    image: cardFamilies,
  },
  {
    id: "people",
    value: "56,906,790",
    image: cardBeneficiaries,
  },
] as const;

/**
 * Our Impact — Figma grid: totals plus 2×2 photo stat cards.
 * Each card opens a dome gallery of the photography in its BCF field folder.
 */
export default function BcfImpact({
  lang,
  onBack,
  onOpenGallery,
}: BcfImpactProps) {
  const c = bcfCopy[lang];
  const enItems = bcfCopy.en.impactItems;

  return (
    <BcfShell
      showLogo={false}
      overlayClassName="bg-black/0"
      backgroundStyle={{
        background:
          "radial-gradient(900px 800px at 110% 35%, rgba(40,70,140,0.35), transparent 55%), linear-gradient(180deg, #0b0d14 0%, #0a0a0a 55%, #14100a 100%)",
      }}
    >
      <div className="relative flex min-h-[1920px] flex-col overflow-hidden px-14 pb-20 pt-[136px]">
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          className="relative z-10 max-w-[820px]"
          variants={bcfStagger(0.1, 0.16)}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={bcfRise}
            className="text-[80px] font-bold leading-none tracking-[0.01em]"
          >
            <span className="text-[#fbf4e4]">{c.impactTitleLead} </span>
            <span style={{ color: BCF.gold }}>{c.impactTitleGold}</span>
          </motion.h1>
          <motion.span
            variants={bcfDrawX}
            className="mt-5 block h-px w-[240px] origin-left"
            style={{
              background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
            }}
          />
          <motion.p
            variants={bcfRise}
            className="mt-8 max-w-[720px] text-[28px] leading-relaxed text-white/80"
          >
            {c.impactSubtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="relative z-10 mt-14 flex w-full flex-col gap-7"
          variants={bcfStagger(0.1, 0.34)}
          initial="initial"
          animate="animate"
        >
          <div className="grid grid-cols-2 gap-7">
            {IMPACT_TOTALS.map((stat, index) => {
              const copy =
                c.impactTotals.find((item) => item.id === stat.id) ??
                c.impactTotals[index];
              return (
              <motion.div
                key={stat.id}
                variants={bcfRiseCard}
                className="relative flex h-[460px] flex-col overflow-hidden rounded-[28px] border border-white/15 text-left"
                style={{ boxShadow: "0 22px 60px rgba(0,0,0,0.45)" }}
              >
                <img
                  src={stat.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />

                <div className="relative z-10 flex h-full flex-col p-9">
                  <div className="flex items-start justify-end">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full border"
                      style={{ borderColor: `${BCF.gold}88`, color: BCF.gold }}
                    >
                      <Sun className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-auto">
                    <BcfStatValue
                      value={stat.value}
                      lang={lang}
                      className="text-[76px] font-semibold leading-none"
                      color="#fbf4e4"
                      duration={2.8}
                      delay={0.2 + index * 0.12}
                      smooth
                    />
                    <motion.span
                      aria-hidden="true"
                      className="mt-5 block h-px w-[88px] origin-left"
                      style={{
                        background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.45 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <p className="mt-4 text-[34px] font-medium" style={{ color: BCF.gold }}>
                      {copy.title}
                    </p>
                    <span className="mt-5 block border-t border-dashed border-white/30" />
                    <p className="mt-5 text-[24px] leading-snug text-white/80">
                      {copy.description}
                    </p>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-7">
            {c.impactItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                variants={bcfRiseCard}
                onClick={() => onOpenGallery(item.id)}
                whileTap={BCF_TAP}
                transition={BCF_TAP_TRANSITION}
                className="relative flex h-[460px] transform-gpu flex-col overflow-hidden rounded-[28px] border border-white/15 text-left"
                style={{ boxShadow: "0 22px 60px rgba(0,0,0,0.45)" }}
              >
                <img
                  src={CARD_IMAGES[item.id]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />

                <div className="relative z-10 flex h-full flex-col p-9">
                  <div className="flex items-start justify-end">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full border"
                      style={{ borderColor: `${BCF.gold}88`, color: BCF.gold }}
                    >
                      <Sun className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-auto">
                    <BcfStatValue
                      value={enItems[index]?.value ?? item.value}
                      lang={lang}
                      className="text-[76px] font-semibold leading-none"
                      color="#fbf4e4"
                      duration={2.8}
                      delay={0.28 + index * 0.18}
                      smooth
                    />
                    <motion.span
                      aria-hidden="true"
                      className="mt-5 block h-px w-[88px] origin-left"
                      style={{
                        background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.55 + index * 0.18,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <p className="mt-4 text-[34px] font-medium" style={{ color: BCF.gold }}>
                      {item.title}
                    </p>
                    <span className="mt-5 block border-t border-dashed border-white/30" />
                    <p className="mt-5 text-[24px] leading-snug text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </BcfShell>
  );
}
