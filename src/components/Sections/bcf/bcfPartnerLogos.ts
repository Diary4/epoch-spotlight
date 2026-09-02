/**
 * Partner / donor logo plates for the Trust → Partnerships screen.
 *
 * Sourced from the BCF logo pack (`partners` / `donors` / `Sponsers` JPEGs,
 * converted to WebP at ≤800px). Sponsor marks ship under Partners — there is
 * no separate Sponsors tab. Paths must match the git-indexed folder names
 * exactly — Linux production is case-sensitive, so `Partners` would collect
 * nothing even though macOS treats it as the same directory.
 *
 * Numbered `N-scaled.webp` plates are typeset names with no mark. Those go
 * after graphic logos so the grid opens on brands, not on word tiles.
 *
 * Ordering is decided entirely on the glob *keys* — the source paths. Nothing
 * here compares asset URLs: those are hashed at build time, so any pinning
 * that matched on URL identity would order one way in dev and another way in
 * the built app.
 *
 * Those keys do NOT have stable casing, so every filename comparison here is
 * case-insensitive. The macOS working tree holds `Donors/act-now-...-logo.webp`
 * while git has the same file indexed as `donors/Act-now-...-Logo.webp`; the
 * glob reads the filesystem, so it yields lowercase names on a developer's Mac
 * and the git casing on a Linux CI checkout. Matching pinned names literally
 * silently stops pinning in production while looking perfect locally.
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
export function collect(
  modules: Record<string, string>,
  pinnedFiles: readonly string[] = [],
): string[] {
  const rank = new Map(pinnedFiles.map((file, index) => [file.toLowerCase(), index]));
  const rankOf = (path: string) =>
    rank.get(basename(path).toLowerCase()) ?? Number.MAX_SAFE_INTEGER;

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

/** Major institutional supporters — always first, in this order. Case-insensitive. */
export const DONOR_LEAD_FILES: readonly string[] = [
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

/** Former Sponsors folder — merged into Partners. */
const sponsorModules = import.meta.glob<string>(
  "@/assets/images/bcf/logos/sponsors/*.webp",
  { eager: true, import: "default" },
);

export type PartnerLogoGroupId = "partners" | "donors";

export const bcfPartnerLogos: Record<PartnerLogoGroupId, string[]> = {
  partners: collect({ ...partnerModules, ...sponsorModules }),
  donors: collect(donorModules, DONOR_LEAD_FILES),
};
