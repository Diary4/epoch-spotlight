import React from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import { bcfProjectsBg } from "@/components/Sections/bcf/bcfAssets";
import projectThumb from "@/assets/images/women/w-4.webp";

type BcfProjectsProps = {
  lang: BcfLang;
  locationId: LocationId;
  onBack: () => void;
  onOpenProject: (id: ProjectId) => void;
};

export default function BcfProjects({
  lang,
  locationId,
  onBack,
  onOpenProject,
}: BcfProjectsProps) {
  const c = bcfCopy[lang];
  const city = c.locations[locationId].name;
  const projects = c.projects[locationId];

  return (
    <BcfShell backgroundImage={bcfProjectsBg} overlayClassName="bg-black/55">
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-20 pt-40">
        <button
          type="button"
          onClick={onBack}
          className="mb-10 flex w-fit items-center gap-2 text-[24px] text-white/70"
        >
          <ChevronLeft className="h-7 w-7" />
          {c.back}
        </button>

        <h1 className="text-[64px] font-semibold leading-tight">
          <span style={{ color: BCF.gold }}>{c.projectsIn}</span>{" "}
          <span className="text-white">{city}</span>
        </h1>

        <div className="mt-14 flex flex-col gap-7">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpenProject(project.id)}
              className={`${BCF_GLASS_CARD} group flex transform-gpu items-center gap-7 overflow-hidden p-5 text-left transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(0,0,0,0.42)] active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
            >
              <span className="h-40 w-48 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={projectThumb}
                  alt=""
                  decoding="async"
                  className="h-full w-full transform-gpu object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[34px] font-semibold text-white">{project.title}</h2>
                <p className="mt-2 line-clamp-2 text-[22px] text-white/70">{project.summary}</p>
              </div>
              <span
                className="mr-3 grid h-14 w-14 shrink-0 place-items-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                style={{ borderColor: BCF.gold }}
              >
                <ArrowRight className="h-7 w-7" style={{ color: BCF.gold }} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </BcfShell>
  );
}
