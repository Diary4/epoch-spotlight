import { Globe2 } from "lucide-react";
import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenDir } from "@/components/Sections/women/womenLanguage";

type WomenLanguageButtonProps = {
  lang: WomenLangCode;
  languageLabel: string;
  onLanguageChange: () => void;
  className?: string;
  fadeAttr?: string;
};

export default function WomenLanguageButton({
  lang,
  languageLabel,
  onLanguageChange,
  className = "",
  fadeAttr,
}: WomenLanguageButtonProps) {
  const dir = womenDir(lang);

  return (
    <button
      type="button"
      onClick={onLanguageChange}
      {...(fadeAttr ? { [fadeAttr]: "true" } : {})}
      className={`absolute top-4 z-50 flex items-center gap-2 rounded-full border-2 border-[#d9b477] bg-white/80 px-4 py-2 font-serif text-sm font-semibold text-[#2c1337] shadow-sm backdrop-blur-sm transition hover:bg-white sm:top-8 sm:gap-3 sm:px-5 sm:py-2.5 sm:text-base ${
        dir === "rtl" ? "left-4 sm:left-8" : "right-4 sm:right-8"
      } ${className}`}
      aria-label="Switch language"
    >
      <Globe2 className="h-5 w-5 shrink-0" />
      {languageLabel}
    </button>
  );
}
