/**
 * Partner / donor / sponsor logo plates for the Trust → Partnerships screen.
 *
 * Sourced from the BCF logo pack (JPEG originals converted to WebP at ≤800px).
 * The sponsors set excludes logos that already sit in partners or donors, so
 * the three tabs never repeat the same mark.
 */

function collect(modules: Record<string, string>): string[] {
  return Object.keys(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((key) => modules[key]);
}

const partnerModules = import.meta.glob<string>(
  "@/assets/images/bcf/logos/partners/*.webp",
  { eager: true, import: "default" },
);

const donorModules = import.meta.glob<string>(
  "@/assets/images/bcf/logos/donors/*.webp",
  { eager: true, import: "default" },
);

const sponsorModules = import.meta.glob<string>(
  "@/assets/images/bcf/logos/sponsors/*.webp",
  { eager: true, import: "default" },
);

export type PartnerLogoGroupId = "partners" | "donors" | "sponsors";

export const bcfPartnerLogos: Record<PartnerLogoGroupId, string[]> = {
  partners: collect(partnerModules),
  donors: collect(donorModules),
  sponsors: collect(sponsorModules),
};
