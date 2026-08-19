import React from "react";
import { bcfLogoSeal } from "@/components/Sections/bcf/bcfAssets";

type BcfChapterPillProps = {
  title: string;
  className?: string;
};

/**
 * Centered seal + title pill used across Our Story / Humanity / Map / Future.
 * Always uses the circle-only BCF seal (portrait + flag rings, no wordmark).
 *
 * The seal was 160px and the pill 176 tall — a chapter marker taller than the
 * page title underneath it, and wide enough that on the map screen it ran into
 * the corner controls. At 104 it still reads as a seal at kiosk distance and
 * gives the screen below it seventy pixels back.
 */
export default function BcfChapterPill({ title, className = "" }: BcfChapterPillProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="relative flex min-w-[220px] items-center rounded-full border border-[#fbc158]/25 bg-black/45 py-3 ps-[128px] pe-7 backdrop-blur-md"
        style={{ boxShadow: "0 16px 44px rgba(0,0,0,0.42)" }}
      >
        <span className="absolute start-0 top-1/2 grid h-[104px] w-[104px] -translate-y-1/2 place-items-center overflow-hidden rounded-full bg-black/80">
          <img
            src={bcfLogoSeal}
            alt=""
            decoding="async"
            className="h-full w-full object-contain"
          />
        </span>
        <span className="text-[32px] font-light tracking-wide text-[#fdeed4]">{title}</span>
      </div>
    </div>
  );
}
