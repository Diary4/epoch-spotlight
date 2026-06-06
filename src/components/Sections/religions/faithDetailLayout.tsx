import React from "react";
import { ArrowLeft, Globe2 } from "lucide-react";

export const FAITH_MAIN_CLASS =
  "m-0 flex min-h-screen w-full max-w-full justify-center overflow-x-hidden bg-[#f8f1e7] p-0 text-[#3d2b18] sm:w-screen";

export const FAITH_SECTION_CLASS =
  "relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-0 pb-12 pt-0 sm:px-7 sm:py-9 sm:pb-0 lg:px-16";

export const FAITH_CONTENT_PADDING = "px-4 sm:px-0";

export const FAITH_ICON_CARD_CLASS =
  "min-h-0 rounded-[24px] border-2 border-[#d8b875]/70 bg-[#fff8e9]/92 px-4 py-5 text-center shadow-[0_12px_28px_rgba(75,45,12,0.18)] backdrop-blur-sm sm:min-h-[335px] sm:px-5 sm:py-7";

export const FAITH_ICON_CARD_ICON_WRAP_CLASS =
  "mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full border-4 border-[#f4dfb7] bg-[#b9822d] text-white shadow-inner sm:mb-5 sm:h-20 sm:w-20";

export const FAITH_ICON_CARD_ICON_CLASS = "h-8 w-8 sm:h-10 sm:w-10";

export const FAITH_IMAGE_SIDE_CARD_CLASS =
  "grid min-h-0 grid-cols-1 gap-4 rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-4 py-5 shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm sm:grid-cols-[135px_1fr] sm:gap-5 sm:min-h-[255px] sm:px-6 sm:py-6";

export const FAITH_IMAGE_SIDE_AVATAR_CLASS =
  "mx-auto h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-[#d8b875] bg-[#f4e1bb] sm:mx-0 sm:h-[135px] sm:w-[135px]";

export const FAITH_TAGLINE_SECTION_CLASS =
  "mx-auto mt-6 flex max-w-[820px] flex-col items-center justify-center gap-4 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-5 py-4 text-center shadow-[0_12px_28px_rgba(75,45,12,0.16)] sm:mt-8 sm:flex-row sm:gap-8 sm:px-8 sm:py-5";

export const FAITH_TAGLINE_ICON_WRAP_CLASS =
  "grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#b9822d] text-white sm:h-20 sm:w-20";

export const FAITH_TAGLINE_TEXT_CLASS =
  "break-words font-serif text-[clamp(20px,5vw,34px)] font-semibold leading-snug text-[#3b2410] sm:leading-tight";

export const FAITH_TAGLINE_ACTION_SECTION_CLASS =
  "mx-auto mt-6 flex flex-col items-stretch gap-4 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-5 py-4 shadow-[0_12px_28px_rgba(75,45,12,0.16)] sm:mt-7 sm:flex-row sm:items-center sm:gap-7 sm:px-8 sm:py-5";

type FaithDetailControlsProps = {
  controlsAttr: string;
  backLabel: string;
  onBack?: () => void;
  onLanguageChange?: () => void;
  languageLabel: string;
};

export function FaithDetailControls({
  controlsAttr,
  backLabel,
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
        className="absolute left-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14"
        aria-label={backLabel}
      >
        <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>

      <button
        type="button"
        onClick={onLanguageChange}
        {...controlProps}
        className="absolute right-4 top-4 z-30 flex items-center gap-2 rounded-full border border-[#d9b477] bg-white/75 px-3 py-2 font-serif text-xs font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] sm:right-8 sm:top-8 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
      >
        <Globe2 className="h-4 w-4 sm:h-5 sm:w-5" />
        {languageLabel}
      </button>
    </>
  );
}

type FaithDetailHeroImageProps = {
  heroAttr: string;
  src: string;
  alt?: string;
  desktopClassName: string;
  children?: React.ReactNode;
};

export function FaithDetailHeroImage({
  heroAttr,
  src,
  alt = "",
  desktopClassName,
  children,
}: FaithDetailHeroImageProps) {
  const heroProps = { [heroAttr]: "true" };

  return (
    <>
      <div className="relative h-[min(38vh,300px)] min-h-[200px] w-screen max-w-[100vw] overflow-hidden sm:hidden">
        <img
          src={src}
          alt={alt}
          {...heroProps}
          className="h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf1df] to-transparent" />
      </div>

      <img
        src={src}
        alt={alt}
        {...heroProps}
        className={`hidden sm:block ${desktopClassName}`}
      />
      {children}
    </>
  );
}

type FaithDetailHeroVideoProps = {
  heroAttr: string;
  src: string;
  desktopClassName: string;
  children?: React.ReactNode;
};

export function FaithDetailHeroVideo({
  heroAttr,
  src,
  desktopClassName,
  children,
}: FaithDetailHeroVideoProps) {
  const heroProps = { [heroAttr]: "true" };

  return (
    <>
      <div className="relative h-[min(38vh,300px)] min-h-[200px] w-screen max-w-[100vw] overflow-hidden sm:hidden">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          {...heroProps}
          className="h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf1df] to-transparent" />
      </div>

      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        {...heroProps}
        className={`hidden sm:block ${desktopClassName}`}
      />
      {children}
    </>
  );
}

export function FaithDetailSpacer({ desktopHeight }: { desktopHeight: string }) {
  return <div className={`hidden sm:block ${desktopHeight}`} />;
}
