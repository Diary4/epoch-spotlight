import React from "react";
import { ChevronLeft } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import BcfStatValue from "@/components/Sections/bcf/BcfStatValue";
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
    <BcfShell
      backgroundImage={detailBg}
      overlayClassName="bg-gradient-to-t from-black via-black/45 to-black/15"
    >
      <div className="relative flex min-h-[1920px] flex-col justify-between px-14 pb-20 pt-28">
        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div className="mt-auto w-full max-w-[1080px] rounded-[32px] border border-white/15 bg-black/45 p-10 backdrop-blur-md">
          <h1 className="text-[72px] font-bold leading-tight text-[#fdeed4]">{project.title}</h1>
          <p className="mt-6 text-[36px] leading-snug text-[#fcdfaa]">{project.summary}</p>

          <div className="mt-12 flex flex-col gap-10">
            <div>
              <BcfStatValue
                value={project.stat1Value}
                className="text-[64px] font-bold leading-none"
              />
              <p className="mt-4 text-[36px] text-[#fbf4e4]">{project.stat1Label}</p>
            </div>
            <div>
              <BcfStatValue
                value={project.stat2Value}
                className="text-[64px] font-bold leading-none"
              />
              <p className="mt-4 text-[36px] text-[#fbf4e4]">{project.stat2Label}</p>
            </div>
          </div>
        </div>
      </div>
    </BcfShell>
  );
}
