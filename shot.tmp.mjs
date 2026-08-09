import WebSocket from "ws";
import fs from "fs";

// url, out, [clicks JSON], [evalJS]
const [, , url, out, extra, evalJs] = process.argv;
const list = await (await fetch("http://127.0.0.1:9222/json/list")).json();
let page = list.find((t) => t.type === "page");
if (!page) {
  await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" });
  const l2 = await (await fetch("http://127.0.0.1:9222/json/list")).json();
  page = l2.find((t) => t.type === "page");
}
const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
let id = 0;
const pending = new Map();
ws.on("message", (raw) => {
  const msg = JSON.parse(raw);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
});
await new Promise((r) => ws.on("open", r));
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url });
await wait(4500);
for (const [x, y] of [[540, 960]]) {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}
await wait(1400);
if (extra && extra !== "-") {
  for (const step of JSON.parse(extra)) {
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: step[0], y: step[1], button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: step[0], y: step[1], button: "left", clickCount: 1 });
    await wait(step[2] ?? 1000);
  }
}
await wait(1200);
if (process.env.PRE_EVAL) {
  for (const step of JSON.parse(process.env.PRE_EVAL)) {
    await send("Runtime.evaluate", { expression: step, awaitPromise: false });
    await wait(1600);
  }
}
await wait(1600);
if (evalJs) {
  const r = await send("Runtime.evaluate", { expression: evalJs, returnByValue: true });
  console.log("EVAL:", JSON.stringify(r?.result?.value ?? r));
}
const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
fs.writeFileSync(out, Buffer.from(data, "base64"));
console.log("saved", out);
ws.close();
process.exit(0);
