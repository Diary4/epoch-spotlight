/**
 * Photographs for each Our Story beat.
 * Timeline years come from `New group of photos/Timeline` (filenames = years).
 * 2015 and 2019 had no year plate there, so they use matching plates from the
 * same new group (Our Impact / Sectors).
 */

import journeyStory from "@/assets/images/bcf/from-source/journey-story.webp";
import journeyTrust from "@/assets/images/bcf/from-source/journey-trust.webp";
import trustLeadership from "@/assets/images/bcf/from-source/trust-leadership.webp";
import trustPartnerships from "@/assets/images/bcf/from-source/trust-partnerships.webp";
import storyMission from "@/assets/images/bcf/selected/story-mission.webp";
import storyPhilosophy from "@/assets/images/bcf/selected/story-philosophy.webp";
import storyVision from "@/assets/images/bcf/selected/story-vision.webp";

import year2005 from "@/assets/images/bcf/optimized/story-timeline/2005.webp";
import year2009 from "@/assets/images/bcf/optimized/story-timeline/2009.webp";
import year2011 from "@/assets/images/bcf/optimized/story-timeline/2011.webp";
import year2013 from "@/assets/images/bcf/optimized/story-timeline/2013.webp";
import year2014 from "@/assets/images/bcf/optimized/story-timeline/2014.webp";
import year2015 from "@/assets/images/bcf/optimized/story-timeline/2015.webp";
import year2016 from "@/assets/images/bcf/optimized/story-timeline/2016.webp";
import year2018 from "@/assets/images/bcf/optimized/story-timeline/2018.webp";
import year2019 from "@/assets/images/bcf/optimized/story-timeline/2019.webp";
import year2020 from "@/assets/images/bcf/optimized/story-timeline/2020.webp";
import year2021 from "@/assets/images/bcf/optimized/story-timeline/2021.webp";
import year2023 from "@/assets/images/bcf/optimized/story-timeline/2023.webp";
import year2025 from "@/assets/images/bcf/optimized/story-timeline/2025.webp";
import year2026 from "@/assets/images/bcf/optimized/story-timeline/2026.webp";

export type StoryImagePair = {
  front: string;
  back: string;
  /**
   * Logo / document plates must show edge-to-edge — `cover` crops them in the
   * fixed 780×560 story frame. Portrait photographs use `contain` so the full
   * image fits inside the frame without resizing it.
   */
  fit?: "cover" | "contain";
  /** Letterbox colour behind a `contain` image. Defaults to white, which suits
   *  logo and document plates; photographs use the dark story tone. */
  mat?: string;
};

/** Near-black behind a contained photograph, so the strip either side reads as
 *  part of the night background rather than as a border of its own. */
const PHOTO_MAT = "#0b0d12";

function plate(
  src: string,
  options?: { fit?: "cover" | "contain"; mat?: string },
): StoryImagePair {
  return {
    front: src,
    back: src,
    fit: options?.fit,
    mat: options?.mat,
  };
}

export const bcfStoryImagePairs: Record<string, StoryImagePair> = {
  founded: plate(year2005),
  "orphan-care": plate(year2009),
  "van-earthquake": plate(year2011),
  "syrian-refugees": plate(year2013),
  sinjar: plate(year2014),
  camps: plate(year2015),
  ecosoc: plate(year2016, { fit: "contain" }),
  sphere: plate(year2018),
  "syria-cross-border": plate(year2019),
  "uk-duhok": plate(year2020),
  autism: plate(year2021),
  "iso-quake": plate(year2023),
  "drug-rehab": plate(year2025),
  shipments: plate(year2026),
  /** Identity panes restored after the year timeline. */
  mission: plate(storyMission, { fit: "contain", mat: PHOTO_MAT }),
  vision: plate(storyVision, { fit: "contain", mat: PHOTO_MAT }),
  philosophy: plate(storyPhilosophy),
  values: { front: trustLeadership, back: trustPartnerships },
};

export const bcfStoryImageFallback: StoryImagePair = {
  front: journeyStory,
  back: journeyTrust,
};
