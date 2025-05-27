
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import GameRules from "./pages/GameRules";
import Login from "./pages/Login";
import CharacterBuilder from "./pages/CharacterBuilder";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";
import ClassDetail from "./pages/rules/ClassDetail";
import AncestryDetail from "./pages/rules/AncestryDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game-rules" element={<GameRules />} />
            <Route path="/login" element={<Login />} />
            <Route path="/character-builder" element={<CharacterBuilder />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/rules/classes/:className" element={<ClassDetail />} />
            <Route path="/rules/ancestries/:ancestryName" element={<AncestryDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
