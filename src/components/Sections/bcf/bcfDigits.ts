import type { BcfLang } from "@/components/Sections/bcf/bcfContent";

/** Eastern Arabic-Indic digits used for Kurdish and Arabic. */
const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩";

/**
 * Rewrite Western digits (0–9) into Eastern Arabic-Indic (٠–٩) for ku / ar.
 * English is left untouched. Safe to run on any display string — only ASCII
 * digit characters are remapped.
 */
export function bcfDigits(value: string | number, lang: BcfLang): string {
  const text = String(value);
  if (lang === "en") return text;
  return text.replace(/\d/g, (digit) => ARABIC_INDIC[Number(digit)] ?? digit);
}
