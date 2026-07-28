import React from "react";
import FitScaledCanvas from "@/components/FitScaledCanvas";
import { WOMEN_DESIGN_WIDTH } from "@/components/Sections/women/womenCanvasFit";

type ReligionsFitCanvasProps = {
  dir?: "ltr" | "rtl";
  bgClassName?: string;
  className?: string;
  fitDeps?: React.DependencyList;
  children: React.ReactNode;
};

/** Religions artboard — Women's 1400px design width, always filling the window. */
export default function ReligionsFitCanvas({
  dir,
  bgClassName = "bg-[#faf8f5]",
  className = "",
  fitDeps = [],
  children,
}: ReligionsFitCanvasProps) {
  return (
    <FitScaledCanvas
      designWidth={WOMEN_DESIGN_WIDTH}
      dir={dir}
      bgClassName={bgClassName}
      className={className}
      fitDeps={fitDeps}
    >
      {children}
    </FitScaledCanvas>
  );
}
