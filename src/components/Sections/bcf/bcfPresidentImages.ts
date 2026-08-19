/**
 * Field photography of the BCF President — sourced from `BCFpresident/`,
 * resized to 1800px and encoded as WebP for the kiosk filmstrip.
 *
 * `main-slider` is always the opening plate; the rest stay in filename order.
 */

const modules = import.meta.glob<string>(
  "@/assets/images/bcf/optimized/bcf-president/*.webp",
  { eager: true, import: "default" },
);

const sorted = Object.keys(modules).sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true }),
);

const mainKey = sorted.find((key) => key.includes("main-slider.webp"));
const rest = sorted.filter((key) => key !== mainKey);

export const bcfPresidentImages: string[] = [
  ...(mainKey ? [modules[mainKey]] : []),
  ...rest.map((key) => modules[key]),
];
