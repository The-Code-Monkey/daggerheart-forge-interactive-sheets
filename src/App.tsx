import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import { JSX, Suspense, lazy, useEffect, useState } from "react";
import checkSupabaseGlobalStatus from "./integrations/status";

// Dynamic imports for route-level code splitting
import Index from "./pages/Index";
const GameRules = lazy(() => import("./pages/GameRules"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CharacterBuilder = lazy(() => import("./pages/CharacterBuilder"));
const CharacterSheet = lazy(() => import("./pages/CharacterSheet"));
const Campaigns = lazy(() => import("./pages/Campaigns"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ClassDetail = lazy(() => import("./pages/rules/ClassDetail"));
const AncestryDetail = lazy(() => import("./pages/rules/AncestryDetail"));
const SubclassDetail = lazy(() => import("./pages/rules/SubclassDetail"));
const Homebrew = lazy(() => import("./pages/Homebrew"));
// Homebrew Create Forms
const HomebrewClassForm = lazy(
  () => import("./pages/homebrew/homebrewClassForm")
);
const HomebrewSubclassForm = lazy(
  () => import("./pages/homebrew/homebrewSubclassForm")
);
const HomebrewDomainForm = lazy(
  () => import("./pages/homebrew/homebrewDomainForm")
);

// Homebrew View Pages
const HomebrewViewClasses = lazy(
  () => import("./pages/homebrew/view/class/HomebrewViewClasses")
);
const HomebrewViewSubclasses = lazy(
  () => import("./pages/homebrew/view/subclass/HomebrewViewSubclasses")
);
const HomebrewViewDomains = lazy(
  () => import("./pages/homebrew/view/domain/HomebrewViewDomains")
);

// Campaign Pages
const CreateCampaignPage = lazy(() => import("./pages/campaigns/create"));
const CampaignJoinPage = lazy(() => import("./pages/campaigns/join"));

import "./App.css";

const App = (): JSX.Element => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    void checkSupabaseGlobalStatus().then(setStatus);
  }, []);

  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="h-full">
            <Navigation />
            {!status && (
              <div className="w-full p-2 text-center text-xl">
                We currently have some server issues and will be back soon.
                Apologies
              </div>
            )}
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/game-rules" element={<GameRules />} />
                <Route
                  path="/rules/classes/:className"
                  element={<ClassDetail />}
                />
                <Route
                  path="/rules/subclass/:subclassId"
                  element={<SubclassDetail />}
                />
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
                <Route
                  path="/homebrew/subclass"
                  element={
                    <ProtectedRoute>
                      <HomebrewSubclassForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homebrew/domain"
                  element={
                    <ProtectedRoute>
                      <HomebrewDomainForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homebrewed/class"
                  element={
                    <ProtectedRoute>
                      <HomebrewViewClasses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homebrewed/subclass"
                  element={
                    <ProtectedRoute>
                      <HomebrewViewSubclasses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/homebrewed/domain"
                  element={
                    <ProtectedRoute>
                      <HomebrewViewDomains />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/campaigns/create"
                  element={
                    <ProtectedRoute>
                      <CreateCampaignPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/campaigns/:invite/invite"
                  element={
                    <ProtectedRoute>
                      <CampaignJoinPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
