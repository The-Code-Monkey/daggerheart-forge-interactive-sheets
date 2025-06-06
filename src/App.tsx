import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import { JSX, Suspense, lazy } from "react";

// Dynamic imports for route-level code splitting
const Index = lazy(() => import("./pages/Index"));
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
const HomebrewClassForm = lazy(
  () => import("./pages/homebrew/homebrewClassForm")
);
const HomebrewSubclassForm = lazy(
  () => import("./pages/homebrew/homebrewSubclassForm")
);
const HomebrewViewClasses = lazy(
  () => import("./pages/homebrew/view/class/HomebrewViewClasses")
);
const HomebrewViewSubclasses = lazy(
  () => import("./pages/homebrew/view/subclass/HomebrewViewSubclasses")
);

const App = (): JSX.Element => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
