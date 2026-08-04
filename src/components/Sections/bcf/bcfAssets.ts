/**
 * Central placeholder assets for the BCF VIP experience.
 * Swap these imports when final VIP photography / logo assets arrive.
 */

/**
 * The official lockup: the seal over the wordmark, on transparency.
 *
 * Derived from `logo.png`, which is a 15871×25759 print original — 12 MB, and
 * enough pixels to stall the kiosk on decode. This is the same artwork at
 * 986×1600, which still clears 2× on the 4K portrait panel at every size the
 * experience draws it.
 */
export { default as bcfLogo } from "@/assets/images/bcf/logo.webp";
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
export { default as bcfFutureDetailBg } from "@/assets/images/bcf/selected/impact-camps.webp";

/**
 * Opening plates.
 *
 * Both are portrait 1080×1620 originals commissioned for BCF — the only two
 * images in the experience that are not borrowed from another section. The
 * attract cross-fades between them on a slow cycle, which is where its motion
 * comes from now that there is no film to play.
 */
export { default as bcfAttractPoster } from "@/assets/images/bcf/attract-poster.webp";
export { default as bcfSunrise } from "@/assets/images/bcf/closing-lockup.webp";

/** Journey-hub chapter discs — curated BCF field photography from `selected/`. */
export { default as bcfJourneyStory } from "@/assets/images/bcf/attract-poster.webp";
export { default as bcfJourneyHumanity } from "@/assets/images/bcf/selected/humanity-education.webp";
export { default as bcfJourneyMap } from "@/assets/images/bcf/selected/impact-camps.webp";
export { default as bcfJourneyImpact } from "@/assets/images/bcf/selected/impact-employees.webp";
export { default as bcfJourneyTrust } from "@/assets/images/bcf/selected/trust-leadership.webp";
export { default as bcfJourneyFuture } from "@/assets/images/bcf/selected/trust-recognition.webp";
