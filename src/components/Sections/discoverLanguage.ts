import type { AppLangCode } from "@/lib/appLanguage";

export type DiscoverLangCode = AppLangCode;

export const DISCOVER_LANG_OPTIONS: {
  code: DiscoverLangCode;
  label: string;
  native: string;
  dir: "ltr" | "rtl";
}[] = [
  { code: "ku", label: "Kurdish", native: "کوردی", dir: "rtl" },
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

export function discoverRtlScript(lang: DiscoverLangCode): boolean {
  return lang === "ku" || lang === "ar";
}

export function discoverDisplayFont(lang: DiscoverLangCode): string {
  return discoverRtlScript(lang) ? "font-noto-naskh" : "font-serif";
}

/** Formal lining figures for large year/date numerals in land detail pages. */
export function discoverYearFont(lang: DiscoverLangCode): string {
  return lang === "en"
    ? "font-display-num lining-nums tabular-nums tracking-[0.04em]"
    : "font-noto-naskh";
}

export function discoverSectionFont(lang: DiscoverLangCode): string {
  return discoverRtlScript(lang) ? "font-noto-naskh" : "";
}

export function discoverDir(lang: DiscoverLangCode): "ltr" | "rtl" {
  return lang === "en" ? "ltr" : "rtl";
}

export type DiscoverLanguageProps = {
  lang?: DiscoverLangCode;
  onLanguageChange?: (lang: DiscoverLangCode) => void;
};
