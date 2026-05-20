import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Capacitor } from "@capacitor/core";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();
const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
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
          <Route path="/touristic/:id" element={<TouristicDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
