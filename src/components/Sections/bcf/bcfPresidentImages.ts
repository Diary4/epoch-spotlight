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

const HIDDEN_SLIDES = new Set([
  "8C6A9467.webp",
  "8C6A9943.webp",
  "8C6A9963.webp",
  "8C6A9972.webp",
  "8C6A9992.webp",
  "8D1A3434.webp",
  "8D1A4735.webp",
  "8D1A4925.webp",
  "DSC_0612.webp",
  "DSC_2050.webp",
]);

const fileName = (key: string) => key.split("/").pop() ?? key;

const sorted = Object.keys(modules)
  .filter((key) => !HIDDEN_SLIDES.has(fileName(key)))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const mainKey = sorted.find((key) => key.includes("main-slider.webp"));
const rest = sorted.filter((key) => key !== mainKey);

export const bcfPresidentImages: string[] = [
  ...(mainKey ? [modules[mainKey]] : []),
  ...rest.map((key) => modules[key]),
];
