import type React from "react";
import { BCF_LOW_POWER } from "@/components/Sections/bcf/bcfPerf";

/** Figma Orange / Nature tokens for the BCF VIP experience. */
export const BCF = {
  bg: "#0a0a0a",
  gold: "#fbc158",
  goldBright: "#fbb22f",
  goldDeep: "#c98e26",
  cream: "#fbf4e4",
  creamSoft: "#fdeed4",
  sand: "#fcdfaa",
  nature: "#d2ba91",
  red: "#c41e3a",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.72)",
  glass: "rgba(0,0,0,0.55)",
  glassBorder: "rgba(251,193,88,0.45)",
  cardBorder: "#84879d",
} as const;

export const BCF_GLASS_CARD =
  "rounded-2xl border border-[#fbc158]/45 bg-black/55 backdrop-blur-md";

export const BCF_PAGE =
  "relative flex h-full min-h-[1920px] w-full flex-col overflow-hidden bg-[#0a0a0a] text-white";

/**
 * Fine grain over every scene. Photography on a 65" panel at arm's length shows
 * banding in the dark gradients; a soft-light grid at 5% breaks it up and is what
 * separates a print-grade backdrop from a flat export.
 *
 * `mix-blend-mode` is the catch: it makes this layer un-compositable, so Chrome
 * has to read the entire artboard back off the GPU and re-blend it on every
 * frame the backdrop drifts — forever, since the drift never stops. On the
 * Android panel that one property cost more than everything else on the screen
 * put together. The low tier keeps the grid and drops the blend; against a
 * near-black gradient a flat 2% white grid breaks the banding just as well.
 */
export const BCF_GRAIN_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
  backgroundSize: "7px 7px",
  ...(BCF_LOW_POWER ? null : { mixBlendMode: "soft-light" as const }),
};

/** Corner falloff so the eye is pulled to the centre of the composition. */
export const BCF_VIGNETTE_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(120% 78% at 50% 42%, transparent 42%, rgba(4,6,9,0.55) 88%, rgba(4,6,9,0.82) 100%)",
};

/** Warm bloom in the upper corner — the gold that carries the BCF identity. */
export const BCF_BLOOM_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(760px 620px at 12% 6%, rgba(251,193,88,0.16), transparent 62%), radial-gradient(680px 560px at 92% 96%, rgba(201,142,38,0.12), transparent 60%)",
};

/**
 * Bloom and vignette as one paint.
 *
 * They are both plain gradients at full opacity, so stacking them on two
 * elements bought nothing but a second full-artboard compositor layer on every
 * scene — 2160×3840×4 bytes of GPU memory each on the 4K panel, which is what
 * pushes an Android GPU into evicting and re-uploading layers mid-gesture.
 * Listing the vignette first puts it on top, exactly where it was.
 */
export const BCF_ATMOSPHERE_STYLE: React.CSSProperties = {
  background: `${BCF_VIGNETTE_STYLE.background}, ${BCF_BLOOM_STYLE.background}`,
};

/** Deep-field gradient shared by the scenes that carry no photograph. */
export const BCF_FIELD_BG =
  "radial-gradient(900px 700px at -10% -5%, rgba(32,44,94,0.5), transparent 60%), radial-gradient(1000px 800px at 110% 110%, rgba(50,36,9,0.5), transparent 55%), linear-gradient(180deg, #191205 0%, #0a0d22 100%)";
