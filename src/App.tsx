import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import GameRules from "./pages/GameRules";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CharacterBuilder from "./pages/CharacterBuilder";
import CharacterSheet from "./pages/CharacterSheet";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";
import ClassDetail from "./pages/rules/ClassDetail";
import AncestryDetail from "./pages/rules/AncestryDetail";
import Homebrew from "./pages/Homebrew";
import HomebrewClassForm from "./pages/homebrew/homebrewClassForm";
import { JSX } from "react";

const App = (): JSX.Element => (
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
            {/* <Route path="/rules/domains/:domainName" element={<DomainDetail />} /> */}
            <Route path="/rules/classes/:className" element={<ClassDetail />} />
            <Route
              path="/rules/ancestries/:ancestryName"
              element={<AncestryDetail />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/character-builder/:characterId?"
              element={
                <ProtectedRoute>
                  <CharacterBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/character-sheet/:characterId"
              element={
                <ProtectedRoute>
                  <CharacterSheet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns"
              element={
                <ProtectedRoute>
                  <Campaigns />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homebrew"
              element={
                <ProtectedRoute>
                  <Homebrew />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homebrew/class"
              element={
                <ProtectedRoute>
                  <HomebrewClassForm />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
