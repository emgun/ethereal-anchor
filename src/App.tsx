import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Meditate from "./pages/Meditate";
import Breathwork from "./pages/Breathwork";
import Recipes from "./pages/Recipes";
import Plants from "./pages/Plants";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/context/ThemeContext";
import { RitualProvider } from "@/context/RitualContext";
import { ThemeBackdrop } from "@/components/ThemeBackdrop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RitualProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="relative min-h-screen bg-background/10 font-body">
              <ThemeBackdrop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/meditate" element={<Meditate />} />
                <Route path="/breathwork" element={<Breathwork />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/plants" element={<Plants />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Navigation />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </RitualProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
