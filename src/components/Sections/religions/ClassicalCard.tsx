import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";

type ClassicalCardProps = {
  title: string;
  image: string;
  ctaLabel?: string;
  onClick?: () => void;
  ariaLabel?: string;
  accentIndex?: number;
};

export default function ClassicalCard({
  title,
  image,
  onClick,
  ariaLabel,
  accentIndex = 0,
}: ClassicalCardProps) {
  return (
    <ReligionInfoCard
      title={title}
      image={image}
      accentIndex={accentIndex}
      onClick={onClick}
      ariaLabel={ariaLabel}
      titleClassName="uppercase tracking-[0.04em]"
      className="min-h-[340px] sm:min-h-[420px]"
      imageHeightClass="h-[220px] sm:h-[280px]"
    />
  );
}
