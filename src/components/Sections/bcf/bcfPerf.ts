/**
 * Device capability tier for the BCF experience.
 *
 * The whole experience is drawn on a 1080×1920 artboard that `FitScaledCanvas`
 * scales with a CSS transform. On the 4K portrait kiosk panel that scale is 2,
 * so every full-bleed layer the design stacks is really a 2160×3840 surface.
 *
 * Three of those layers — `backdrop-filter`, `mix-blend-mode` and large
 * `filter: blur()` halos — cannot be composited on the GPU in place: Chrome has
 * to read the backdrop back, process it, and paint it again. On Chrome for
 * Android (both the kiosk panel and a phone) that readback alone overruns the
 * frame budget before anything has moved, which is why the experience crawls
 * there and is fine on the desktop build.
 *
 * So the low tier drops those three and keeps everything else — the layout, the
 * colours, the entrances and the drift are identical. Nothing here is a visual
 * downgrade a visitor can name at kiosk distance; it is the same picture drawn
 * a way the GPU can actually composite.
 *
 * Read once at module load: the device does not change under a running kiosk,
 * and making it reactive would only add a render pass per screen.
 */

type CapabilityNavigator = Navigator & { deviceMemory?: number };

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
    // Private mode / file:// — fall through to detection.
  }
  return null;
}

function detectLowPower(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const forced = forcedTier();
  if (forced) return forced === "low";

  // Android covers both targets that struggle: the kiosk panel's built-in
  // Chrome and the phone. Desktop Chrome/Electron on the same markup is fine.
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return true;

  const nav = navigator as CapabilityNavigator;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) {
    return true;
  }

  return false;
}

export const BCF_LOW_POWER = detectLowPower();

/**
 * Root class for the BCF page. The compositor-hostile effects are switched off
 * from one place in `index.css` rather than at each of the twenty call sites,
 * so a new glass panel added later is covered without anyone remembering to.
 */
export const BCF_PERF_CLASS = BCF_LOW_POWER ? "bcf-lowpower" : "";
