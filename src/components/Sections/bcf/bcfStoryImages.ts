/**
 * Photographs for each Our Story beat.
 * Timeline years come from `New group of photos/Timeline` (filenames = years).
 * 2015 and 2019 had no year plate there, so they use matching plates from the
 * same new group (Our Impact / Sectors).
 */

import journeyStory from "@/assets/images/bcf/from-source/journey-story.webp";
import journeyTrust from "@/assets/images/bcf/from-source/journey-trust.webp";
import journeyHumanity from "@/assets/images/bcf/from-source/journey-humanity.webp";
import impactBeneficiaries from "@/assets/images/bcf/from-source/impact-beneficiaries.webp";
import impactFamilies from "@/assets/images/bcf/from-source/impact-families.webp";
import trustLeadership from "@/assets/images/bcf/from-source/trust-leadership.webp";
import trustPartnerships from "@/assets/images/bcf/from-source/trust-partnerships.webp";
import storyPhilosophy from "@/assets/images/bcf/selected/story-philosophy.webp";

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
};

function plate(src: string): StoryImagePair {
  return { front: src, back: src };
}

export const bcfStoryImagePairs: Record<string, StoryImagePair> = {
  founded: plate(year2005),
  "orphan-care": plate(year2009),
  "van-earthquake": plate(year2011),
  "syrian-refugees": plate(year2013),
  sinjar: plate(year2014),
  camps: plate(year2015),
  ecosoc: plate(year2016),
  sphere: plate(year2018),
  "syria-cross-border": plate(year2019),
  "uk-duhok": plate(year2020),
  autism: plate(year2021),
  "iso-quake": plate(year2023),
  "drug-rehab": plate(year2025),
  shipments: plate(year2026),
  /** Identity panes restored after the year timeline. */
  mission: { front: journeyHumanity, back: journeyTrust },
  vision: { front: impactBeneficiaries, back: impactFamilies },
  philosophy: plate(storyPhilosophy),
  values: { front: trustLeadership, back: trustPartnerships },
};

export const bcfStoryImageFallback: StoryImagePair = {
  front: journeyStory,
  back: journeyTrust,
};
