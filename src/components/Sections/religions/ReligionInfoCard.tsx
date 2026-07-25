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
  /** Soften or shorten the white fade over the image top. */
  imageFadeClass?: string;
  imageClassName?: string;
  imageWrapClassName?: string;
  textSectionClassName?: string;
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
  imageFadeClass = "h-[16%] bg-gradient-to-b from-white via-white/35 to-transparent",
  imageClassName = "[mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_100%)]",
  imageWrapClassName = "mt-0",
  textSectionClassName = "",
}: ReligionInfoCardProps) {
  const resolvedAccent = getReligionCardAccent(accentIndex, accent);
  const resolvedImage = getReligionCardImage(accentIndex, image);
  const isInteractive = Boolean(onClick);
  const alignClass = align === "center" ? "text-center items-center" : "text-start";
  const imageGrows = imageHeightClass.includes("flex-1");
  const textSectionFlexes = textSectionClassName.includes("flex-1");

  const content = (
    <>
      <div
        className={`relative z-10 flex flex-col px-5 pt-6 ${textSectionFlexes ? "flex-1" : "shrink-0"} ${alignClass} ${textSectionClassName}`}
      >
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
          className={`mt-3 block h-[2px] w-[42px] ${align === "center" ? "mx-auto" : ""}`}
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
        className={`relative w-full overflow-hidden ${imageWrapClassName} ${
          imageGrows ? "min-h-[360px] flex-1" : imageHeightClass
        }`}
      >
        <img
          src={resolvedImage}
          alt=""
          decoding="async"
          className={`h-full w-full transform-gpu object-cover saturate-[0.9] transition-[transform,filter] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${isInteractive ? "group-hover:scale-[1.05] group-hover:saturate-100 group-active:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100" : ""} ${imageClassName}`}
        />
        <div className={`pointer-events-none absolute inset-x-0 top-0 ${imageFadeClass}`} />
      </div>
    </>
  );

  // Outer shell paints the gold edge; inner surface stays borderless.
  // Avoids the WebKit/Chromium 1px dark hairline on rounded bordered buttons.
  const shellClassName = `h-full w-full transform-gpu rounded-[24px] bg-[#e6d2a8] p-px shadow-[0_10px_28px_rgba(75,45,12,0.06)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${isInteractive ? "hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(75,45,12,0.16)] active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0" : ""} ${className.includes("min-h-") ? className : ""}`;
  const surfaceClassName = `group relative flex h-full w-full flex-col overflow-hidden rounded-[23px] border-0 bg-white text-start ${isInteractive ? "cursor-pointer appearance-none outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]" : ""} ${className.includes("min-h-") ? "min-h-full" : "min-h-[420px]"}`;

  if (isInteractive) {
    return (
      <div className={shellClassName}>
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel ?? title}
          className={surfaceClassName}
        >
          {content}
        </button>
      </div>
    );
  }

  return (
    <div className={shellClassName}>
      <article className={surfaceClassName}>{content}</article>
    </div>
  );
}
