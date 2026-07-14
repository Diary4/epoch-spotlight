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

  const content = (
    <>
      <div className={`relative z-10 flex flex-1 flex-col px-6 pt-7 ${alignClass}`}>
        {eyebrow ? (
          <p className="mb-2 font-serif text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-500">
            {eyebrow}
          </p>
        ) : null}
        <h3
          className={`break-words font-serif text-[20px] font-semibold leading-tight text-stone-900 ${titleClassName}`}
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
        {footer ? <div className={`mt-4 w-full ${align === "center" ? "flex justify-center" : ""}`}>{footer}</div> : null}
      </div>

      <div className={`relative mt-4 w-full overflow-hidden ${imageHeightClass}`}>
        <img src={resolvedImage} alt="" className="h-full w-full object-cover saturate-[0.85]" />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: resolvedAccent, opacity: 0.32 }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-white via-white/70 to-transparent" />
      </div>
    </>
  );

  const sharedClassName = `group relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-[26px] border border-stone-200/70 bg-white shadow-[0_10px_30px_rgba(28,24,20,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(28,24,20,0.10)] ${isInteractive ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]" : ""} ${className}`;


  if (isInteractive) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel ?? title} className={sharedClassName}>
        {content}
      </button>
    );
  }

  return <article className={sharedClassName}>{content}</article>;
}
