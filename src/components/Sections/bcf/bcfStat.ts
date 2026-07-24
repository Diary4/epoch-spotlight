/** Parse display stats like "+120", "250K", "1,004" for CountUp. */
export function parseBcfStat(raw: string): {
  to: number;
  prefix: string;
  suffix: string;
  separator: string;
} {
  const trimmed = raw.trim();
  const prefix = trimmed.startsWith("+") ? "+" : "";
  let body = trimmed.replace(/^\+/, "").replace(/,/g, "");
  let suffix = "";
  let multiplier = 1;

  if (/k$/i.test(body)) {
    suffix = "K";
    body = body.replace(/k$/i, "");
  }

  // Arabic-Indic digits → Latin for animation
  body = body.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

  const to = Number.parseFloat(body) * multiplier;
  return {
    to: Number.isFinite(to) ? to : 0,
    prefix,
    suffix,
    separator: ",",
  };
}
