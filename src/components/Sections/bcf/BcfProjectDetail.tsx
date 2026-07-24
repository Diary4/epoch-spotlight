import React from "react";
import { ChevronLeft } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import detailBg from "@/assets/images/women/w-4.webp";

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

  return (
    <BcfShell>
      <img
        src={detailBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

      <div className="relative z-10 flex min-h-[1920px] flex-col justify-between px-12 pb-20 pt-36">
        <button
          type="button"
          onClick={onBack}
          className="flex w-fit items-center gap-2 rounded-full bg-black/40 px-5 py-3 text-[22px] text-white/85 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
          {c.back}
        </button>

        <div className={`${BCF_GLASS_CARD} mx-auto w-full max-w-[980px] p-10`}>
          <h1 className="text-[48px] font-semibold leading-tight text-white">{project.title}</h1>
          <p className="mt-5 text-[26px] leading-relaxed text-white/80">{project.summary}</p>

          <div className="mt-10 grid grid-cols-2 gap-10">
            <div>
              <p className="text-[56px] font-bold leading-none" style={{ color: BCF.gold }}>
                {project.stat1Value}
              </p>
              <p className="mt-3 text-[24px] text-white/80">{project.stat1Label}</p>
            </div>
            <div>
              <p className="text-[56px] font-bold leading-none" style={{ color: BCF.gold }}>
                {project.stat2Value}
              </p>
              <p className="mt-3 text-[24px] text-white/80">{project.stat2Label}</p>
            </div>
          </div>
        </div>
      </div>
    </BcfShell>
  );
}
