import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/screen-2" element={<SecondScreen />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/portraits/:id" element={<PortraitDetail />} />
          <Route path="/portraits/:id/timeline" element={<PortraitTimeline />} />
          <Route path="/slider" element={<SliderPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
