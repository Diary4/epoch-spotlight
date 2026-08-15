/**
 * Partner / donor / sponsor logo plates for the Trust → Partnerships screen.
 *
 * Sourced from the BCF logo pack (JPEG originals converted to WebP at ≤800px).
 * The sponsors set excludes logos that already sit in partners or donors, so
 * the three tabs never repeat the same mark.
 *
 * Numbered `N-scaled.webp` plates are typeset names with no mark. Those go
 * after graphic logos so the grid opens on brands, not on word tiles.
 */

function isTextPlate(path: string): boolean {
  const file = path.split("/").pop() ?? "";
  return /^\d+(-\d+)?-scaled\.webp$/i.test(file);
}

function collect(modules: Record<string, string>): string[] {
  return Object.keys(modules)
    .sort((a, b) => {
      const aText = isTextPlate(a);
      const bText = isTextPlate(b);
      if (aText !== bText) return aText ? 1 : -1;
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    })
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
