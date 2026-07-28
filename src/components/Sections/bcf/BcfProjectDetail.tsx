import React from "react";
import { ChevronLeft } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
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
        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div className="w-full max-w-[1240px]">
          <BcfDomeGallery slides={gallerySlides} />
        </div>
      </div>
    </BcfShell>
  );
}
