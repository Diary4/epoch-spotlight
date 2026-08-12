/**
 * Central placeholder assets for the BCF VIP experience.
 * Swap these imports when final VIP photography / logo assets arrive.
 */

/**
 * The official lockup: the seal over the wordmark, on transparency.
 *
 * Derived from `logo.png`, which is a 15871×25759 print original — 12 MB, and
 * enough pixels to stall the kiosk on decode.
 *
 * 456×740. The experience never draws the lockup taller than 300 px (the
 * attract monogram; the shell mark is 172), so this clears 2× on the 4K
 * portrait panel with margin to spare. The 986×1600 `logo.webp` it replaces
 * decoded to 6.3 MB of bitmap to be drawn a fifth of that size — a cost the
 * Android panel paid on every screen, since the shell mark is always up.
 */
export { default as bcfLogo } from "@/assets/images/bcf/logo-mark.webp";
/** Circular seal only — no red wordmark. Used in chapter pills. */
export { default as bcfLogoSeal } from "@/assets/images/bcf/logo-seal.webp";
/** Full-bleed plate behind the language choice — BCF field work with the truck in frame. */
export { default as bcfLangBg } from "@/assets/images/bcf/selected/impact-camps.webp";
/** Full-bleed plate behind the vow (“It is an honor to serve one's own people.”). */
export { default as bcfIntroBg } from "@/assets/images/bcf/honor-to-serve-bg.webp";
export { default as bcfWelcomeBg } from "@/assets/images/women/w-4.webp";
export { default as bcfMapBg } from "@/assets/images/kurdistan.webp";
export { default as bcfProjectHero } from "@/assets/images/women/w-4.webp";
export { default as bcfErbil } from "@/assets/images/bcf/optimized/schools/8D1A7011.webp";
/** Our Story full-bleed plate — used across every chapter pane. */
export { default as bcfStoryBg } from "@/assets/images/bcf/our-story-bg.webp";
export { default as bcfHubBg } from "@/assets/images/bcf/optimized/camps/harsham.webp";
export { default as bcfImpactBg } from "@/assets/images/bcf/selected/humanity-relief.webp";
export { default as bcfProjectsBg } from "@/assets/images/bcf/selected/impact-camps.webp";
export { default as bcfFutureDetailBg } from "@/assets/images/bcf/future-legacy-bg.webp";

/**
 * Opening plates.
 *
 * The attract screen holds on the start-page photograph. The vow screen uses
 * `bcfIntroBg`; map / other plates still use `bcfSunrise`.
 */
export { default as bcfAttractPoster } from "@/assets/images/bcf/start-page.webp";
export { default as bcfSunrise } from "@/assets/images/bcf/closing-lockup.webp";
/** Full-bleed plate behind Explore Our Journey. */
export { default as bcfJourneyBg } from "@/assets/images/bcf/journey-bg.webp";

/**
 * Journey-hub chapter discs — Explore Our Journey card photography.
 *
 * Square 560×560 center-crops so six discs stay light on the 4K kiosk
 * (active disc is ~252 CSS px).
 */
export { default as bcfJourneyStory } from "@/assets/images/bcf/thumbs/journey/story.webp";
export { default as bcfJourneyHumanity } from "@/assets/images/bcf/thumbs/journey/humanity.webp";
export { default as bcfJourneyMap } from "@/assets/images/bcf/thumbs/journey/map.webp";
export { default as bcfJourneyImpact } from "@/assets/images/bcf/thumbs/journey/impact.webp";
export { default as bcfJourneyTrust } from "@/assets/images/bcf/thumbs/journey/trust.webp";
export { default as bcfJourneyFuture } from "@/assets/images/bcf/thumbs/journey/future.webp";
