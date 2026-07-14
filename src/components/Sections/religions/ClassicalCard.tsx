import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";

type ClassicalCardProps = {
  title: string;
  image: string;
  ctaLabel?: string;
  onClick?: () => void;
  ariaLabel?: string;
  accentIndex?: number;
};

/**
 * Fixed-size card for the Religions overview, rendered inside a 1080px
 * design canvas that scales to fit the viewport.
 */
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
      className="min-h-[480px]"
      imageHeightClass="h-[280px]"
    />
  );
}
