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

/** The dome's own dark field — same treatment as Human Stories. */
const DOME_BG = "#0d0b09";

/**
 * Impact statistic gallery — same dome browser as the Human Story Layer, but
 * filled with the photography inside each BCF field folder.
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

  return (
    <BcfShell showLogo={false} backgroundStyle={{ backgroundColor: DOME_BG }}>
      <div className="relative flex min-h-[1920px] flex-col">
        <BcfBackButton onClick={onBack} label={c.back} />

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
            {item.title}
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
            {item.description}
          </motion.p>
          <motion.p
            variants={bcfRise}
            className="mt-6 text-[24px] tracking-[0.16em] text-white/45"
          >
            {c.tapToExplore}
          </motion.p>
        </motion.div>

        <motion.div
          className="relative z-10 mt-4 h-[1440px] w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: BCF_EASE }}
        >
          <DomeGallery
            images={images}
            fit={1}
            fitBasis="width"
            minRadius={900}
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
