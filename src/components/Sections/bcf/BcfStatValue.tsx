import { motion } from "motion/react";
import CountUp from "@/components/CountUp";
import { parseBcfStat } from "@/components/Sections/bcf/bcfStat";
import { BCF } from "@/components/Sections/bcf/bcfTheme";

type BcfStatValueProps = {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
  color?: string;
  /** Softer ease-out count — preferred for large impact figures. */
  smooth?: boolean;
};

export default function BcfStatValue({
  value,
  className = "text-[52px] font-bold",
  duration = 2,
  delay = 0,
  color = BCF.gold,
  smooth = false,
}: BcfStatValueProps) {
  const stat = parseBcfStat(value);
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
      {stat.prefix}
      <CountUp
        to={stat.to}
        duration={duration}
        delay={delay}
        separator={stat.separator}
        className={className}
        smooth={smooth}
      />
      {stat.suffix}
    </motion.span>
  );
}
