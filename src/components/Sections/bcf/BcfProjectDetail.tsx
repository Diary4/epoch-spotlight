import React from "react";
import { motion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE, bcfRise, bcfStagger } from "@/components/Sections/bcf/bcfMotion";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
} from "@/components/Sections/bcf/bcfContent";
import {
  bcfEntriesFor,
  bcfEraForYear,
  BCF_SECTOR_2025_TOTALS,
  type BcfEraId,
  type BcfProjectEntry,
  type SectorId,
} from "@/components/Sections/bcf/bcfProjectData";
import {
  BCF_ERA_COLORS,
  BCF_SECTOR_HERO,
  BCF_SECTOR_ICONS,
} from "@/components/Sections/bcf/bcfSectorMeta";

/**
 * One sector of one city, as a timeline.
 *
 * This page used to be a six-panel dome gallery: the same six stock plates for
 * every project in every city, captioned with the two invented statistics from
 * the list behind it, spinning under a title. It answered no question a visitor
 * could have arrived with.
 *
 * What the source actually holds is a dated register, and the recap's own
 * guidance for a screen is to show it as one — years oldest to newest, banded
 * so history and this month are never confused for each other, with the scope
 * caveats attached to the lines they qualify rather than buried in a footnote.
 */

const ERA_ORDER: BcfEraId[] = ["historic", "annual", "latest", "current"];

type EraGroup = { era: BcfEraId; entries: BcfProjectEntry[] };

function groupByEra(entries: BcfProjectEntry[]): EraGroup[] {
  return ERA_ORDER.map((era) => ({
    era,
    entries: entries.filter((entry) => bcfEraForYear(entry.year) === era),
  })).filter((group) => group.entries.length > 0);
}

type BcfProjectDetailProps = {
  lang: BcfLang;
  locationId: LocationId;
  sectorId: SectorId;
  onBack: () => void;
};

export default function BcfProjectDetail({
  lang,
  locationId,
  sectorId,
  onBack,
}: BcfProjectDetailProps) {
  const c = bcfCopy[lang];
  const location = c.locations[locationId];
  const sectorName = c.projects.sectors[sectorId];
  const Icon = BCF_SECTOR_ICONS[sectorId];
  const entries = bcfEntriesFor(locationId, sectorId);
  const groups = groupByEra(entries);
  const orgTotal = BCF_SECTOR_2025_TOTALS[sectorId];

  return (
    <BcfShell
      backgroundImage={BCF_SECTOR_HERO[sectorId]}
      overlayClassName="bg-black/80"
      drift={false}
    >
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-24 pt-40">
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div variants={bcfStagger(0.09, 0.14)} initial="initial" animate="animate">
          <motion.div variants={bcfRise} className="flex items-center gap-5">
            <span
              className="grid h-[92px] w-[92px] shrink-0 place-items-center rounded-2xl border"
              style={{
                borderColor: `${BCF.gold}66`,
                backgroundColor: "rgba(251,193,88,0.09)",
              }}
            >
              <Icon className="h-11 w-11" style={{ color: BCF.gold }} />
            </span>
            <span className="min-w-0">
              <span
                className="block text-[26px] tracking-[0.18em]"
                style={{ color: BCF.nature }}
              >
                {location.name}
              </span>
              <h1
                className="mt-2 block text-[58px] font-bold leading-tight"
                style={{ color: BCF.creamSoft }}
              >
                {sectorName}
              </h1>
            </span>
          </motion.div>

          <motion.span
            variants={bcfRise}
            className="mt-8 block h-px w-full origin-left"
            style={{
              background: `linear-gradient(90deg, ${BCF.gold}, transparent 78%)`,
            }}
          />

          {/* The one figure BCF publishes for this sector in 2025 — and it is an
              organisation-wide figure, not this city's. It sits apart from the
              timeline, under its own label, because the source's editorial rule
              is that scopes are never quietly mixed. */}
          {orgTotal ? (
            <motion.div
              variants={bcfRise}
              className="mt-9 rounded-2xl border p-7"
              style={{
                borderColor: `${BCF.gold}38`,
                backgroundColor: "rgba(0,0,0,0.42)",
              }}
            >
              <span
                className="text-[24px] tracking-[0.16em]"
                style={{ color: BCF.goldDeep }}
              >
                {c.projects.orgTotalLabel}
              </span>
              <span
                className="mt-2 block text-[64px] font-bold leading-none tabular-nums"
                style={{ color: BCF.gold }}
                dir="ltr"
              >
                {orgTotal}
              </span>
              <p className="mt-3 text-[20px] leading-relaxed text-white/50">
                {c.projects.orgTotalNote}
              </p>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.p
          className="mt-12 text-[26px] tracking-[0.2em]"
          style={{ color: BCF.nature }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease: BCF_EASE }}
        >
          {c.projects.timelineTitle}
        </motion.p>

        <div className="relative mt-8 flex flex-col gap-12">
          {/* The spine. A single rule down the whole timeline rather than one
              per band, so the years read as one continuous run and the era
              headings sit on it as markers instead of breaking it into pieces. */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 top-2 w-px ltr:left-[86px] rtl:right-[86px]"
            style={{
              background: `linear-gradient(180deg, ${BCF.gold}00, ${BCF.gold}55 8%, ${BCF.gold}55 92%, ${BCF.gold}00)`,
            }}
          />

          {groups.map((group, groupIndex) => (
            <motion.section
              key={group.era}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.44 + groupIndex * 0.1,
                ease: BCF_EASE,
              }}
            >
              <h2
                className="mb-6 text-[24px] font-medium tracking-[0.14em] ltr:pl-[130px] rtl:pr-[130px]"
                style={{ color: BCF_ERA_COLORS[group.era] }}
              >
                {c.projects.eras[group.era]}
              </h2>

              <div className="flex flex-col gap-5">
                {group.entries.map((entry, index) => (
                  <article key={`${entry.year}-${index}`} className="relative flex gap-8">
                    {/* Year rail. Fixed width so every year in the sector lines
                        up on the spine — "Multi-year" and "2011-12" are as wide
                        as the column allows and wrap rather than shifting the
                        text beside them. */}
                    <span
                      className="relative w-[86px] shrink-0 pt-1 text-end text-[30px] font-semibold leading-tight tabular-nums"
                      style={{ color: BCF_ERA_COLORS[group.era] }}
                      dir="ltr"
                    >
                      {c.projects.yearMarkers[entry.year] ?? entry.year}
                    </span>

                    <span
                      aria-hidden="true"
                      className="absolute top-[14px] h-[13px] w-[13px] rounded-full border-2 ltr:left-[80px] rtl:right-[80px]"
                      style={{
                        borderColor: BCF_ERA_COLORS[group.era],
                        backgroundColor: BCF.bg,
                      }}
                    />

                    <div
                      className="min-w-0 flex-1 rounded-2xl border p-6 ltr:ml-[30px] rtl:mr-[30px]"
                      style={{
                        borderColor: "rgba(255,255,255,0.09)",
                        backgroundColor: "rgba(0,0,0,0.42)",
                      }}
                    >
                      <p className="text-[26px] leading-relaxed text-white/90">
                        {entry.text}
                      </p>
                      {entry.note ? (
                        <p
                          className="mt-4 border-t pt-4 text-[21px] leading-relaxed text-white/45"
                          style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        >
                          <span style={{ color: BCF.goldDeep }}>
                            {c.projects.scopeNote}:
                          </span>{" "}
                          {entry.note}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <p className="mt-14 max-w-[900px] text-[20px] leading-relaxed text-white/40">
          {c.projects.sourceNote}
        </p>
      </div>
    </BcfShell>
  );
}
