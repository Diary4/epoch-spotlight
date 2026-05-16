export type AppLangCode = "ku" | "en" | "ar";

const STORAGE_KEY = "app-lang";

export function getAppLanguage(): AppLangCode {
  if (typeof window === "undefined") return "en";
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "ku" || stored === "ar") return stored;
  return "en";
}

export function setAppLanguage(code: AppLangCode) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, code);
}

export function nextAppLanguage(current: AppLangCode): AppLangCode {
  if (current === "en") return "ku";
  if (current === "ku") return "ar";
  return "en";
}
