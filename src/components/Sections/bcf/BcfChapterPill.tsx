import React from "react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfLogoSeal } from "@/components/Sections/bcf/bcfAssets";

type BcfChapterPillProps = {
  title: string;
  className?: string;
};

/**
 * Centered seal + title pill used across Our Story / Humanity / Map / Future.
 * Always uses the circle-only BCF seal (no photo thumb, no red wordmark).
 */
export default function BcfChapterPill({ title, className = "" }: BcfChapterPillProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="relative flex min-w-[280px] items-center rounded-full border border-[#fbc158]/25 bg-black/45 py-4 ps-[200px] pe-8 backdrop-blur-md"
        style={{ boxShadow: "0 16px 44px rgba(0,0,0,0.42)" }}
      >
        <span
          className="absolute start-0 top-1/2 grid h-[160px] w-[160px] -translate-y-1/2 place-items-center overflow-hidden rounded-full border-2 bg-black/80"
          style={{
            borderColor: BCF.gold,
            boxShadow: `0 0 34px ${BCF.gold}40`,
          }}
        >
          <img
            src={bcfLogoSeal}
            alt=""
            decoding="async"
            className="h-[92%] w-[92%] object-contain"
          />
        </span>
        <span className="text-[40px] font-light tracking-wide text-[#fdeed4]">{title}</span>
      </div>
    </div>
  );
}
