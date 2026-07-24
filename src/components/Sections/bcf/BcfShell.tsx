import React from "react";
import { BCF_PAGE } from "@/components/Sections/bcf/bcfTheme";

type BcfShellProps = {
  showLogo?: boolean;
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
  children,
  className = "",
}: BcfShellProps) {
  return (
    <section className={`${BCF_PAGE} ${className}`}>
      {showLogo ? <BcfLogoMark /> : null}
      {children}
    </section>
  );
}
