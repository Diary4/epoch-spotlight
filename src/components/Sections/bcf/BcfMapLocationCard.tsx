import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import {
  bcfCopy,
  type BcfLang,
  type LocationId,
} from "@/components/Sections/bcf/bcfContent";
import {
  bcfEntryCountFor,
  bcfSectorsFor,
  bcfYearSpanFor,
} from "@/components/Sections/bcf/bcfProjectData";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import { BCF_SECTOR_ICONS } from "@/components/Sections/bcf/bcfSectorMeta";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_TAP, BCF_TAP_TRANSITION } from "@/components/Sections/bcf/bcfMotion";

/**
 * The card a tapped place raises over a map.
 *
 * Shared by the Region map and the Iraq map rather than written twice: both
 * answer the same question in the same words, and a visitor who taps Erbil on
 * one and Erbil on the other should not be shown two different cards.
 *
 * `preview` is separate from `register` because a federal governorate on the
 * Iraq map opens the Iraq-wide register — the only register the source has for
 * it — and country-wide sector chips and totals sitting under "Baghdad" would
 * read as Baghdad's own. Those places pass `preview: null` and carry a single
 * line of what is documented there instead.
 */
type BcfMapLocationCardProps = {
  lang: BcfLang;
  title: string;
  description: string;
  /** The register the button opens. */
  register: LocationId;
  /** Where the sector chips and totals come from, or null for neither. */
  preview: LocationId | null;
  onClose: () => void;
  onExplore: () => void;
};

export default function BcfMapLocationCard({
  lang,
  title,
  description,
  register,
  preview,
  onClose,
  onExplore,
}: BcfMapLocationCardProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const sectors = preview ? bcfSectorsFor(preview) : [];
  const yearSpan = preview ? bcfYearSpanFor(preview) : null;

  return (
    <div
      className="w-full max-w-[920px] rounded-2xl border border-[#fbc158]/45 bg-[#0a0a0a]/95 p-8 backdrop-blur-xl"
      style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-[48px] font-semibold leading-tight" style={{ color: BCF.gold }}>
          {title}
        </h2>
        <motion.button
          type="button"
          onClick={onClose}
          whileTap={BCF_TAP}
          transition={BCF_TAP_TRANSITION}
          className="grid h-12 w-12 shrink-0 transform-gpu place-items-center rounded-full border border-white/30"
          aria-label={c.close}
        >
          <X className="h-6 w-6" />
        </motion.button>
      </div>
      <p className="max-w-[760px] text-[24px] leading-relaxed text-white/80">
        {bcfDigits(description, lang)}
      </p>

      {/* Sectors, not a landscape photograph. The card used to show a tourist
          plate of the nearest beauty spot — a waterfall for Sulaymaniyah, a
          castle for Kirkuk — and two invented totals underneath. What a visitor
          is about to open is a register of sectors, so that is what the card
          previews, drawn from the same data. */}
      {sectors.length ? (
        <div className="mt-7 flex flex-wrap gap-3">
          {sectors.map((record) => {
            const SectorIcon = BCF_SECTOR_ICONS[record.id];
            return (
              <span
                key={record.id}
                className="flex items-center gap-2.5 rounded-full border px-4 py-2"
                style={{
                  borderColor: `${BCF.gold}3d`,
                  backgroundColor: "rgba(251,193,88,0.07)",
                }}
              >
                <SectorIcon className="h-6 w-6 shrink-0" style={{ color: BCF.gold }} />
                <span className="text-[22px] text-white/85">
                  {c.projects.sectors[record.id]}
                </span>
              </span>
            );
          })}
        </div>
      ) : null}

      {preview ? (
        <div className="mt-7 grid grid-cols-3 gap-8">
          <div>
            <p
              className="text-[52px] font-bold leading-none tabular-nums"
              style={{ color: BCF.gold }}
            >
              {bcfDigits(sectors.length, lang)}
            </p>
            <p className="mt-2 text-[22px] text-white/75">{c.projects.sectorsLabel}</p>
          </div>
          <div>
            <p
              className="text-[52px] font-bold leading-none tabular-nums"
              style={{ color: BCF.gold }}
            >
              {bcfDigits(bcfEntryCountFor(preview), lang)}
            </p>
            <p className="mt-2 text-[22px] text-white/75">{c.projects.entriesLabel}</p>
          </div>
          {yearSpan ? (
            <div>
              {/* Smaller than its two neighbours: "2012 - 2026" is nine glyphs
                  where they are one or two, and at 52px it wrapped and shoved
                  its own caption out of the row. */}
              <p
                className="whitespace-nowrap text-[40px] font-bold leading-none tabular-nums"
                style={{ color: BCF.gold }}
                dir="ltr"
              >
                {bcfDigits(yearSpan, lang)}
              </p>
              <p className="mt-2 text-[22px] text-white/75">{c.projects.yearsLabel}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <motion.button
        type="button"
        onClick={onExplore}
        whileTap={BCF_TAP}
        transition={BCF_TAP_TRANSITION}
        className="mt-8 flex w-full transform-gpu items-center justify-between rounded-full border border-[#fbc158]/50 bg-black/25 px-8 py-5"
      >
        <span className="text-[28px] text-white">{c.locations[register].explore}</span>
        <span
          className={`grid h-14 w-14 place-items-center rounded-full border-2 ${
            reduceMotion ? "" : "bcf-pulse"
          }`}
          style={
            {
              borderColor: BCF.gold,
              "--pulse-scale": "1.06",
              "--pulse-duration": "2.4s",
            } as React.CSSProperties
          }
        >
          <ArrowRight className="h-7 w-7 rtl:rotate-180" style={{ color: BCF.gold }} />
        </span>
      </motion.button>
    </div>
  );
}
