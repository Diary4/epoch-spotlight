import React from "react";
import { BCF_PAGE } from "@/components/Sections/bcf/bcfTheme";

type BcfShellProps = {
  showLogo?: boolean;
  /** Optional full-bleed background image (template until VIP assets arrive). */
  backgroundImage?: string;
  /** Extra class for the dark scrim over the background image. */
  overlayClassName?: string;
  /** Optional custom background layer (e.g. DomeGallery on one page only). */
  backgroundSlot?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

function BcfLogoMark() {
  return (
    <div className="pointer-events-none absolute left-10 top-10 z-30 flex flex-col items-center gap-1">
      <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#e8c56a] bg-black/50 text-[11px] font-semibold tracking-wide text-[#e8c56a]">
        BCF
      </div>
      <span className="font-serif text-[28px] font-bold leading-none tracking-[0.08em] text-[#c41e3a]">
        BCF
      </span>
    </div>
  );
}

export default function BcfShell({
  showLogo = true,
  backgroundImage,
  overlayClassName = "bg-black/50",
  backgroundSlot,
  children,
  className = "",
}: BcfShellProps) {
  return (
    <section className={`${BCF_PAGE} ${className}`}>
      {backgroundSlot ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {backgroundSlot}
          <div className={`absolute inset-0 ${overlayClassName}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
        </div>
      ) : backgroundImage ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={backgroundImage}
            alt=""
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 ${overlayClassName}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
        </div>
      ) : null}

      {showLogo ? <BcfLogoMark /> : null}
      <div className="relative z-10 flex min-h-[1920px] w-full flex-1 flex-col">
        {children}
      </div>
    </section>
  );
}
