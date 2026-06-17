import React from "react";

/** Rudaw Bold renders ێ incorrectly — fall back to Noto for that glyph only. */
const RUDAW_GLYPH_FALLBACK = /(ێ)/g;

export function withRudawGlyphFallback(
  text: string,
  enabled = true,
): React.ReactNode {
  if (!enabled || !text.includes("ێ")) return text;

  return text.split(RUDAW_GLYPH_FALLBACK).map((part, index) =>
    part === "ێ" ? (
      <span key={index} className="font-ku-glyph">
        {part}
      </span>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}
