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
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";

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

/**
 * Type scale by how much there is to say.
 *
 * The shell does not scroll: a sector that runs past 1920px is a sector whose
 * last years nobody can read. The register's heaviest page — Erbil's shelter
 * work, six entries with three scope notes — needs the middle setting to land
 * inside the panel with margin. But it is the exception: 51 of the 87 sector
 * pages carry one or two entries, and setting all of them at the size the worst
 * case needs would leave most of the experience reading as fine print.
 *
 * The third tier is a guard rather than a case that exists today; it keeps the
 * page honest if a future year pushes a sector past six.
 */
function densityFor(count: number) {
  if (count <= 4) {
    return { body: 27, note: 21, pad: "p-6", gap: "gap-5", band: "gap-10" };
  }
  if (count <= 6) {
    return { body: 25, note: 20, pad: "p-5", gap: "gap-4", band: "gap-8" };
  }
  return { body: 23, note: 19, pad: "px-5 py-4", gap: "gap-3.5", band: "gap-7" };
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
  const d = densityFor(entries.length);

  return (
    <BcfShell
      backgroundImage={BCF_SECTOR_HERO[sectorId]}
      overlayClassName="bg-black/90"
      drift={false}
    >
      {/* Two hard margins on this panel. The shell's logo mark is 172px tall at
          top-10, so the header has to start below 212 or it runs straight
          through the lockup. And the foot of a 1920 artboard is knee height on
          a 65" screen stood on its end, so the last 220px stay clear rather
          than carrying the closing line. */}
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-[220px] pt-[236px]">
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div variants={bcfStagger(0.08, 0.12)} initial="initial" animate="animate">
          {/* The title keeps the left edge to itself. The 2025 figure sat
              opposite it, which put it underneath the reach rail — the rail is
              pinned to the right of the artboard from y=170 down, so the whole
              top-right corner is spoken for on every screen. */}
          <motion.div variants={bcfRise} className="flex items-center gap-5 pe-[150px]">
            <span
              className="grid h-[88px] w-[88px] shrink-0 place-items-center rounded-2xl border"
              style={{
                borderColor: `${BCF.gold}66`,
                backgroundColor: "rgba(251,193,88,0.09)",
              }}
            >
              <Icon className="h-11 w-11" style={{ color: BCF.gold }} />
            </span>
            <span className="min-w-0">
              <span
                className="block text-[25px] leading-tight tracking-[0.18em]"
                style={{ color: BCF.nature }}
              >
                {location.name}
              </span>
              <h1
                className="mt-2 block text-[54px] font-bold leading-[1.08]"
                style={{ color: BCF.creamSoft }}
              >
                {sectorName}
              </h1>
            </span>
          </motion.div>

          <motion.span
            variants={bcfRise}
            className="mt-6 block h-px w-full origin-left"
            style={{
              background: `linear-gradient(90deg, ${BCF.gold}, transparent 78%)`,
            }}
          />

          {/* The one figure BCF publishes for this sector in 2025 — and it is an
              organisation-wide figure, not this city's. It keeps its own label
              and carries its caveat on the same line, because the source's
              editorial rule is that scopes are never quietly mixed. */}
          {orgTotal ? (
            <motion.div variants={bcfRise} className="mt-6 flex items-center gap-6">
              <span className="shrink-0">
                <span
                  className="block whitespace-nowrap text-[21px] tracking-[0.14em]"
                  style={{ color: BCF.goldDeep }}
                >
                  {c.projects.orgTotalLabel}
                </span>
                <span
                  className="mt-1 block text-[46px] font-bold leading-none tabular-nums"
                  style={{ color: BCF.gold }}
                  dir="ltr"
                >
                  {bcfDigits(orgTotal, lang)}
                </span>
              </span>
              <span
                className="h-[62px] w-px shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              />
              <p className="text-[19px] leading-snug text-white/45">
                {c.projects.orgTotalNote}
              </p>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.p
          className="mt-8 text-[24px] tracking-[0.2em]"
          style={{ color: BCF.nature }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: BCF_EASE }}
        >
          {c.projects.timelineTitle}
        </motion.p>

        {/* The timeline takes the rest of the panel and sits in the middle of
            it. Two thirds of these pages carry one or two entries; anchored to
            the top they left two thirds of a 65" screen empty below them, which
            reads as a page that failed to load rather than a short register. */}
        <div
          className={`relative mt-6 flex flex-1 flex-col justify-center ${d.band}`}
        >
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
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.38 + groupIndex * 0.09,
                ease: BCF_EASE,
              }}
            >
              <h2
                className="mb-4 text-[22px] font-medium tracking-[0.14em] ltr:pl-[130px] rtl:pr-[130px]"
                style={{ color: BCF_ERA_COLORS[group.era] }}
              >
                {c.projects.eras[group.era]}
              </h2>

              <div className={`flex flex-col ${d.gap}`}>
                {group.entries.map((entry, index) => (
                  <article key={`${entry.year}-${index}`} className="relative flex gap-8">
                    {/* Year rail. Fixed width so every year in the sector lines
                        up on the spine — "Multi-year" and "2011-12" are as wide
                        as the column allows and wrap rather than shifting the
                        text beside them. */}
                    <span
                      className="relative w-[86px] shrink-0 pt-1 text-end text-[28px] font-semibold leading-tight tabular-nums"
                      style={{ color: BCF_ERA_COLORS[group.era] }}
                      dir="ltr"
                    >
                      {bcfDigits(
                        c.projects.yearMarkers[entry.year] ?? entry.year,
                        lang,
                      )}
                    </span>

                    <span
                      aria-hidden="true"
                      className="absolute top-[12px] h-[13px] w-[13px] rounded-full border-2 ltr:left-[80px] rtl:right-[80px]"
                      style={{
                        borderColor: BCF_ERA_COLORS[group.era],
                        backgroundColor: BCF.bg,
                      }}
                    />

                    <div
                      className={`min-w-0 flex-1 rounded-2xl border ${d.pad} ltr:ml-[30px] rtl:mr-[30px]`}
                      style={{
                        borderColor: "rgba(255,255,255,0.09)",
                        backgroundColor: "rgba(6,8,12,0.72)",
                      }}
                    >
                      <p
                        className="leading-[1.45] text-white/90"
                        style={{ fontSize: d.body }}
                      >
                        {entry.text}
                      </p>
                      {entry.note ? (
                        <p
                          className="mt-3 border-t pt-3 leading-snug text-white/45"
                          style={{
                            fontSize: d.note,
                            borderColor: "rgba(255,255,255,0.08)",
                          }}
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

        <p className="mt-8 shrink-0 text-[18px] leading-snug text-white/35">
          {c.projects.sourceNote}
        </p>
      </div>
    </BcfShell>
  );
}
