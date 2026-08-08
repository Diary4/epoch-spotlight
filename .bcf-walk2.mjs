import { chromium } from "playwright-core";

const BASE = "http://localhost:4173";
const PERF = process.argv[2] || "";
const OUT =
  "/private/tmp/claude-501/-Users-diarysalahaddinsaadi-Desktop-epoch-spotlight/9a407208-ce86-409b-b8bb-aa2cf80c08c0/scratchpad";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 2,
});
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

const stats = async () =>
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
      m: {
        ping: n(".bcf-ping"),
        pulse: n(".bcf-pulse"),
        sweep: n(".bcf-sweep"),
        beam: n(".bcf-beam"),
        spin: n(".bcf-spin, .bcf-spin-reverse"),
        drift: n(".bcf-drift"),
        breathe: n(".bcf-breathe"),
      },
      bd,
      blend,
      anims: document.getAnimations().length,
    };
  });

// Frame-rate + long-task probe over 4s of the screen just sitting there.
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
          if (performance.now() - t0 < 4000) requestAnimationFrame(tick);
          else {
            po.disconnect();
            const s = (performance.now() - t0) / 1000;
            res({ fps: +(f / s).toFixed(1), longTasks: lt, ltMs: +ltMs.toFixed(1) });
          }
        };
        requestAnimationFrame(tick);
      }),
  );

async function toSections() {
  await page.goto(`${BASE}/bcf${PERF ? `?perf=${PERF}` : ""}`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(900);
  await page.getByRole("button", { name: /enter|touch|start/i }).first()
    .click().catch(() => page.locator("button").first().click());
  await page.waitForTimeout(800);
  await page.locator("text=English").first().click();
  await page.waitForTimeout(1400); // intro
  await page.locator("button:visible").last().click(); // continue
  await page.waitForTimeout(1300); // welcome
  await page.locator("button:visible").last().click(); // start journey
  await page.waitForTimeout(1400); // sections
}

await toSections();
const labels = await page.locator("button:visible").allInnerTexts();
console.log("CHAPTER BUTTONS:", JSON.stringify(labels));

const s = await stats();
console.log(`sections        ${JSON.stringify(s)}  ${JSON.stringify(await cost())}`);
await page.screenshot({ path: `${OUT}/w2-${PERF || "def"}-sections.png` });

for (let i = 0; i < labels.length; i += 1) {
  const raw = labels[i].split("\n").filter(Boolean).pop() || `b${i}`;
  const name = raw.slice(0, 18).replace(/[^\w]/g, "") || `b${i}`;
  await toSections();
  const btns = page.locator("button:visible");
  if (i >= (await btns.count())) break;
  await btns.nth(i).click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1600);
  const st = await stats();
  const c = await cost();
  console.log(`${`ch${i}-${name}`.padEnd(24)} ${JSON.stringify(st)}  ${JSON.stringify(c)}`);
  await page.screenshot({ path: `${OUT}/w2-${PERF || "def"}-ch${i}-${name}.png` });
}

console.log("\nERRORS:", errors.length ? errors : "none");
await browser.close();
