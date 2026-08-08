import { chromium } from "playwright-core";
const OUT = "/private/tmp/claude-501/-Users-diarysalahaddinsaadi-Desktop-epoch-spotlight/9a407208-ce86-409b-b8bb-aa2cf80c08c0/scratchpad";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on("pageerror", e => console.log("PAGEERROR", e.message));
  await page.goto("http://localhost:4173/bcf", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.locator('button', { hasText: "Touch to Start" }).last().click();
  await page.waitForTimeout(2000);
  console.log("dialog count:", await page.locator('[role="dialog"]').count());
  console.log("buttons:", JSON.stringify(await page.locator("button:visible").allInnerTexts()));
  await page.screenshot({ path: `${OUT}/i-3-lang.png` });
} finally { await browser.close(); }
