/**
 * Central placeholder assets for the BCF VIP experience.
 * Swap these imports when final VIP photography / logo assets arrive.
 */
export { default as bcfLangBg } from "@/assets/images/religions/kurds/cover.webp";
export { default as bcfIntroBg } from "@/assets/images/PrimeMinistir/service.webp";
export { default as bcfWelcomeBg } from "@/assets/images/women/w-4.webp";
export { default as bcfMapBg } from "@/assets/images/kurdistan.webp";
export { default as bcfProjectHero } from "@/assets/images/women/w-4.webp";
export { default as bcfErbil } from "@/assets/images/TouristicPlace/ErbilCastle/IMG_8636 copy.webp";
/** Distinct from bcfErbil so Our Story chapter scroll visibly swaps the backdrop. */
export { default as bcfCorridor } from "@/assets/images/TouristicPlace/ErbilCastle/DSC_5315.webp";
export { default as bcfHubBg } from "@/assets/images/PrimeMinistir/p-1.webp";
export { default as bcfImpactBg } from "@/assets/images/PrimeMinistir/service.webp";
export { default as bcfProjectsBg } from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
export { default as bcfFutureDetailBg } from "@/assets/images/TouristicPlace/ErbilCastle/IMG_8636 copy.webp";

/**
 * Opening attract reel.
 *
 * `bcfAttractVideo` is the drop-in point for the real BCF brand film: import the
 * file (portrait 1080x1920 keeps it full-bleed) and assign it here, and
 * BcfAttract plays that instead of the built-in animated reel — same paused
 * first frame, same trilingual start prompt, same hand-off to language select.
 *
 *   import attractFilm from "@/assets/videos/bcf-attract.webm";
 *   export const bcfAttractVideo: string | null = attractFilm;
 */
export const bcfAttractVideo: string | null = null;
