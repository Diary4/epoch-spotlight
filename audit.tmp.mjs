import WebSocket from "ws";
const list = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256e6 });
let id = 0; const pending = new Map();
ws.on("message", (r) => { const m = JSON.parse(r); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
await new Promise((r) => ws.on("open", r));
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true }))?.result?.value;

await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: "http://localhost:5199/bcf" });
await wait(4500);
await send("Input.dispatchMouseEvent", { type: "mousePressed", x: 540, y: 960, button: "left", clickCount: 1 });
await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 540, y: 960, button: "left", clickCount: 1 });
await wait(1500);

const CLICK = (t) => `(()=>{const b=[...document.querySelectorAll("button")].find(b=>b.textContent.trim()===${JSON.stringify(t)}||b.textContent.includes(${JSON.stringify(t)}));if(b){b.click();return true}return false})()`;
const BOTTOM = `(()=>{const root=document.querySelector("section");let max=0;root.querySelectorAll("*").forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.height)max=Math.max(max,r.bottom)});return Math.round(max)})()`;

await ev(CLICK("Inside Kurdistan")); await wait(1200);

const places = JSON.parse(process.env.PLACES);
const worst = [];
for (const [place, isBeyond] of places) {
  if (!isBeyond) { await ev(CLICK(place)); await wait(900); }
  const ok = await ev(CLICK("Explore Projects"));
  if (!ok) { console.log("SKIP(no explore)", place); continue; }
  await wait(1300);
  const projBottom = await ev(BOTTOM);
  const sectors = await ev(`JSON.stringify([...document.querySelectorAll(".grid-cols-2 > button")].map(b=>b.querySelector("span.block").textContent))`);
  const names = JSON.parse(sectors);
  for (const s of names) {
    await ev(CLICK(s)); await wait(1100);
    const b = await ev(BOTTOM);
    if (b > 1900) worst.push({ place, sector: s, bottom: b });
    else if (b < 1560) worst.push({ place, sector: s, bottom: b, sparse: true });
    // back
    await ev(`document.querySelector('button[aria-label="Back"],button[aria-label="گەڕانەوە"],button[aria-label="العودة"]').click()`);
    await wait(1000);
  }
  console.log(place.padEnd(16), "projects page bottom:", projBottom, "| sectors:", names.length);
  await ev(`document.querySelector('button[aria-label="Back"]').click()`);
  await wait(1200);
  if (!isBeyond) { await ev(`(()=>{const b=[...document.querySelectorAll("button")].find(b=>b.getAttribute("aria-label")==="Close");if(b)b.click()})()`); await wait(500); }
}
console.log("\n=== OVERFLOW (>1900) / SPARSE (<1560) ===");
for (const w of worst) console.log(w.sparse ? "sparse " : "OVER   ", w.place.padEnd(14), w.sector.padEnd(26), w.bottom);
ws.close(); process.exit(0);
