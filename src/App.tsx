import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Capacitor } from "@capacitor/core";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import FullscreenGate from "@/components/FullscreenGate";
import { useAppFullscreen } from "@/hooks/useAppFullscreen";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import { startVideoAutopause } from "@/lib/videoAutopause";

/**
 * BCF branch: this build is a single-experience kiosk. Every other route is
 * unreachable so a visitor (or a stale bookmark) cannot leave the BCF flow.
 */
const BcfPage = lazy(() => import("./pages/Bcf.tsx"));

const queryClient = new QueryClient();
const isFileProtocol = typeof window !== "undefined" && window.location.protocol === "file:";
const Router = Capacitor.isNativePlatform() || isFileProtocol ? HashRouter : BrowserRouter;

const AppRoutes = () => {
  const { pathname } = useLocation();
  const { showGate, onGateActivate } = useAppFullscreen(pathname);

  return (
    <>
      <FullscreenGate visible={showGate} onActivate={onGateActivate} />
      <Suspense
        fallback={<div className="min-h-screen w-full flex-1 bg-[#0a0a0a]" />}
      >
        <Routes>
          <Route path="/bcf" element={<BcfPage />} />
          <Route path="/" element={<Navigate to="/bcf" replace />} />
          <Route path="*" element={<Navigate to="/bcf" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  useViewportHeight();

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
