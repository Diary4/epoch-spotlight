/**
 * Field photography of the BCF President — sourced from `BCFpresident/`,
 * resized to 1800px and encoded as WebP for the kiosk filmstrip.
 */

const modules = import.meta.glob<string>(
  "@/assets/images/bcf/optimized/bcf-president/*.webp",
  { eager: true, import: "default" },
);

export const bcfPresidentImages: string[] = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => modules[key]);
