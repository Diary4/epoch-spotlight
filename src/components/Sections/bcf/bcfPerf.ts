/**
 * Device capability tier for the BCF experience.
 *
 * The whole experience is drawn on a 1080×1920 artboard that `FitScaledCanvas`
 * scales with a CSS transform. On the 4K portrait kiosk panel that scale is 2,
 * so every full-bleed layer the design stacks is really a 2160×3840 surface.
 *
 * Three of those layers — `backdrop-filter`, `mix-blend-mode` and large
 * `filter: blur()` halos — cannot be composited on the GPU in place: Chrome has
 * to read the backdrop back, process it, and paint it again. At 2160×3840 that
 * readback alone can overrun the frame budget before anything has moved, on the
 * Android panel and on the Windows TV box alike.
 *
 * So the low tier drops those three and keeps everything else — the layout, the
 * colours, the entrances and the drift are identical. Nothing here is a visual
 * downgrade a visitor can name at kiosk distance; it is the same picture drawn
 * a way the GPU can actually composite.
 *
 * Read once at module load: the device does not change under a running kiosk,
 * and making it reactive would only add a render pass per screen.
 */

/** Manual override, for bringing a specific panel up or down without a rebuild. */
function forcedTier(): "low" | "high" | null {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("perf");
    if (fromQuery === "low" || fromQuery === "high") {
      window.localStorage.setItem("bcf:perf", fromQuery);
      return fromQuery;
    }
    const stored = window.localStorage.getItem("bcf:perf");
    if (stored === "low" || stored === "high") return stored;
  } catch {
    // Private mode / file:// — fall through to the default.
  }
  return null;
}

/**
 * The low tier is now the default for every device, not a phone-shaped
 * exception.
 *
 * The previous version sniffed for `Android` in the user agent, or for four or
 * fewer cores. That reads the wrong variable. What makes these layers expensive
 * is not the CPU — it is that a `backdrop-filter` costs a readback of whatever
 * is behind it, and on the 4K portrait panel "behind it" is a 2160×3840
 * surface. That price is charged per frame on any GPU. The Windows TV box the
 * kiosk actually runs on reports a Windows UA and eight cores, so it failed
 * every one of those checks and got the expensive path — which is exactly where
 * the reported stutter comes from.
 *
 * Since the reduced path is a deliberate visual match rather than a downgrade
 * (see the notes in index.css and bcfTheme.ts), there is no reason to gate it.
 * `?perf=high` still restores the full glass stack for comparing the two on a
 * workstation.
 */
function detectLowPower(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  return forcedTier() !== "high";
}

export const BCF_LOW_POWER = detectLowPower();

/**
 * Root class for the BCF page. The compositor-hostile effects are switched off
 * from one place in `index.css` rather than at each of the twenty call sites,
 * so a new glass panel added later is covered without anyone remembering to.
 */
export const BCF_PERF_CLASS = BCF_LOW_POWER ? "bcf-lowpower" : "";
