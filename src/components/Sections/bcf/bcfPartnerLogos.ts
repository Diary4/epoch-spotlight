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
 * Ordering is decided entirely on the glob *keys* — the source paths, which
 * are the same literal strings in `vite dev` and in the production bundle.
 * Nothing here compares asset URLs: those are hashed at build time, so any
 * pinning that matched on URL identity would order one way in dev and another
 * way in the built app.
 */

function basename(path: string): string {
  return path.split("/").pop() ?? path;
}

function isTextPlate(path: string): boolean {
  return /^\d+(-\d+)?-scaled\.webp$/i.test(basename(path));
}

/**
 * Sorts glob keys: pinned files first in the given order, then graphic logos
 * alphabetically, then the typeset word plates.
 */
function collect(
  modules: Record<string, string>,
  pinnedFiles: readonly string[] = [],
): string[] {
  const rank = new Map(pinnedFiles.map((file, index) => [file, index]));
  const rankOf = (path: string) => rank.get(basename(path)) ?? Number.MAX_SAFE_INTEGER;

  return Object.keys(modules)
    .sort((a, b) => {
      const aRank = rankOf(a);
      const bRank = rankOf(b);
      if (aRank !== bRank) return aRank - bRank;

      const aText = isTextPlate(a);
      const bText = isTextPlate(b);
      if (aText !== bText) return aText ? 1 : -1;

      return a.localeCompare(b, undefined, { sensitivity: "base" });
    })
    .map((key) => modules[key]);
}

/** Major institutional supporters — always first, in this order. */
const DONOR_LEAD_FILES: readonly string[] = [
  "lds-chariteis-logo.webp",
  "emirates-red-crescent-logo.webp",
  "kwait-is-by-your-side-logo.webp",
];

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
  donors: collect(donorModules, DONOR_LEAD_FILES),
  sponsors: collect(sponsorModules),
};
