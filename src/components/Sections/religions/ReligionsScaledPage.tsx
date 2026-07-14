import React from "react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import { RELIGIONS_OFFWHITE } from "@/components/Sections/religions/religionsLayout";

export { RELIGIONS_OFFWHITE };

type ReligionsScaledPageProps = {
  dir?: "ltr" | "rtl";
  lang?: string;
  fitDeps?: React.DependencyList;
  sectionRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  children: React.ReactNode;
};

/** Fixed 1080×1920 religions artboard that scales to fit any window with no scroll. */
export default function ReligionsScaledPage({
  dir,
  lang,
  fitDeps = [],
  sectionRef,
  className = "",
  children,
}: ReligionsScaledPageProps) {
  return (
    <DesignScaledCanvas
      dir={dir}
      fitViewport
      bgClassName="bg-[#faf8f5]"
      fitDeps={fitDeps}
    >
      <section
        ref={sectionRef}
        lang={lang}
        className={`relative flex min-h-[1920px] w-full flex-col overflow-hidden bg-[#faf8f5] text-[#3d2b18] ${className}`}
      >
        {children}
      </section>
    </DesignScaledCanvas>
  );
}
