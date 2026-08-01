import React from "react";
import { motion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE, bcfRise, bcfStagger } from "@/components/Sections/bcf/bcfMotion";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";
import detailBg from "@/assets/images/women/w-4.webp";
import BcfDomeGallery, { type BcfDomeSlide } from "@/components/Sections/bcf/BcfDomeGallery";
import {
  bcfCorridor,
  bcfErbil,
  bcfMapBg,
  bcfProjectHero,
  bcfProjectsBg,
  bcfWelcomeBg,
} from "@/components/Sections/bcf/bcfAssets";

type BcfProjectDetailProps = {
  lang: BcfLang;
  locationId: LocationId;
  projectId: ProjectId;
  onBack: () => void;
};

export default function BcfProjectDetail({
  lang,
  locationId,
  projectId,
  onBack,
}: BcfProjectDetailProps) {
  const c = bcfCopy[lang];
  const project =
    c.projects[locationId].find((p) => p.id === projectId) ?? c.projects[locationId][0];
  const cityName = c.locations[locationId].name;
  const gallerySlides: BcfDomeSlide[] = [
    {
      image: bcfProjectHero,
      title: project.title,
      caption: project.summary,
    },
    {
      image: bcfProjectsBg,
      title: cityName,
      caption: `${project.stat1Value} ${project.stat1Label}`,
    },
    {
      image: bcfMapBg,
      title: cityName,
      caption: `${project.stat2Value} ${project.stat2Label}`,
    },
    {
      image: bcfErbil,
      title: c.projectsIn,
      caption: `${cityName} - ${project.title}`,
    },
    {
      image: bcfCorridor,
      title: c.ourImpact,
      caption: project.summary,
    },
    {
      image: bcfWelcomeBg,
      title: c.changing,
      caption: c.livesEveryday,
    },
  ];

  return (
    <BcfShell
      backgroundImage={detailBg}
      overlayClassName="bg-gradient-to-t from-black via-black/45 to-black/15"
    >
      <div className="relative flex min-h-[1920px] flex-col items-center justify-center px-14 py-28">
        <BcfBackButton onClick={onBack} label={c.back} />

        {/* The gallery arrived with no title over it, so the visitor lost track
            of which project they had opened the moment the list left. */}
        <motion.div
          className="absolute inset-x-14 top-40 z-20 text-center"
          variants={bcfStagger(0.1, 0.18)}
          initial="initial"
          animate="animate"
        >
          <motion.p
            variants={bcfRise}
            className="text-[28px] tracking-[0.2em]"
            style={{ color: BCF.nature }}
          >
            {cityName}
          </motion.p>
          <motion.h1
            variants={bcfRise}
            className="mt-4 text-[56px] font-bold leading-tight"
            style={{ color: BCF.creamSoft }}
          >
            {project.title}
          </motion.h1>
          <motion.span
            variants={bcfRise}
            className="mx-auto mt-7 block h-px w-[300px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
            }}
          />
        </motion.div>

        <motion.div
          className="w-full max-w-[1240px]"
          initial={{ opacity: 0, scale: 0.965 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease: BCF_EASE }}
        >
          <BcfDomeGallery slides={gallerySlides} />
        </motion.div>
      </div>
    </BcfShell>
  );
}
