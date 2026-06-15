import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Capacitor } from "@capacitor/core";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import FullscreenGate from "@/components/FullscreenGate";
import { useAppFullscreen } from "@/hooks/useAppFullscreen";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SecondScreen from "./pages/SecondScreen.tsx";
import Portraits from "./pages/Portraits.tsx";
import PortraitDetail from "./pages/PortraitDetail.tsx";
import PortraitTimeline from "./pages/PortraitTimeline.tsx";
import NotFound from "./pages/NotFound.tsx";
import SliderPage from "./pages/SliderPage.tsx";
import Religions from "./pages/Religions.tsx";
import WomenPage from "./pages/Women.tsx";
import StartMenu from "./pages/StartMenu.tsx";
import Touristic from "./pages/Touristic.tsx";
import TouristicDetail from "./pages/TouristicDetail.tsx";
import Library from "./pages/Library.tsx";
import LibraryWriters from "./pages/LibraryWriters.tsx";
import LibraryBooks from "./pages/LibraryBooks.tsx";
import LibraryWriterDetail from "./pages/LibraryWriterDetail.tsx";
import LibraryFeaturedWriter from "./pages/LibraryFeaturedWriter.tsx";
import LibraryBookDetail from "./pages/LibraryBookDetail.tsx";
import LibraryBookReader from "./pages/LibraryBookReader.tsx";

const queryClient = new QueryClient();
const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter;

const AppRoutes = () => {
  const { pathname } = useLocation();
  const { showGate, onGateActivate } = useAppFullscreen(pathname);

  return (
    <>
      <FullscreenGate visible={showGate} onActivate={onGateActivate} />
      <Routes>
          <Route path="/" element={<StartMenu />} />
          <Route path="/screen-1" element={<Index />} />
          <Route path="/screen-2" element={<SecondScreen />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/portraits/:id" element={<PortraitDetail />} />
          <Route path="/portraits/:id/timeline" element={<PortraitTimeline />} />
          <Route path="/slider" element={<SliderPage />} />
          <Route path="/religions" element={<Religions />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/touristic" element={<Touristic />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <AppRoutes />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
