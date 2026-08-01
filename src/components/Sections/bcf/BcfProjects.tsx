import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfProjectsBg } from "@/components/Sections/bcf/bcfAssets";
import projectThumb from "@/assets/images/women/w-4.webp";

/**
 * One project row. Split out so each row owns its own press state — the list
 * previously declared transitions on the thumbnail and the arrow but had no
 * state to drive them, so tapping a row gave no feedback at all.
 */
function ProjectRow({
  index,
  title,
  summary,
  onOpen,
}: {
  index: number;
  title: string;
  summary: string;
  onOpen: () => void;
}) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <motion.button
      type="button"
      variants={bcfRiseCard}
      onClick={onOpen}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      whileTap={BCF_TAP}
      transition={BCF_TAP_TRANSITION}
      className={`${BCF_GLASS_CARD} group flex transform-gpu items-center gap-7 overflow-hidden p-5 text-start will-change-transform`}
      style={{
        borderColor: pressed ? BCF.gold : `${BCF.gold}73`,
        boxShadow: pressed
          ? `0 0 40px ${BCF.gold}33`
          : "0 16px 46px rgba(0,0,0,0.4)",
        transition:
          "border-color 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span className="relative h-40 w-48 shrink-0 overflow-hidden rounded-xl">
        <img
          src={projectThumb}
          alt=""
          decoding="async"
          className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-smooth-out will-change-transform motion-reduce:transition-none"
          style={{ transform: pressed ? "scale(1.08)" : "scale(1)" }}
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1 origin-left"
          style={{
            backgroundColor: BCF.goldBright,
            transform: `scaleX(${pressed ? 1 : 0})`,
            transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </span>
      <div className="min-w-0 flex-1">
        <span className="text-[24px] font-medium tabular-nums" style={{ color: BCF.goldDeep }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="mt-1 text-[34px] font-semibold text-white">{title}</h2>
        <p className="mt-2 line-clamp-2 text-[22px] text-white/70">{summary}</p>
      </div>
      <span
        className="mx-3 grid h-14 w-14 shrink-0 place-items-center rounded-full border transition-transform duration-500 ease-smooth-out motion-reduce:transition-none"
        style={{
          borderColor: BCF.gold,
          transform: pressed ? "translateX(6px)" : "translateX(0)",
        }}
      >
        <ArrowRight className="h-7 w-7 rtl:rotate-180" style={{ color: BCF.gold }} />
      </span>
    </motion.button>
  );
}

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
    <BcfShell backgroundImage={bcfProjectsBg} overlayClassName="bg-black/60">
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-20 pt-40">
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div variants={bcfStagger(0.1, 0.16)} initial="initial" animate="animate">
          <motion.p
            variants={bcfRise}
            className="text-[28px] tracking-[0.2em]"
            style={{ color: BCF.nature }}
          >
            {c.whereWeWork}
          </motion.p>
          <motion.h1
            variants={bcfRise}
            className="mt-5 text-[64px] font-semibold leading-tight"
          >
            <span style={{ color: BCF.gold }}>{c.projectsIn}</span>{" "}
            <span className="text-white">{city}</span>
          </motion.h1>
          <motion.span
            variants={bcfDrawX}
            className="mt-7 block h-px w-[380px] origin-left"
            style={{ background: `linear-gradient(90deg, ${BCF.gold}, transparent)` }}
          />
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col gap-7"
          variants={bcfStagger(0.1, 0.32)}
          initial="initial"
          animate="animate"
        >
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              index={index}
              title={project.title}
              summary={project.summary}
              onOpen={() => onOpenProject(project.id)}
            />
          ))}
        </motion.div>
      </div>
    </BcfShell>
  );
}
