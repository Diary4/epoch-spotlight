import React from "react";
import { useWomenCanvasFit, WOMEN_DESIGN_WIDTH } from "@/components/Sections/women/womenCanvasFit";

type WomenScaledCanvasProps = {
  dir?: "ltr" | "rtl";
  className?: string;
  bgClassName?: string;
  fitDeps?: React.DependencyList;
  /** Scale down further so the full canvas height fits within the viewport (no scroll). */
  fitViewport?: boolean;
  /** Fixed overlays (e.g. back button) rendered outside the scaled canvas transform. */
  overlay?: React.ReactNode;
  children: React.ReactNode;
};

/** Width-scaled 1400px canvas; optionally scales to viewport height when `fitViewport` is set. */
export default function WomenScaledCanvas({
  dir,
  className = "",
  bgClassName = "bg-[#f9f3e8]",
  fitDeps = [],
  fitViewport = false,
  overlay,
  children,
}: WomenScaledCanvasProps) {
  const { canvasRef, fit } = useWomenCanvasFit(fitDeps, { fitViewport });

  return (
    <div
      dir={dir}
      className={`relative w-full overflow-x-hidden ${fitViewport ? "h-screen overflow-y-hidden" : "min-h-screen overflow-y-auto"} ${bgClassName} ${className}`}
    >
      {overlay}
      <div style={{ height: fit.contentHeight || undefined, position: "relative" }}>
        <div
          ref={canvasRef}
          // Flex column + growing children stretch the page (and its background)
          // to the full window height when the scaled content runs shorter.
          // `grow` (basis auto) keeps the canvas's natural height measurable,
          // unlike `flex-1` whose 0% basis can collapse it.
          className="flex flex-col [&>*]:grow"
          style={{
            width: WOMEN_DESIGN_WIDTH,
            minHeight: fit.minCanvasHeight || undefined,
            transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
