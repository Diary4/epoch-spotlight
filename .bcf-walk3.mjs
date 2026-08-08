import { chromium } from "playwright-core";

const BASE = "http://localhost:4173";
const PERF = process.argv[2] || "";
const OUT =
  "/private/tmp/claude-501/-Users-diarysalahaddinsaadi-Desktop-epoch-spotlight/9a407208-ce86-409b-b8bb-aa2cf80c08c0/scratchpad";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

const stats = () =>
  page.evaluate(() => {
    const n = (s) => document.querySelectorAll(s).length;
    let bd = 0;
    let blend = 0;
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (cs.backdropFilter && cs.backdropFilter !== "none") bd += 1;
      if (cs.mixBlendMode && cs.mixBlendMode !== "normal") blend += 1;
    }
    return {
      ping: n(".bcf-ping"),
      pulse: n(".bcf-pulse"),
      sweep: n(".bcf-sweep"),
      beam: n(".bcf-beam"),
      spin: n(".bcf-spin, .bcf-spin-reverse"),
      drift: n(".bcf-drift"),
      breathe: n(".bcf-breathe"),
      backdropFilters: bd,
      blendModes: blend,
    };
  });

const cost = () =>
  page.evaluate(
    () =>
      new Promise((res) => {
        let lt = 0;
        let ltMs = 0;
        const po = new PerformanceObserver((l) => {
          for (const e of l.getEntries()) {
            lt += 1;
            ltMs += e.duration;
          }
        });
        try {
          po.observe({ entryTypes: ["longtask"] });
        } catch {}
        let f = 0;
        const t0 = performance.now();
        const tick = () => {
          f += 1;
          if (performance.now() - t0 < 3000) requestAnimationFrame(tick);
          else {
            po.disconnect();
            const s = (performance.now() - t0) / 1000;
            res({ fps: +(f / s).toFixed(1), longTasks: lt, ltMs: +ltMs.toFixed(1) });
          }
        };
        requestAnimationFrame(tick);
      }),
  );

const snap = async (label) => {
  const s = await stats();
  const c = await cost();
  const motions = Object.entries(s)
    .filter(([k, v]) => v > 0 && k !== "backdropFilters" && k !== "blendModes")
    .map(([k, v]) => `${k}:${v}`)
    .join(" ") || "-";
  console.log(
    `${label.padEnd(20)} css[${motions.padEnd(28)}] backdropFilter:${s.backdropFilters} blend:${s.blendModes}  ${c.fps}fps longTasks:${c.longTasks}`,
  );
  await page.screenshot({ path: `${OUT}/w3-${PERF || "def"}-${label}.png` });
};

async function toSections() {
  await page.goto(`${BASE}/bcf${PERF ? `?perf=${PERF}` : ""}`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(800);
  const gate = page.locator('[aria-label="Tap to begin"]');
  if (await gate.count()) await gate.click();
  await page.waitForTimeout(800);
  await page.locator('[aria-label="Touch to Start"]').last().click();
  await page.waitForTimeout(1000);
  // Language menu: pick the entry whose label is exactly English.
  await page.getByText("English", { exact: true }).first().click();
  await page.waitForTimeout(1600); // intro
  await page.mouse.click(540, 960); // intro advances on any tap
  await page.waitForTimeout(1500); // welcome
  await page.locator('button:visible').filter({ hasText: /journey|start/i }).last()
    .click().catch(() => page.mouse.click(540, 1500));
  await page.waitForTimeout(1600); // sections
}

await toSections();
await snap("sections");

const cards = await page
  .locator("button:visible")
  .evaluateAll((els) =>
    els.map((e) => e.getAttribute("aria-label") || e.innerText.split("\n")[0]),
  );
console.log("CHAPTERS:", JSON.stringify(cards));

for (let i = 0; i < cards.length; i += 1) {
  const name = (cards[i] || `b${i}`).slice(0, 16).replace(/[^\w]/g, "") || `b${i}`;
  await toSections();
  const btns = page.locator("button:visible");
  if (i >= (await btns.count())) break;
  await btns.nth(i).click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1800);
  await snap(`ch${i}-${name}`);
}

console.log("\nERRORS:", errors.length ? errors : "none");
await browser.close();
