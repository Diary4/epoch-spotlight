import type { AppLangCode } from "@/lib/appLanguage";

export type DiscoverLangCode = AppLangCode;

export function discoverRtlScript(lang: DiscoverLangCode): boolean {
  return lang === "ku" || lang === "ar";
}

export function discoverDisplayFont(lang: DiscoverLangCode): string {
  return discoverRtlScript(lang) ? "font-amiri" : "font-serif";
}

export function discoverDir(lang: DiscoverLangCode): "ltr" | "rtl" {
  return lang === "en" ? "ltr" : "rtl";
}
