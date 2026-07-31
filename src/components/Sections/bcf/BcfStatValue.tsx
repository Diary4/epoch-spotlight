import CountUp from "@/components/CountUp";
import { parseBcfStat } from "@/components/Sections/bcf/bcfStat";
import { BCF } from "@/components/Sections/bcf/bcfTheme";

type BcfStatValueProps = {
  value: string;
  className?: string;
  duration?: number;
  color?: string;
};

export default function BcfStatValue({
  value,
  className = "text-[52px] font-bold",
  duration = 2,
  color = BCF.gold,
}: BcfStatValueProps) {
  const stat = parseBcfStat(value);
  return (
    <span className={`inline-flex items-baseline ${className}`} style={{ color }}>
      {stat.prefix}
      <CountUp to={stat.to} duration={duration} separator={stat.separator} className={className} />
      {stat.suffix}
    </span>
  );
}
