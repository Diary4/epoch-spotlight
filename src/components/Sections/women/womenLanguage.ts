import type { AppLangCode } from "@/lib/appLanguage";

export type WomenLangCode = AppLangCode;

export const WOMEN_LANGUAGE_LABELS: Record<WomenLangCode, string> = {
  en: "ENGLISH",
  ku: "کوردی",
  ar: "العربية",
};

export function womenDir(lang: WomenLangCode): "ltr" | "rtl" {
  return lang === "en" ? "ltr" : "rtl";
}

export type WomenLanguageProps = {
  lang?: WomenLangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
};

/** Shared labels for detail cards across Women sections */
export const womenCardLabels: Record<
  WomenLangCode,
  { knownFor: string; legacy: string; placeEra: string }
> = {
  en: { knownFor: "Known For", legacy: "Legacy", placeEra: "Place & Era" },
  ku: { knownFor: "ناوبانگی", legacy: "میرات", placeEra: "شوێن و سەردەم" },
  ar: { knownFor: "اشتهرت بـ", legacy: "الإرث", placeEra: "المكان والعصر" },
};

export const womenNavLabels: Record<WomenLangCode, { backToWomen: string; backToList: string }> = {
  en: { backToWomen: "Back to Women", backToList: "Back to list" },
  ku: { backToWomen: "گەڕانەوە بۆ ژنان", backToList: "گەڕانەوە بۆ لیست" },
  ar: { backToWomen: "العودة إلى النساء", backToList: "العودة إلى القائمة" },
};

export function womenCardsToPanel(
  cards: { icon: string; text: string }[],
  lang: WomenLangCode,
): { icon: string; title: string; text: string }[] {
  const labels = womenCardLabels[lang];
  const titles = [labels.knownFor, labels.legacy, labels.placeEra];
  return cards.map((card, index) => ({
    icon: card.icon,
    title: titles[index] ?? labels.knownFor,
    text: card.text,
  }));
}
