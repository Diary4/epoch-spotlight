import React from "react";
import { ArrowLeft, Globe2 } from "lucide-react";
import {
  detailBackIconClassName,
  detailBackIconSize,
  religionsOverlayEndClassName,
  religionsOverlayStartClassName,
} from "@/constants/backNavigation";
import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

/** @deprecated Prefer FaithDetailPageShell — kept for gradual migration */
export const FAITH_MAIN_CLASS =
  "m-0 flex min-h-[1920px] w-full flex-col overflow-hidden bg-[#faf8f5] p-0 text-[#3d2b18]";

export const FAITH_SECTION_CLASS =
  "relative flex min-h-[1920px] w-full flex-col overflow-hidden bg-[#faf8f5] px-7 pb-14 pt-0";

export const FAITH_CONTENT_PADDING = "px-0";

/** Shared layout so every faith/nation detail page aligns title + topic card the same way. */
export const FAITH_DETAIL_CONTENT_WIDTH = "max-w-[1120px]";
export const FAITH_DETAIL_HEADER_CLASS =
  "mx-auto max-w-[850px] pt-[140px] text-center";
export const FAITH_DETAIL_HEADER_SPACER = "h-[540px]";

/**
 * Shared hero type scale — every faith detail page renders its title and
 * subtitle at the same size. Pages append their own colour / drop-shadow /
 * spacing utilities, never a different `text-[…px]`.
 */
export const FAITH_DETAIL_TITLE_CLASS =
  "break-words font-serif text-[96px] font-light uppercase leading-[1.04] tracking-[0.04em]";

export const FAITH_DETAIL_SUBTITLE_CLASS =
  "font-serif text-[22px] font-light leading-relaxed";

export const FAITH_ICON_CARD_CLASS =
  "min-h-[335px] rounded-[24px] border-2 border-[#d8b875]/70 bg-[#fff8e9]/92 px-5 py-7 text-center shadow-[0_12px_28px_rgba(75,45,12,0.18)] backdrop-blur-sm";

/** Grid info card used across faith and nation detail pages. */
export function FaithDetailCard({
  title,
  text,
  image,
  index,
  accent,
  animateAttr,
}: {
  title: string;
  text: string;
  image?: string;
  index: number;
  accent?: string;
  animateAttr?: string;
}) {
  const wrapperProps = animateAttr ? { [animateAttr]: "true" } : {};

  return (
    <div {...wrapperProps} className="h-full">
      <ReligionInfoCard
        title={title}
        body={text}
        image={image}
        accent={accent}
        accentIndex={index}
        align="center"
        titleClassName="uppercase"
        bodyClassName="line-clamp-6"
        className="min-h-[480px] h-full"
        textSectionClassName="min-h-[210px] flex-1"
        imageHeightClass="h-[240px]"
        imageWrapClassName="mt-auto shrink-0"
      />
    </div>
  );
}

export const FAITH_DETAIL_CARD_GRID_4 = "grid grid-cols-4 items-stretch gap-6";
export const FAITH_DETAIL_CARD_GRID_2 = "grid grid-cols-2 items-stretch gap-6";

export const FAITH_ICON_CARD_ICON_WRAP_CLASS =
  "mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-4 border-[#f4dfb7] bg-[#b9822d] text-white shadow-inner";

export const FAITH_ICON_CARD_ICON_CLASS = "h-10 w-10";

export const FAITH_IMAGE_SIDE_CARD_CLASS =
  "grid min-h-[255px] grid-cols-[135px_1fr] gap-5 rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-6 py-6 shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm";

export const FAITH_IMAGE_SIDE_AVATAR_CLASS =
  "mx-0 h-[135px] w-[135px] overflow-x-hidden rounded-full border-2 border-[#d8b875] bg-[#f4e1bb]";

export const FAITH_TAGLINE_SECTION_CLASS =
  "mx-auto mt-8 flex max-w-[820px] flex-row items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-5 text-center shadow-[0_12px_28px_rgba(75,45,12,0.16)]";

export const FAITH_TAGLINE_ICON_WRAP_CLASS =
  "grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#b9822d] text-white";

export const FAITH_TAGLINE_TEXT_CLASS =
  "break-words font-serif text-[28px] font-semibold leading-tight text-[#3b2410]";

export const NATION_TAGLINE_TEXT_CLASS =
  "break-words font-serif text-[28px] font-light leading-tight text-[#3b2410]";

export const FAITH_TAGLINE_ACTION_SECTION_CLASS =
  "mx-auto mt-7 flex flex-row items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]";

type FaithDetailPageShellProps = {
  dir?: "ltr" | "rtl";
  lang?: string;
  fitDeps?: React.DependencyList;
  sectionRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
};

/** Scales faith/nation detail screens to fit the viewport with no scroll. */
export function FaithDetailPageShell({
  dir = "ltr",
  lang,
  fitDeps = [],
  sectionRef,
  children,
}: FaithDetailPageShellProps) {
  return (
    <ReligionsScaledPage
      dir={dir}
      lang={lang}
      fitDeps={fitDeps}
      sectionRef={sectionRef}
      className="px-7 pb-14"
    >
      {children}
    </ReligionsScaledPage>
  );
}

type FaithDetailControlsProps = {
  controlsAttr: string;
  backLabel: string;
  dir?: "ltr" | "rtl";
  onBack?: () => void;
  onLanguageChange?: () => void;
  languageLabel: string;
};

export function FaithDetailControls({
  controlsAttr,
  backLabel,
  dir = "ltr",
  onBack,
  onLanguageChange,
  languageLabel,
}: FaithDetailControlsProps) {
  const controlProps = { [controlsAttr]: "true" };

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        {...controlProps}
        className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm ${religionsOverlayStartClassName(dir)}`}
        aria-label={backLabel}
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      <button
        type="button"
        onClick={onLanguageChange}
        {...controlProps}
        className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] ${religionsOverlayEndClassName(dir)}`}
      >
        <Globe2 className="h-5 w-5" />
        {languageLabel}
      </button>
    </>
  );
}

type FaithDetailHeroImageProps = {
  heroAttr: string;
  src: string;
  alt?: string;
  /** Kept for call-site compatibility; kiosk uses a fixed hero height. */
  desktopClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
  heightClassName?: string;
  children?: React.ReactNode;
};

export function FaithDetailHeroImage({
  heroAttr,
  src,
  alt = "",
  imageClassName = "",
  overlayClassName = "bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95",
  heightClassName = "h-[900px]",
  children,
}: FaithDetailHeroImageProps) {
  const heroProps = { [heroAttr]: "true" };

  return (
    <>
      <img
        src={src}
        alt={alt}
        {...heroProps}
        className={`absolute inset-x-0 top-0 ${heightClassName} w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_84%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_84%,transparent_100%)] ${imageClassName}`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 ${heightClassName} ${overlayClassName}`}
      />
      {children}
    </>
  );
}

type FaithDetailHeroVideoProps = {
  heroAttr: string;
  src: string;
  desktopClassName?: string;
  children?: React.ReactNode;
};

export function FaithDetailHeroVideo({
  heroAttr,
  src,
  children,
}: FaithDetailHeroVideoProps) {
  const heroProps = { [heroAttr]: "true" };

  return (
    <>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        {...heroProps}
        className="absolute inset-x-0 top-0 h-[900px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
      />
      <div className="absolute inset-x-0 top-0 h-[900px] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />
      {children}
    </>
  );
}

/** Fixed spacer between hero header and topic card on the 1920px artboard. */
export function FaithDetailSpacer({ desktopHeight = FAITH_DETAIL_HEADER_SPACER }: { desktopHeight?: string }) {
  return <div className={desktopHeight} />;
}
