import { ArrowLeft } from "lucide-react";
import {
  detailBackIconClassName,
  detailBackIconSize,
  womenBackButtonClassName,
  womenBackButtonInlineClassName,
  womenBackButtonSideClassName,
} from "@/constants/backNavigation";

type WomenBackButtonProps = {
  onClick: () => void;
  ariaLabel: string;
  dir: "ltr" | "rtl";
  /** `fixed` = viewport edge (default). `inline` = in page flow under hero copy. */
  variant?: "fixed" | "inline";
};

export default function WomenBackButton({
  onClick,
  ariaLabel,
  dir,
  variant = "fixed",
}: WomenBackButtonProps) {
  const className =
    variant === "inline"
      ? womenBackButtonInlineClassName
      : `${womenBackButtonClassName} ${womenBackButtonSideClassName(dir)}`;

  return (
    <button type="button" onClick={onClick} className={className} aria-label={ariaLabel}>
      <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
    </button>
  );
}
