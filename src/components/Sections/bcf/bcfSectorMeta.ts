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

import heroEmergency from "@/assets/images/bcf/optimized/flood/2B1A6744.webp";
import heroSchools from "@/assets/images/bcf/optimized/schools/8D1A7011.webp";
import heroCamps from "@/assets/images/bcf/optimized/camps/baharka.webp";
import heroShelter from "@/assets/images/bcf/optimized/camps/qushtapa.webp";
import heroHealth from "@/assets/images/bcf/drug-hospital/DSC_0070.webp";
import heroRelief from "@/assets/images/bcf/selected/humanity-relief.webp";
import heroCommunity from "@/assets/images/bcf/selected/humanity-community.webp";
import heroIdps from "@/assets/images/bcf/selected/impact-idps.webp";

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
  food: heroRelief,
  health: heroHealth,
  education: heroSchools,
  shelter: heroShelter,
  wash: heroIdps,
  camp: heroCamps,
  nfi: heroRelief,
  disability: heroHealth,
  protection: heroIdps,
  livelihood: heroCommunity,
  cash: heroCommunity,
  environment: heroRelief,
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
