import React from "react";
import { motion } from "motion/react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE } from "@/components/Sections/bcf/bcfMotion";

type BcfProfileHeroProps = {
  image: string;
  name: string;
  role: string;
  meta: string;
  /** Where the nameplate sits along the foot of the plate. */
  align?: "start" | "center";
  height?: number;
  /** `object-position` on the photograph, for crops whose subject is off-centre. */
  objectPosition?: string;
  /** Widen the plate when a name runs long in Kurdish or Arabic. */
  plateWidth?: number;
};

/**
 * The head of a person's page: a full-bleed photograph with the nameplate laid
 * over its foot.
 *
 * The plate used to sit above the photography as a separate object, which made
 * every profile open on two competing rectangles. Over the image it reads the
 * way a caption on a print does — and the gradient beneath it is doing two jobs
 * at once, seating the type and dissolving the photograph into the page rather
 * than cutting it off on a hard edge.
 */
export default function BcfProfileHero({
  image,
  name,
  role,
  meta,
  align = "start",
  height = 700,
  objectPosition = "50% 28%",
  plateWidth = 640,
}: BcfProfileHeroProps) {
  return (
    <div
      className="relative w-full shrink-0 overflow-hidden"
      style={{ height }}
    >
      <motion.img
        src={image}
        alt=""
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: BCF_EASE }}
      />

      {/* Two gradients, not one. The vertical wash seats the nameplate and melts
          the plate into the page; the warm corner is the same gold bloom the
          rest of the chapter carries, so the photograph belongs to it. */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,3,2,0.62) 0%, rgba(4,3,2,0.10) 30%, rgba(4,3,2,0.55) 72%, rgba(10,10,10,0.96) 100%)",
        }}
      />
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(680px 520px at 8% 4%, rgba(251,193,88,0.16), transparent 62%)",
        }}
      />

      <motion.div
        className={`absolute bottom-9 backdrop-blur-md ${
          align === "center" ? "start-0 end-0 mx-auto" : "start-12"
        }`}
        style={{
          maxWidth: plateWidth,
          width: align === "center" ? plateWidth : undefined,
          padding: "22px 30px",
          borderRadius: 14,
          border: `1px solid ${BCF.gold}3d`,
          background:
            "linear-gradient(165deg, rgba(24,18,8,0.72) 0%, rgba(8,8,8,0.62) 100%)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
          textAlign: align === "center" ? "center" : "start",
        }}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.24, ease: BCF_EASE }}
      >
        <h1
          className="text-[46px] font-semibold leading-tight"
          style={{ color: BCF.cream }}
        >
          {name}
        </h1>
        <p className="mt-2 text-[24px] font-medium" style={{ color: BCF.gold }}>
          {role}
        </p>
        <p className="mt-1 text-[20px] text-white/55">{meta}</p>
      </motion.div>
    </div>
  );
}
