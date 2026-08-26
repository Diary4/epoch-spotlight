import { describe, expect, it } from "vitest";

import { DONOR_LEAD_FILES, collect } from "@/components/Sections/bcf/bcfPartnerLogos";

/**
 * The glob keys carry whatever casing the checkout has: lowercase in the macOS
 * working tree, git's own mixed casing on a Linux CI box. Both must pin the
 * lead donors identically, or production silently falls back to alphabetical.
 */
const DIR = "/src/assets/images/bcf/logos/donors";

function modulesFrom(files: string[]): Record<string, string> {
  return Object.fromEntries(files.map((file) => [`${DIR}/${file}`, `url(${file})`]));
}

const MAC_TREE = [
  "act-now-children-fund-logo.webp",
  "burpee-logo.webp",
  "emirates-red-crescent-logo.webp",
  "kwait-is-by-your-side-logo.webp",
  "lds-chariteis-logo.webp",
  "microsoft-logo.webp",
];

const GIT_INDEX = [
  "Act-now-children-fund-Logo.webp",
  "Burpee-Logo.webp",
  "Emirates-Red-Crescent-Logo.webp",
  "Kwait-is-by-Your-Side-Logo.webp",
  "LDS-Chariteis-Logo.webp",
  "Microsoft-Logo.webp",
];

describe("collect", () => {
  it("pins the lead donors first regardless of filename casing", () => {
    for (const files of [MAC_TREE, GIT_INDEX]) {
      const ordered = collect(modulesFrom(files), DONOR_LEAD_FILES);
      const leading = ordered.slice(0, 3).map((url) => url.slice(4, -1).toLowerCase());

      expect(leading).toEqual([
        "lds-chariteis-logo.webp",
        "emirates-red-crescent-logo.webp",
        "kwait-is-by-your-side-logo.webp",
      ]);
    }
  });

  it("orders the two checkouts identically", () => {
    const mac = collect(modulesFrom(MAC_TREE), DONOR_LEAD_FILES);
    const linux = collect(modulesFrom(GIT_INDEX), DONOR_LEAD_FILES);

    expect(linux.map((url) => url.toLowerCase())).toEqual(mac.map((url) => url.toLowerCase()));
  });

  it("sinks numbered word plates below graphic logos", () => {
    const ordered = collect(modulesFrom(["1-scaled.webp", "zer-logo.webp"]));

    expect(ordered).toEqual(["url(zer-logo.webp)", "url(1-scaled.webp)"]);
  });
});
