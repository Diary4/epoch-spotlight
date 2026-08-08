import { chromium } from "playwright-core";

const BASE = process.argv[2] || "http://localhost:4173";
const PERF = process.argv[3] || "";
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

await page.goto(`${BASE}/bcf${PERF ? `?perf=${PERF}` : ""}`, {
  waitUntil: "networkidle",
  timeout: 60000,
});

const snap = async (label) => {
  await page.waitForTimeout(1100);
  const s = await page.evaluate(() => {
    const n = (sel) => document.querySelectorAll(sel).length;
    let bd = 0;
    let blend = 0;
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (cs.backdropFilter && cs.backdropFilter !== "none") bd += 1;
      if (cs.mixBlendMode && cs.mixBlendMode !== "normal") blend += 1;
    }
    return {
      motions: {
        ping: n(".bcf-ping"),
        breathe: n(".bcf-breathe"),
        pulse: n(".bcf-pulse"),
        sweep: n(".bcf-sweep"),
        beam: n(".bcf-beam"),
        spin: n(".bcf-spin, .bcf-spin-reverse"),
        drift: n(".bcf-drift"),
      },
      backdropFilters: bd,
      blendModes: blend,
      animations: document.getAnimations().length,
    };
  });
  console.log(`${label.padEnd(16)} ${JSON.stringify(s)}`);
  await page.screenshot({ path: `${OUT}/walk-${PERF || "def"}-${label}.png` });
  return s;
};

const tap = async (name) => {
  const el = page.locator(`text=${name}`).first();
  if ((await el.count()) === 0) return false;
  await el.click({ timeout: 5000 }).catch(() => {});
  return true;
};

await snap("attract");

// Attract -> language overlay -> English -> intro
await page.locator("button").first().click().catch(() => {});
await page.waitForTimeout(700);
await tap("English");
await snap("intro");

// Intro -> welcome -> sections
await page.locator("button").last().click().catch(() => {});
await snap("welcome");
await page.locator("button").last().click().catch(() => {});
await snap("sections");

// Each chapter card off the sections screen.
const chapters = await page.locator("button").count();
for (let i = 0; i < chapters; i += 1) {
  const btns = page.locator("button");
  if (i >= (await btns.count())) break;
  const label = (await btns.nth(i).innerText().catch(() => "")) || `btn${i}`;
  const short = label.split("\n")[0].slice(0, 14).replace(/[^\w]/g, "") || `b${i}`;
  await btns.nth(i).click({ timeout: 4000 }).catch(() => {});
  await snap(`ch-${i}-${short}`);
  // Back to the chapter menu for the next one.
  await page.goto(`${BASE}/bcf${PERF ? `?perf=${PERF}` : ""}`, {
    waitUntil: "networkidle",
  });
  await page.locator("button").first().click().catch(() => {});
  await page.waitForTimeout(600);
  await tap("English");
  await page.waitForTimeout(900);
  await page.locator("button").last().click().catch(() => {});
  await page.waitForTimeout(900);
  await page.locator("button").last().click().catch(() => {});
  await page.waitForTimeout(900);
}

console.log("\nERRORS:", errors.length ? errors : "none");
await browser.close();
