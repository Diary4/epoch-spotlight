/**
 * Paired photographs for each Our Story timeline beat.
 * Front card sits lower-left; back card sits upper-right — matching the
 * overlapping duo in the timeline concept.
 */

import journeyStory from "@/assets/images/bcf/from-source/journey-story.webp";
import journeyTrust from "@/assets/images/bcf/from-source/journey-trust.webp";
import humanityEducation from "@/assets/images/bcf/from-source/humanity-education.webp";
import humanityRelief from "@/assets/images/bcf/selected/humanity-relief.webp";
import humanityCamp from "@/assets/images/bcf/from-source/humanity-camp.webp";
import impactCamps from "@/assets/images/bcf/from-source/impact-camps.webp";
import humanityShelter from "@/assets/images/bcf/from-source/humanity-shelter.webp";
import humanityProtection from "@/assets/images/bcf/from-source/humanity-protection.webp";
import trustRecognition from "@/assets/images/bcf/from-source/trust-recognition.webp";
import trustPartnerships from "@/assets/images/bcf/from-source/trust-partnerships.webp";
import humanityHealth from "@/assets/images/bcf/from-source/humanity-health.webp";
import humanityCommunity from "@/assets/images/bcf/selected/humanity-community.webp";
import impactEmployees from "@/assets/images/bcf/from-source/impact-employees.webp";
import trustLeadership from "@/assets/images/bcf/from-source/trust-leadership.webp";
import humanityFood from "@/assets/images/bcf/from-source/humanity-food.webp";
import journeyHumanity from "@/assets/images/bcf/from-source/journey-humanity.webp";
import impactFamilies from "@/assets/images/bcf/from-source/impact-families.webp";
import impactBeneficiaries from "@/assets/images/bcf/from-source/impact-beneficiaries.webp";

export type StoryImagePair = {
  front: string;
  back: string;
};

export const bcfStoryImagePairs: Record<string, StoryImagePair> = {
  founded: { front: journeyStory, back: journeyTrust },
  "orphan-care": { front: humanityEducation, back: humanityRelief },
  sinjar: { front: humanityProtection, back: humanityShelter },
  camps: { front: humanityCamp, back: impactCamps },
  ecosoc: { front: trustRecognition, back: trustPartnerships },
  sphere: { front: trustLeadership, back: impactEmployees },
  "uk-duhok": { front: humanityHealth, back: humanityCommunity },
  "iso-quake": { front: humanityFood, back: journeyHumanity },
  recent: { front: impactFamilies, back: impactBeneficiaries },
};

export const bcfStoryImageFallback: StoryImagePair = {
  front: journeyStory,
  back: journeyTrust,
};
