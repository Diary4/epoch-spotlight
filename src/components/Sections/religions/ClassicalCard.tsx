import React from "react";
import type { LucideIcon } from "lucide-react";

type ClassicalCardProps = {
  title: string;
  image: string;
  ctaLabel?: string;
  onClick?: () => void;
  ariaLabel?: string;
  accent?: string;
  icon?: LucideIcon;
  index?: number;
  /** Wide lead chapter vs compact companion */
  variant?: "featured" | "companion";
};

/**
 * Hub chapter tile — featured lead or compact companion.
 */
export default function ClassicalCard({
  title,
  image,
  ctaLabel = "Explore",
  onClick,
  ariaLabel,
  accent = "#b98222",
  variant = "companion",
}: ClassicalCardProps) {
  const isFeatured = variant === "featured";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? title}
      className={`group flex w-full transform-gpu appearance-none flex-col gap-3 text-start outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform active:translate-y-0 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#d6a45b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] motion-reduce:transition-none ${
        isFeatured ? "min-h-[360px]" : "min-h-[300px]"
      }`}
    >
      <span
        className={`relative block w-full overflow-hidden rounded-[22px] shadow-[0_10px_28px_rgba(75,45,12,0.08)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isFeatured ? "h-[340px]" : "h-[220px]"
        }`}
      >
        <img
          src={image}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full transform-gpu object-cover object-center saturate-[0.92] transition-[transform,filter] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-active:scale-[1.03] motion-reduce:transition-none "
        />
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] "
          style={{ backgroundColor: accent }}
        />
      </span>

      <span className="flex flex-col gap-1.5 px-1">
        <span
          className={`font-serif font-semibold uppercase leading-tight tracking-[0.04em] text-[#2f1f12] transition-colors duration-300 ${
            isFeatured ? "text-[36px]" : "text-[22px]"
          }`}
        >
          {title}
        </span>
        <span className="font-serif text-[15px] font-medium tracking-[0.08em] text-[#8a6a45] transition-colors duration-300 ">
          {ctaLabel}
        </span>
      </span>
    </button>
  );
}
