/**
 * Presentation for the fourteen sectors: the icon a row is marked with, and the
 * BCF plate a sector page opens on.
 *
 * Photography is only assigned where BCF's own folders actually cover the
 * sector — schools, camps, flood response, the hospital set. The rest share a
 * neutral relief plate rather than being given a picture that implies a
 * programme nobody photographed; a sector page is a register of documented
 * work, and the image must not claim more than the entries do.
 */
import {
  Accessibility,
  Briefcase,
  Droplets,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Home,
  Package,
  ShieldCheck,
  Siren,
  Sprout,
  Tent,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import type { SectorId } from "@/components/Sections/bcf/bcfProjectData";
import { BCF } from "@/components/Sections/bcf/bcfTheme";

import heroEmergency from "@/assets/images/bcf/from-source/humanity-shelter.webp";
import heroSchools from "@/assets/images/bcf/from-source/humanity-education.webp";
import heroCamps from "@/assets/images/bcf/from-source/humanity-camp.webp";
import heroShelter from "@/assets/images/bcf/from-source/humanity-shelter.webp";
import heroHealth from "@/assets/images/bcf/from-source/humanity-health.webp";
import heroFood from "@/assets/images/bcf/from-source/humanity-food.webp";
import heroWash from "@/assets/images/bcf/from-source/humanity-wash.webp";
import heroNfi from "@/assets/images/bcf/from-source/humanity-nfi.webp";
import heroDisability from "@/assets/images/bcf/from-source/humanity-rehab.webp";
import heroProtection from "@/assets/images/bcf/from-source/humanity-protection.webp";
import heroLivelihood from "@/assets/images/bcf/from-source/humanity-livelihood.webp";
import heroCash from "@/assets/images/bcf/from-source/humanity-cash.webp";
import heroEnvironment from "@/assets/images/bcf/from-source/humanity-environment.webp";
import heroCommunity from "@/assets/images/bcf/selected/humanity-community.webp";

export const BCF_SECTOR_ICONS: Record<SectorId, typeof Siren> = {
  emergency: Siren,
  food: UtensilsCrossed,
  health: HeartPulse,
  education: GraduationCap,
  shelter: Home,
  wash: Droplets,
  camp: Tent,
  nfi: Package,
  disability: Accessibility,
  protection: ShieldCheck,
  livelihood: Briefcase,
  cash: HandCoins,
  environment: Sprout,
  community: Users,
};

export const BCF_SECTOR_HERO: Record<SectorId, string> = {
  emergency: heroEmergency,
  food: heroFood,
  health: heroHealth,
  education: heroSchools,
  shelter: heroShelter,
  wash: heroWash,
  camp: heroCamps,
  nfi: heroNfi,
  disability: heroDisability,
  protection: heroProtection,
  livelihood: heroLivelihood,
  cash: heroCash,
  environment: heroEnvironment,
  community: heroCommunity,
};

/**
 * Era accents. Gold carries the present, and the past cools towards the sand
 * and nature tokens — so a visitor reads the age of a line before they read the
 * year on it. Red is reserved for `current`, matching the recap's own use of it
 * for the 2026 column.
 */
export const BCF_ERA_COLORS = {
  historic: BCF.nature,
  annual: BCF.sand,
  latest: BCF.gold,
  current: BCF.goldBright,
} as const;
