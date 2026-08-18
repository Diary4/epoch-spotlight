import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    watch: {
      ignored: ["**/design-reference-religion-v4/**"],
    },
  },
  plugins: [
    react(),
    ...(mode === "development" ? [componentTagger()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  // Large JSON (the 107 KB world topology behind the BCF map) ships as a
  // `JSON.parse("…")` call rather than a JS object literal. The engine parses
  // JSON with a dedicated reader that is markedly faster than parsing the
  // equivalent literal as source, which is time taken straight off the map
  // screen's first frame on the weak kiosk CPU.
  json: {
    stringify: true,
  },
  // Local design-reference HTML bundles import deps (e.g. @emotion/is-prop-valid)
  // that aren't in this app — don't crawl them during optimizeDeps.
  optimizeDeps: {
    entries: ["index.html"],
  },
  build: {
    chunkSizeWarningLimit: 1500,
    // The kiosk panel runs Chrome/WebView on Android 13, so there is no reason to
    // down-level modern syntax. Shipping it as authored keeps the bundles smaller
    // and skips the transpiled helpers the weak CPU would have to parse.
    target: "es2022",
    // Vite gzips every emitted chunk just to print a size column; the numbers are
    // reported by scripts/precompress-dist.mjs instead, from the files that ship.
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip"],
          animation: ["gsap"],
        },
      },
    },
  },
}));
