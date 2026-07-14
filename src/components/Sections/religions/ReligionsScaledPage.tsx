import React from "react";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";

type ReligionsScaledPageProps = {
  dir?: "ltr" | "rtl";
  lang?: string;
  fitDeps?: React.DependencyList;
  sectionRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  /** Kept for call-site compatibility — religions now follow Women width-scaling. */
  fitViewport?: boolean;
  children: React.ReactNode;
};

/**
 * Religions pages use the same width-scaled canvas as Women.tsx so layout
 * stays consistent across window sizes (always fills width, may scroll).
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
    <WomenScaledCanvas dir={dir} bgClassName="bg-[#faf8f5]" fitDeps={fitDeps}>
      <section
        ref={sectionRef}
        lang={lang}
        className={`relative flex w-full flex-col overflow-x-hidden bg-[#faf8f5] text-[#3d2b18] ${className}`}
      >
        {children}
      </section>
    </WomenScaledCanvas>
  );
}
