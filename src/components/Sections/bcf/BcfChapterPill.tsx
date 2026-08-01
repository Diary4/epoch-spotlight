import React from "react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";

type BcfChapterPillProps = {
  title: string;
  thumb: string;
  className?: string;
};

/** Centered avatar + title pill used across Our Story / Impact / Map / Future. */
export default function BcfChapterPill({ title, thumb, className = "" }: BcfChapterPillProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="relative flex min-w-[280px] items-center rounded-full border border-[#fbc158]/25 bg-black/45 py-4 ps-[200px] pe-8 backdrop-blur-md"
        style={{ boxShadow: "0 16px 44px rgba(0,0,0,0.42)" }}
      >
        <span
          className="absolute start-0 top-1/2 h-[160px] w-[160px] -translate-y-1/2 overflow-hidden rounded-full border-2"
          style={{
            borderColor: BCF.gold,
            boxShadow: `0 0 34px ${BCF.gold}40`,
          }}
        >
          <img src={thumb} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="text-[40px] font-light tracking-wide text-[#fdeed4]">{title}</span>
      </div>
    </div>
  );
}
