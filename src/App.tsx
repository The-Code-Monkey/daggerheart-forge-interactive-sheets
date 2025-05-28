
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import GameRules from "./pages/GameRules";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CharacterBuilder from "./pages/CharacterBuilder";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";
import ClassDetail from "./pages/rules/ClassDetail";
import AncestryDetail from "./pages/rules/AncestryDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/game-rules" element={<GameRules />} />
              <Route path="/rules/classes/:className" element={<ClassDetail />} />
              <Route path="/rules/ancestries/:ancestryName" element={<AncestryDetail />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/character-builder" element={
                <ProtectedRoute>
                  <CharacterBuilder />
                </ProtectedRoute>
              } />
              <Route path="/campaigns" element={
                <ProtectedRoute>
                  <Campaigns />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
