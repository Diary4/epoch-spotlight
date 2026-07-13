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
      className="min-h-[clamp(240px,32vh,420px)]"
      imageHeightClass="h-[clamp(150px,21vh,280px)]"
    />
  );
}
