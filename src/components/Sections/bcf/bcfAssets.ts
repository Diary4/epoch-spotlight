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
export { default as bcfLangBg } from "@/assets/images/religions/kurds/cover.webp";
export { default as bcfIntroBg } from "@/assets/images/bcf/attract-poster.webp";
export { default as bcfWelcomeBg } from "@/assets/images/women/w-4.webp";
export { default as bcfMapBg } from "@/assets/images/kurdistan.webp";
export { default as bcfProjectHero } from "@/assets/images/women/w-4.webp";
export { default as bcfErbil } from "@/assets/images/bcf/optimized/schools/8D1A7011.webp";
/** Distinct from bcfErbil so Our Story chapter scroll visibly swaps the backdrop. */
export { default as bcfCorridor } from "@/assets/images/bcf/optimized/camps/baharka.webp";
export { default as bcfHubBg } from "@/assets/images/bcf/optimized/camps/harsham.webp";
export { default as bcfImpactBg } from "@/assets/images/bcf/selected/humanity-relief.webp";
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

/**
 * Journey-hub chapter discs — BCF humanitarian field photography only.
 *
 * Square 560×560 crops of the `selected/` plates, not the plates themselves.
 * The hub draws six of them at once inside 236 px circles: at the full 1600×
 * 1066 that was ~41 MB of decoded bitmap resident for six thumbnails, which is
 * what made the hub the slowest screen to arrive on and the first to stutter.
 * 560 still clears 2× on the 4K panel (the active disc is 252 CSS px).
 */
export { default as bcfJourneyStory } from "@/assets/images/bcf/thumbs/impact-schools.webp";
export { default as bcfJourneyHumanity } from "@/assets/images/bcf/thumbs/humanity-education.webp";
export { default as bcfJourneyMap } from "@/assets/images/bcf/thumbs/impact-camps.webp";
export { default as bcfJourneyImpact } from "@/assets/images/bcf/thumbs/impact-employees.webp";
export { default as bcfJourneyTrust } from "@/assets/images/bcf/thumbs/humanity-community.webp";
export { default as bcfJourneyFuture } from "@/assets/images/bcf/thumbs/humanstories-recovery.webp";
