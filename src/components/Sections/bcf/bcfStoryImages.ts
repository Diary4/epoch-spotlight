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
   * Logo / document plates must show whole — `cover` would crop them in the
   * fixed 780×560 story frame. Photographs stay on `cover` and fill the frame.
   */
  fit?: "cover" | "contain";
  /** Letterbox colour behind a `contain` plate. Defaults to white. */
  mat?: string;
  /**
   * Which part of a `cover` photograph survives the crop. A portrait photo
   * keeps only a horizontal band of itself in the landscape frame, and centring
   * that band is rarely where the subject is.
   */
  objectPosition?: string;
};

function plate(
  src: string,
  options?: { fit?: "cover" | "contain"; mat?: string; objectPosition?: string },
): StoryImagePair {
  return {
    front: src,
    back: src,
    fit: options?.fit,
    mat: options?.mat,
    objectPosition: options?.objectPosition,
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
  /* Both are portrait shots framed around a person seen from behind. The crop
     is pulled below centre so it holds the subject rather than the sky: the
     child and the helmet in Mission, the head and the chest badge in Vision. */
  mission: plate(storyMission, { objectPosition: "center 55%" }),
  vision: plate(storyVision, { objectPosition: "center 62%" }),
  philosophy: plate(storyPhilosophy),
  values: { front: trustLeadership, back: trustPartnerships },
};

export const bcfStoryImageFallback: StoryImagePair = {
  front: journeyStory,
  back: journeyTrust,
};
