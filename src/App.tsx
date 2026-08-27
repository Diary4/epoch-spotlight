import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Capacitor } from "@capacitor/core";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import FullscreenGate from "@/components/FullscreenGate";
import { useAppFullscreen } from "@/hooks/useAppFullscreen";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
/**
 * Every route is split.
 *
 * Statically imported, all twenty-two pages landed in one entry chunk — 1.9 MB
 * of JavaScript that a visitor opening /bcf had to download, parse and execute
 * before the first pixel of the attract screen. Desktop absorbs that; Chrome on
 * the Android kiosk panel does not, and the delay reads as the experience being
 * slow rather than as it still loading.
 *
 * `StartMenu` stays eager: it is the app's own entry point, so splitting it
 * would only cost it a round trip.
 */
import StartMenu from "./pages/StartMenu.tsx";

const Index = lazy(() => import("./pages/Index.tsx"));
const SecondScreen = lazy(() => import("./pages/SecondScreen.tsx"));
const Portraits = lazy(() => import("./pages/Portraits.tsx"));
const PortraitDetail = lazy(() => import("./pages/PortraitDetail.tsx"));
const PortraitTimeline = lazy(() => import("./pages/PortraitTimeline.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const SliderPage = lazy(() => import("./pages/SliderPage.tsx"));
const Religions = lazy(() => import("./pages/Religions.tsx"));
const ReligionsV2 = lazy(() => import("./pages/ReligionsV2.tsx"));
const ReligionsV4 = lazy(() => import("./pages/ReligionsV4.tsx"));
const WomenPage = lazy(() => import("./pages/Women.tsx"));
const BcfPage = lazy(() => import("./pages/Bcf.tsx"));
const Touristic = lazy(() => import("./pages/Touristic.tsx"));
const TouristicDetail = lazy(() => import("./pages/TouristicDetail.tsx"));
const Library = lazy(() => import("./pages/Library.tsx"));
const LibraryWriters = lazy(() => import("./pages/LibraryWriters.tsx"));
const LibraryBooks = lazy(() => import("./pages/LibraryBooks.tsx"));
const LibraryWriterDetail = lazy(() => import("./pages/LibraryWriterDetail.tsx"));
const LibraryFeaturedWriter = lazy(() => import("./pages/LibraryFeaturedWriter.tsx"));
const LibraryBookDetail = lazy(() => import("./pages/LibraryBookDetail.tsx"));
const LibraryBookReader = lazy(() => import("./pages/LibraryBookReader.tsx"));

import { useViewportHeight } from "@/hooks/useViewportHeight";
import { startVideoAutopause } from "@/lib/videoAutopause";

/**
 * Imported statically on purpose, for the two `/__dev` preview routes below.
 *
 * Making these `lazy()` looks like the obvious win — they are only mounted under
 * `import.meta.env.DEV`, and importing them here does pull them and GSAP into the
 * production entry chunk. Measured on the kiosk profile it was a net loss: Index
 * imports both screens too, so the dynamic import made Rollup split them and
 * their shared dependencies into eight additional chunks, and /screen-1 paid
 * eight extra round trips for exactly the same bytes. On a high-latency link that
 * costs more than the larger entry chunk saves, so the static import stays.
 */
import KurdishLanguageDialectsPage from "@/components/Sections/TheLand/KurdishLanguageDialects";
import KurdistanFlagPage from "@/components/Sections/TheLand/KurdistanFlagPage";

const DevDialects = () => {
  const lang = (new URLSearchParams(window.location.search).get("lang") ?? "en") as "ku" | "en" | "ar";
  return <KurdishLanguageDialectsPage lang={lang} onBack={() => {}} />;
};

const DevFlag = () => {
  const lang = (new URLSearchParams(window.location.search).get("lang") ?? "en") as "ku" | "en" | "ar";
  return <KurdistanFlagPage lang={lang} onBack={() => {}} />;
};


const queryClient = new QueryClient();
const isFileProtocol = typeof window !== "undefined" && window.location.protocol === "file:";
const Router = Capacitor.isNativePlatform() || isFileProtocol ? HashRouter : BrowserRouter;

const AppRoutes = () => {
  const { pathname } = useLocation();
  const { showGate, onGateActivate } = useAppFullscreen(pathname);

  return (
    <>
      <FullscreenGate visible={showGate} onActivate={onGateActivate} />
      {/* The fallback is the app's own black, not a spinner: every screen here
          opens on a dark plate, so a chunk that arrives quickly reads as the
          page painting rather than as a loader that flashed. */}
      <Suspense
        fallback={<div className="min-h-screen w-full flex-1 bg-[#0a0a0a]" />}
      >
      <Routes>
          <Route path="/" element={<StartMenu />} />
          <Route path="/screen" element={<Index />} />
          <Route path="/screen-1" element={<Index />} />
          <Route path="/screen-2" element={<SecondScreen />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/portraits/:id" element={<PortraitDetail />} />
          <Route path="/portraits/:id/timeline" element={<PortraitTimeline />} />
          <Route path="/slider" element={<SliderPage />} />
          <Route path="/religions" element={<Religions />} />
          <Route path="/religions-v2" element={<ReligionsV2 />} />
          <Route path="/religions-v4" element={<ReligionsV4 />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/bcf" element={<BcfPage />} />
          <Route path="/touristic" element={<SliderPage />} />
          <Route path="/touristic-v2" element={<Touristic />} />
          <Route path="/touristic/:category/:id" element={<TouristicDetail />} />
          <Route path="/touristic/:id" element={<TouristicDetail />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/writers" element={<LibraryWriters />} />
          <Route path="/library/books" element={<LibraryBooks />} />
          <Route path="/library/browse" element={<Navigate to="/library/writers" replace />} />
          <Route path="/library/writers/:writerId" element={<LibraryWriterDetail />} />
          <Route path="/library/writers/:writerId/featured" element={<LibraryFeaturedWriter />} />
          <Route path="/library/books/:bookId" element={<LibraryBookDetail />} />
          <Route path="/library/books/:bookId/read" element={<LibraryBookReader />} />
          {import.meta.env.DEV && (
            <>
              <Route path="/__dev/dialects" element={<DevDialects />} />
              <Route path="/__dev/flag" element={<DevFlag />} />
            </>
          )}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  useViewportHeight();

  // Decorative hero videos stop decoding once they are well outside the
  // viewport, and resume before they scroll back in. See lib/videoAutopause.
  useEffect(startVideoAutopause, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex min-h-[var(--viewport-height,100dvh)] w-full flex-col">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
