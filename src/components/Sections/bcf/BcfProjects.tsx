import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
} from "@/components/Sections/bcf/bcfContent";
import {
  bcfEraForYear,
  bcfSectorsFor,
  bcfYearSortKey,
  type BcfEraId,
  type BcfSectorRecord,
  type SectorId,
} from "@/components/Sections/bcf/bcfProjectData";
import {
  BCF_ERA_COLORS,
  BCF_SECTOR_ICONS,
} from "@/components/Sections/bcf/bcfSectorMeta";
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

/**
 * The city page: which sectors this place has documented work in, and how much
 * of it. It used to list three invented projects — the same three titles for
 * every city, with invented figures under them. What it lists now is the real
 * register, and the counts on each row are derived from it rather than typed.
 */

/** The eras a sector's entries fall into, oldest band first, deduplicated. */
const ERA_ORDER: BcfEraId[] = ["historic", "annual", "latest", "current"];

function erasIn(record: BcfSectorRecord): BcfEraId[] {
  const present = new Set(record.entries.map((e) => bcfEraForYear(e.year)));
  return ERA_ORDER.filter((era) => present.has(era));
}

/** "2015 - 2026", or a single year, or nothing where every entry is undated. */
function spanOf(record: BcfSectorRecord): string | null {
  const years = record.entries
    .flatMap((entry) => entry.year.match(/\d{4}/g) ?? [])
    .map(Number);
  if (!years.length) return null;
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min} - ${max}`;
}

function SectorRow({
  index,
  record,
  title,
  entriesLabel,
  onOpen,
}: {
  index: number;
  record: BcfSectorRecord;
  title: string;
  entriesLabel: string;
  onOpen: () => void;
}) {
  const [pressed, setPressed] = React.useState(false);
  const Icon = BCF_SECTOR_ICONS[record.id];
  const eras = erasIn(record);
  const span = spanOf(record);

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
      className={`${BCF_GLASS_CARD} group flex transform-gpu items-center gap-6 overflow-hidden px-6 py-5 text-start`}
      style={{
        borderColor: pressed ? BCF.gold : `${BCF.gold}73`,
        boxShadow: pressed
          ? `0 0 40px ${BCF.gold}33`
          : "0 16px 46px rgba(0,0,0,0.4)",
        transition:
          "border-color 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* An icon medallion rather than a photograph. Fourteen sectors have no
          fourteen matching plates in BCF's folders, and the list previously
          repeated one school photo down every row of every city. */}
      <span
        className="grid h-[104px] w-[104px] shrink-0 place-items-center rounded-2xl border"
        style={{
          borderColor: pressed ? BCF.gold : `${BCF.gold}55`,
          backgroundColor: pressed ? "rgba(251,178,47,0.16)" : "rgba(251,193,88,0.07)",
          transition: "all 400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <Icon className="h-12 w-12" style={{ color: BCF.gold }} />
      </span>

      <div className="min-w-0 flex-1">
        <span
          className="text-[22px] font-medium tabular-nums"
          style={{ color: BCF.goldDeep }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="mt-1 text-[36px] font-semibold leading-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-[22px] text-white/70">
          <span className="tabular-nums">{record.entries.length}</span> {entriesLabel}
          {span ? <span className="text-white/45"> · {span}</span> : null}
        </p>
        {/* Era pips. The recap asks a screen to keep history and this month
            visibly apart; this is that distinction carried onto the list, so a
            visitor can see which sectors are still running before opening one. */}
        <span className="mt-3 flex items-center gap-2">
          {eras.map((era) => (
            <span
              key={era}
              className="h-[6px] w-10 rounded-full"
              style={{ backgroundColor: BCF_ERA_COLORS[era] }}
            />
          ))}
        </span>
      </div>

      <span
        className="mx-1 grid h-14 w-14 shrink-0 place-items-center rounded-full border transition-transform duration-500 ease-smooth-out motion-reduce:transition-none"
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
  onOpenSector: (id: SectorId) => void;
};

export default function BcfProjects({
  lang,
  locationId,
  onBack,
  onOpenSector,
}: BcfProjectsProps) {
  const c = bcfCopy[lang];
  const location = c.locations[locationId];
  const sectors = bcfSectorsFor(locationId);

  const entryCount = sectors.reduce((total, s) => total + s.entries.length, 0);
  const years = sectors
    .flatMap((s) => s.entries)
    .flatMap((entry) => entry.year.match(/\d{4}/g) ?? [])
    .map(Number);
  const span = years.length
    ? `${Math.min(...years)} - ${Math.max(...years)}`
    : null;

  return (
    <BcfShell backgroundImage={bcfProjectsBg} overlayClassName="bg-black/72">
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
            <span className="text-white">{location.name}</span>
          </motion.h1>
          <motion.p
            variants={bcfRise}
            className="mt-5 max-w-[860px] text-[26px] leading-relaxed text-white/72"
          >
            {location.description}
          </motion.p>

          {/* Three counts, all read off the register below rather than stated
              independently of it, so the header can never disagree with the
              list it introduces. */}
          <motion.div variants={bcfRise} className="mt-8 flex items-end gap-14">
            <span>
              <span
                className="block text-[52px] font-bold leading-none tabular-nums"
                style={{ color: BCF.gold }}
              >
                {sectors.length}
              </span>
              <span className="mt-2 block text-[22px] text-white/65">
                {c.projects.sectorsLabel}
              </span>
            </span>
            <span>
              <span
                className="block text-[52px] font-bold leading-none tabular-nums"
                style={{ color: BCF.gold }}
              >
                {entryCount}
              </span>
              <span className="mt-2 block text-[22px] text-white/65">
                {c.projects.entriesLabel}
              </span>
            </span>
            {span ? (
              <span>
                <span
                  className="block text-[52px] font-bold leading-none tabular-nums"
                  style={{ color: BCF.gold }}
                  dir="ltr"
                >
                  {span}
                </span>
                <span className="mt-2 block text-[22px] text-white/65">
                  {c.projects.yearsLabel}
                </span>
              </span>
            ) : null}
          </motion.div>

          <motion.span
            variants={bcfDrawX}
            className="mt-8 block h-px w-[380px] origin-left"
            style={{ background: `linear-gradient(90deg, ${BCF.gold}, transparent)` }}
          />
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col gap-5"
          variants={bcfStagger(0.07, 0.3)}
          initial="initial"
          animate="animate"
        >
          {sectors.map((record, index) => (
            <SectorRow
              key={record.id}
              index={index}
              record={record}
              title={c.projects.sectors[record.id]}
              entriesLabel={c.projects.entriesLabel}
              onOpen={() => onOpenSector(record.id)}
            />
          ))}
        </motion.div>

        <p className="mt-12 max-w-[900px] text-[20px] leading-relaxed text-white/40">
          {c.projects.sourceNote}
        </p>
      </div>
    </BcfShell>
  );
}
