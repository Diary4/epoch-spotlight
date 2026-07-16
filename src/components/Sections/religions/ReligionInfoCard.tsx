import React from "react";

import mainImg from "@/assets/images/religions/main.webp";
import faithsImg from "@/assets/images/religions/faiths.webp";
import nationsImg from "@/assets/images/religions/nations.webp";
import lawsImg from "@/assets/images/religions/nl-1.webp";
import valleyImg from "@/assets/images/religions/b-1.webp";

export const RELIGION_CARD_ACCENTS = ["#6f7d4e", "#bf7a2f", "#4d6b7c", "#8c4a54"] as const;

export const RELIGION_CARD_DEFAULT_IMAGES = [
  faithsImg,
  nationsImg,
  lawsImg,
  valleyImg,
  mainImg,
] as const;

export function getReligionCardAccent(index: number, override?: string) {
  if (override) return override;
  return RELIGION_CARD_ACCENTS[index % RELIGION_CARD_ACCENTS.length];
}

export function getReligionCardImage(index: number, override?: string) {
  if (override) return override;
  return RELIGION_CARD_DEFAULT_IMAGES[index % RELIGION_CARD_DEFAULT_IMAGES.length];
}

type ReligionInfoCardProps = {
  title: string;
  body?: string;
  image?: string;
  accent?: string;
  accentIndex?: number;
  onClick?: () => void;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  align?: "left" | "center";
  ariaLabel?: string;
  footer?: React.ReactNode;
  italicBody?: boolean;
  eyebrow?: string;
  imageHeightClass?: string;
};

export default function ReligionInfoCard({
  title,
  body,
  image,
  accent,
  accentIndex = 0,
  onClick,
  className = "",
  titleClassName = "",
  bodyClassName = "",
  align = "left",
  ariaLabel,
  footer,
  italicBody = false,
  eyebrow,
  imageHeightClass = "h-[260px]",
}: ReligionInfoCardProps) {
  const resolvedAccent = getReligionCardAccent(accentIndex, accent);
  const resolvedImage = getReligionCardImage(accentIndex, image);
  const isInteractive = Boolean(onClick);
  const alignClass = align === "center" ? "text-center items-center" : "text-left";
  const imageGrows = imageHeightClass.includes("flex-1");

  const content = (
    <>
      <div className={`relative z-10 flex shrink-0 flex-col px-5 pt-6 ${alignClass}`}>
        {eyebrow ? (
          <p className="mb-2 font-serif text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-500">
            {eyebrow}
          </p>
        ) : null}
        <h3
          className={`break-words font-serif text-[20px] font-semibold leading-tight text-[#2f1f12] ${titleClassName}`}
        >
          {title}
        </h3>
        <span
          className={`mt-3 block h-[2px] w-[42px] transition-all duration-300 group-hover:w-[64px] ${align === "center" ? "mx-auto" : ""}`}
          style={{ backgroundColor: resolvedAccent }}
        />
        {body ? (
          <p
            className={`mt-3 text-[14px] font-medium leading-relaxed text-stone-600 ${italicBody ? "italic" : ""} ${bodyClassName}`}
          >
            {body}
          </p>
        ) : null}
        {footer ? (
          <div className={`mt-4 w-full ${align === "center" ? "flex justify-center" : ""}`}>
            {footer}
          </div>
        ) : null}
      </div>

      <div
        className={`relative mt-5 w-full overflow-hidden ${
          imageGrows ? "min-h-[360px] flex-1" : imageHeightClass
        }`}
      >
        <img
          src={resolvedImage}
          alt=""
          className="h-full w-full object-cover saturate-[0.9] transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white via-white/55 to-transparent" />
      </div>
    </>
  );

  const sharedClassName = `group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-[#d7b77e]/45 bg-white shadow-[0_10px_28px_rgba(75,45,12,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[#d7b77e] hover:shadow-[0_16px_36px_rgba(75,45,12,0.1)] ${isInteractive ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]" : ""} ${className.includes("min-h-") ? className : `min-h-[420px] ${className}`}`;

  if (isInteractive) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel ?? title} className={sharedClassName}>
        {content}
      </button>
    );
  }

  return <article className={sharedClassName}>{content}</article>;
}
