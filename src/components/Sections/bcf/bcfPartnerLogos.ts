/**
 * Partner / donor / sponsor logo plates for the Trust → Partnerships screen.
 *
 * Sourced from the BCF logo pack (`partners` / `donors` / `Sponsers` JPEGs,
 * converted to WebP at ≤800px). Paths must match the git-indexed folder names
 * exactly — Linux production is case-sensitive, so `Partners` would collect
 * nothing even though macOS treats it as the same directory.
 *
 * Numbered `N-scaled.webp` plates are typeset names with no mark. Those go
 * after graphic logos so the grid opens on brands, not on word tiles.
 *
 * Lead donors are static imports (not filename string matches). Matching by
 * basename against glob *values* fails in production because Vite hashes
 * asset URLs; matching against glob *keys* can also fail depending on how
 * the build rewrites the eager-glob object. URL identity from a static
 * import is stable in both dev and the production bundle.
 */

import donorLds from "@/assets/images/bcf/logos/donors/lds-chariteis-logo.webp";
import donorEmirates from "@/assets/images/bcf/logos/donors/emirates-red-crescent-logo.webp";
import donorKuwaitSide from "@/assets/images/bcf/logos/donors/kwait-is-by-your-side-logo.webp";

function isTextPlate(path: string): boolean {
  const file = path.split("/").pop() ?? "";
  return /^\d+(-\d+)?-scaled\.webp$/i.test(file);
}

function sortedKeys(modules: Record<string, string>): string[] {
  return Object.keys(modules).sort((a, b) => {
    const aText = isTextPlate(a);
    const bText = isTextPlate(b);
    if (aText !== bText) return aText ? 1 : -1;
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });
}

function collect(modules: Record<string, string>): string[] {
  return sortedKeys(modules).map((key) => modules[key]);
}

/** Major institutional supporters — always first, in this order. */
const DONOR_LEAD: readonly string[] = [
  donorLds,
  donorEmirates,
  donorKuwaitSide,
];

function collectDonors(modules: Record<string, string>): string[] {
  const lead = [...DONOR_LEAD];
  const leadSet = new Set(lead);
  const rest = collect(modules).filter((src) => !leadSet.has(src));
  return [...lead, ...rest];
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
  donors: collectDonors(donorModules),
  sponsors: collect(sponsorModules),
};
