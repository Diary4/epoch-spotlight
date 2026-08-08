import WebSocket from "ws";
import fs from "fs";

const [, , url, out, extra] = process.argv;
const list = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const page = list.find((t) => t.type === "page");
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
await send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url });
await wait(4000);
// tap the fullscreen gate
for (const [x, y] of [[540, 960]]) {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}
await wait(1200);
if (extra) {
  for (const step of JSON.parse(extra)) {
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: step[0], y: step[1], button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: step[0], y: step[1], button: "left", clickCount: 1 });
    await wait(step[2] ?? 900);
  }
}
await wait(2500);
const { data } = await send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync(out, Buffer.from(data, "base64"));
console.log("saved", out);
ws.close();
