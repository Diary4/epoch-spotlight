import React from "react";
import ReligionsFitCanvas from "@/components/Sections/religions/ReligionsFitCanvas";

type ReligionsScaledPageProps = {
  dir?: "ltr" | "rtl";
  lang?: string;
  fitDeps?: React.DependencyList;
  sectionRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  /** Kept for call-site compatibility — every religions screen now fits the window. */
  fitViewport?: boolean;
  children: React.ReactNode;
};

/**
 * Religions pages use the same 1400px design canvas as Women.tsx, scaled to fit
 * the window on both axes so no screen ever scrolls.
 */
export default function ReligionsScaledPage({
  dir,
  lang,
  fitDeps = [],
  sectionRef,
  className = "",
  children,
}: ReligionsScaledPageProps) {
  return (
    <ReligionsFitCanvas dir={dir} bgClassName="bg-[#faf8f5]" fitDeps={fitDeps}>
      <section
        ref={sectionRef}
        lang={lang}
        dir={dir}
        className={`relative flex min-h-full w-full flex-col overflow-x-hidden bg-[#faf8f5] text-[#3d2b18] ${className}`}
      >
        {children}
      </section>
    </ReligionsFitCanvas>
  );
}
