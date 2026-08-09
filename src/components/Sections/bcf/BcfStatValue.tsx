import { useCallback } from "react";
import { motion } from "motion/react";
import CountUp from "@/components/CountUp";
import { parseBcfStat } from "@/components/Sections/bcf/bcfStat";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import type { BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";

type BcfStatValueProps = {
  value: string;
  lang: BcfLang;
  className?: string;
  duration?: number;
  delay?: number;
  color?: string;
  /** Softer ease-out count — preferred for large impact figures. */
  smooth?: boolean;
};

export default function BcfStatValue({
  value,
  lang,
  className = "text-[52px] font-bold",
  duration = 2,
  delay = 0,
  color = BCF.gold,
  smooth = false,
}: BcfStatValueProps) {
  const stat = parseBcfStat(value);
  const formatDigits = useCallback(
    (digits: string) => bcfDigits(digits, lang),
    [lang],
  );

  return (
    <motion.span
      className={`inline-flex items-baseline font-sans tabular-nums tracking-[-0.03em] ${className}`}
      style={{
        color,
        textShadow: `0 10px 40px rgba(0,0,0,0.45), 0 0 28px ${color}22`,
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay * 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {bcfDigits(stat.prefix, lang)}
      <CountUp
        to={stat.to}
        duration={duration}
        delay={delay}
        separator={stat.separator}
        className={className}
        smooth={smooth}
        formatDigits={formatDigits}
      />
      {bcfDigits(stat.suffix, lang)}
    </motion.span>
  );
}
