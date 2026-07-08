const { app, BrowserWindow } = require("electron");
const path = require("path");

// Chromium places <video> elements into hardware overlay planes (DirectComposition
// on Windows). Those planes are punched through the page and do NOT blend with CSS
// opacity/transform animations, so animating an ancestor of a video produces black
// bands/lines over it during the animation. Disabling the video overlay features
// forces videos to composite as ordinary textures that blend correctly, at a
// negligible cost for the short clips this app plays. Must run before app ready.
app.commandLine.appendSwitch(
  "disable-features",
  "DirectCompositionVideoOverlays,UseChromeOSDirectVideoDecoder,MediaFoundationVideoOverlays",
);
app.commandLine.appendSwitch("disable-direct-composition-video-overlays");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "../dist/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
