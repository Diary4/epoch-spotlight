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
 * Hub cards for the Religions overview — sized for the shared 1400px
 * WomenScaledCanvas artboard (same responsiveness as Women.tsx).
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
      titleClassName="uppercase tracking-[0.04em] text-[22px]"
      className="min-h-[360px]"
      imageHeightClass="h-[200px]"
    />
  );
}
