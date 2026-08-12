/**
 * Award / recognition plates for Trust → Recognition → Awards.
 *
 * Eager-loaded so the awards grid opens without a decode pause on first tap.
 */

function collect(modules: Record<string, string>): string[] {
  return Object.keys(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((key) => modules[key]);
}

const awardModules = import.meta.glob<string>(
  "@/assets/images/bcf/awards/*.webp",
  { eager: true, import: "default" },
);

export const bcfAwardImages: string[] = collect(awardModules);
