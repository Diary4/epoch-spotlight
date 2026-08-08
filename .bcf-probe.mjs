import { chromium } from "playwright-core";

const URL_BASE = process.argv[2] || "http://localhost:4173";
const PERF = process.argv[3] || ""; // "" = new default (low), "high" = old path

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--force-device-scale-factor=1"],
});

// The kiosk artboard is 1080x1920 drawn at 2x on the 4K portrait panel.
const page = await browser.newPage({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 2,
});

const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

const url = `${URL_BASE}/bcf${PERF ? `?perf=${PERF}` : ""}`;
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

// What tier did the page actually pick, and did the CSS motions attach?
const applied = await page.evaluate(() => {
  const root = document.querySelector(".bcf-experience");
  const cls = (s) => document.querySelectorAll(s).length;
  return {
    lowPowerClass: !!root?.classList.contains("bcf-lowpower"),
    cssMotions: {
      ping: cls(".bcf-ping"),
      breathe: cls(".bcf-breathe"),
      pulse: cls(".bcf-pulse"),
      sweep: cls(".bcf-sweep"),
      beam: cls(".bcf-beam"),
      spin: cls(".bcf-spin, .bcf-spin-reverse"),
      drift: cls(".bcf-drift"),
      ember: cls(".bcf-ember"),
      shaft: cls(".bcf-shaft"),
      plate: cls(".bcf-plate-a, .bcf-plate-b"),
    },
    // Anything still relying on backdrop-filter at runtime?
    liveBackdropFilters: Array.from(document.querySelectorAll("*")).filter(
      (el) => {
        const v = getComputedStyle(el).backdropFilter;
        return v && v !== "none";
      },
    ).length,
    // Elements the compositor has to blend by reading the backdrop back.
    liveBlendModes: Array.from(document.querySelectorAll("*")).filter((el) => {
      const v = getComputedStyle(el).mixBlendMode;
      return v && v !== "normal";
    }).length,
    runningAnimations: document.getAnimations().length,
  };
});

// Measure main-thread occupancy while the attract screen just sits there, which
// is what it does for most of the day. Long tasks are what a tap waits behind.
const idleCost = await page.evaluate(
  () =>
    new Promise((resolve) => {
      let longTasks = 0;
      let longTaskMs = 0;
      const po = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          longTasks += 1;
          longTaskMs += e.duration;
        }
      });
      try {
        po.observe({ entryTypes: ["longtask"] });
      } catch {
        /* not supported */
      }

      let frames = 0;
      const start = performance.now();
      const tick = () => {
        frames += 1;
        if (performance.now() - start < 5000) requestAnimationFrame(tick);
        else {
          po.disconnect();
          resolve({
            seconds: (performance.now() - start) / 1000,
            frames,
            fps: +(frames / ((performance.now() - start) / 1000)).toFixed(1),
            longTasks,
            longTaskMs: +longTaskMs.toFixed(1),
          });
        }
      };
      requestAnimationFrame(tick);
    }),
);

console.log(
  JSON.stringify(
    { url, tier: PERF || "default", applied, idleCost, errors },
    null,
    2,
  ),
);

await page.screenshot({
  path: `/private/tmp/claude-501/-Users-diarysalahaddinsaadi-Desktop-epoch-spotlight/9a407208-ce86-409b-b8bb-aa2cf80c08c0/scratchpad/bcf-${PERF || "default"}.png`,
});
await browser.close();
