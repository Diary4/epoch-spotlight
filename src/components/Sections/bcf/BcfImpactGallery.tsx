import React from "react";
import { motion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import DomeGallery from "@/components/Sections/bcf/DomeGallery";
import {
  IMPACT_GALLERY_IMAGES,
} from "@/components/Sections/bcf/bcfImpactGalleries";
import { bcfCopy, type BcfLang, type ImpactGalleryId } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";

type BcfImpactGalleryProps = {
  lang: BcfLang;
  galleryId: ImpactGalleryId;
  onBack: () => void;
};

/** Shared dark field — matches `BCF_PAGE` so shell and dome edge-fades read as one. */
const DOME_BG = "#0a0a0a";

/**
 * Impact statistic gallery — same dome browser as the Human Story Layer, but
 * filled with the photography inside each BCF field folder.
 *
 * The employees set is large (~300 portraits). It uses a bigger dome and fewer
 * segments so each headshot reads clearly on the kiosk instead of a fine grain.
 */
export default function BcfImpactGallery({
  lang,
  galleryId,
  onBack,
}: BcfImpactGalleryProps) {
  const c = bcfCopy[lang];
  const item =
    c.impactItems.find((entry) => entry.id === galleryId) ?? c.impactItems[0];
  const images = IMPACT_GALLERY_IMAGES[galleryId];
  const isEmployees = galleryId === "employees";

  return (
    <BcfShell
      showLogo={false}
      atmosphere={false}
      backgroundStyle={{ backgroundColor: DOME_BG }}
    >
      <div className="relative flex min-h-[1920px] flex-col" style={{ backgroundColor: DOME_BG }}>
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          className={`relative z-20 mx-auto flex w-full max-w-[900px] flex-col items-center px-12 text-center ${
            isEmployees ? "pt-24" : "pt-28"
          }`}
          variants={bcfStagger(0.1, 0.16)}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={bcfRise}
            className={`font-bold leading-tight ${
              isEmployees ? "text-[56px]" : "text-[64px]"
            }`}
            style={{ color: BCF.gold }}
          >
            {item.title}
          </motion.h1>
          <motion.span
            variants={bcfDrawX}
            className={`block h-px w-[320px] ${isEmployees ? "mt-5" : "mt-7"}`}
            style={{
              background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
            }}
          />
          {!isEmployees ? (
            <>
              <motion.p
                variants={bcfRise}
                className="mt-8 text-[30px] leading-relaxed text-[#fdeed4]"
              >
                {item.description}
              </motion.p>
              <motion.p
                variants={bcfRise}
                className="mt-6 text-[24px] tracking-[0.16em] text-white/45"
              >
                {c.tapToExplore}
              </motion.p>
            </>
          ) : (
            <motion.p
              variants={bcfRise}
              className="mt-5 text-[22px] tracking-[0.16em] text-white/45"
            >
              {c.tapToExplore}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className={`relative z-10 w-full ${
            isEmployees ? "mt-2 h-[1620px]" : "mt-4 h-[1440px]"
          }`}
          style={{ backgroundColor: DOME_BG }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: BCF_EASE }}
        >
          <DomeGallery
            images={images}
            segments={
              isEmployees
                ? Math.max(38, Math.min(44, Math.ceil(images.length / 7)))
                : 35
            }
            fit={isEmployees ? 1.55 : 1}
            fitBasis={isEmployees ? "max" : "width"}
            minRadius={isEmployees ? 1400 : 900}
            imageBorderRadius="24px"
            overlayBlurColor={DOME_BG}
            grayscale={false}
            openedImageWidth="820px"
            openedImageHeight="1180px"
            openedImageBorderRadius="28px"
          />
        </motion.div>
      </div>
    </BcfShell>
  );
}
