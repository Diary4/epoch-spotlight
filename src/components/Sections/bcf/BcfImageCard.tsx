import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_TAP, BCF_TAP_TRANSITION } from "@/components/Sections/bcf/bcfMotion";

type BcfImageCardProps = {
  title: string;
  image: string;
  onClick?: () => void;
  className?: string;
};

/**
 * Figma journey / future row: title + arrow on the start side, masked photo on
 * the end side. Logical CSS (`start` / `end` / `text-start`) keeps Kurdish and
 * Arabic from stacking the title over the photograph.
 */
export default function BcfImageCard({
  title,
  image,
  onClick,
  className = "",
}: BcfImageCardProps) {
  const interactive = Boolean(onClick);
  const [pressed, setPressed] = React.useState(false);

  const Comp = interactive ? motion.button : motion.div;
  const pressProps = interactive
    ? {
        onPointerDown: () => setPressed(true),
        onPointerUp: () => setPressed(false),
        onPointerLeave: () => setPressed(false),
        onPointerCancel: () => setPressed(false),
        whileTap: BCF_TAP,
        transition: BCF_TAP_TRANSITION,
      }
    : {};

  return (
    <Comp
      type={interactive ? "button" : undefined}
      onClick={onClick}
      {...pressProps}
      className={`group relative flex h-[200px] w-full transform-gpu items-center overflow-hidden rounded-[24px] border text-start will-change-transform ${className}`}
      style={{
        borderColor: pressed ? BCF.gold : "rgba(132,135,157,0.8)",
        backgroundColor: pressed ? "rgba(251,193,88,0.07)" : "rgba(0,0,0,0.24)",
        boxShadow: pressed
          ? `0 0 40px ${BCF.gold}33`
          : "0 14px 42px rgba(0,0,0,0.32)",
        transition:
          "border-color 420ms cubic-bezier(0.22,1,0.36,1), background-color 420ms cubic-bezier(0.22,1,0.36,1), box-shadow 420ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Soft scrim under the title so white type clears the photo in both dirs. */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-[1] w-[62%] bg-gradient-to-r from-black/80 via-black/45 to-transparent rtl:bg-gradient-to-l" />

      <div
        className="pointer-events-none absolute inset-y-0 end-0 w-[46%] [mask-image:linear-gradient(to_right,transparent_0%,black_28%)] rtl:[mask-image:linear-gradient(to_left,transparent_0%,black_28%)]"
      >
        <img
          src={image}
          alt=""
          decoding="async"
          className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-smooth-out will-change-transform motion-reduce:transition-none"
          style={{ transform: pressed ? "scale(1.06)" : "scale(1)" }}
        />
      </div>

      <div className="relative z-10 flex max-w-[58%] flex-col items-start gap-5 px-9">
        <span
          className="text-[48px] font-light leading-none text-[#fdeed4]"
          style={{
            textShadow:
              "0 1px 2px rgba(0,0,0,0.9), 0 4px 18px rgba(0,0,0,0.75)",
          }}
        >
          {title}
        </span>
        <span className="flex items-center gap-2" style={{ color: BCF.gold }}>
          <span
            className="h-px bg-current transition-all duration-500 ease-smooth-out motion-reduce:transition-none"
            style={{ width: pressed ? 96 : 64 }}
          />
          <ArrowRight
            className={`h-6 w-6 transform-gpu transition-transform duration-500 ease-smooth-out motion-reduce:transition-none rtl:rotate-180 ${
              pressed ? "translate-x-2 rtl:-translate-x-2" : "translate-x-0"
            }`}
          />
        </span>
      </div>
    </Comp>
  );
}
