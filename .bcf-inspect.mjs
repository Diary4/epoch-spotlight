import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto("http://localhost:4173/bcf", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const dump = async (t) => {
  const b = await page.locator("button:visible").all();
  const out = [];
  for (const x of b) out.push({ text: (await x.innerText()).replace(/\n/g," ").slice(0,40), aria: await x.getAttribute("aria-label") });
  console.log(`--- ${t} (${out.length} buttons) ---`);
  console.log(JSON.stringify(out, null, 1));
};
await dump("attract");
await page.locator("button:visible").first().click();
await page.waitForTimeout(1200);
await dump("after first click");
