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
 * Priority pinning must run on glob *keys* (source paths like
 * `…/lds-chariteis-logo.webp`). Mapping to URLs first breaks production:
 * Vite emits hashed filenames (`lds-chariteis-logo-Ab12.webp`), so lookups
 * against the original names never match and the grid falls back to A–Z.
 */

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

/** Donors pinned to the head of the grid — major institutional supporters first. */
const DONOR_PRIORITY = [
  "lds-chariteis-logo.webp",
  "emirates-red-crescent-logo.webp",
  "kwait-is-by-your-side-logo.webp",
];

/** Pin by source filename, then resolve to the built asset URLs. */
function collectPrioritized(
  modules: Record<string, string>,
  priorityFiles: string[],
): string[] {
  const keys = sortedKeys(modules);
  const byFile = new Map(keys.map((key) => [key.split("/").pop() ?? key, key]));
  const pinned = priorityFiles
    .map((file) => byFile.get(file))
    .filter((key): key is string => Boolean(key));
  const pinnedSet = new Set(pinned);
  return [...pinned, ...keys.filter((key) => !pinnedSet.has(key))].map(
    (key) => modules[key],
  );
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
  donors: collectPrioritized(donorModules, DONOR_PRIORITY),
  sponsors: collect(sponsorModules),
};
