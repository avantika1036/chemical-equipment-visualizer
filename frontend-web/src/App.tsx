import Home from "./pages/Home";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "@/hooks/useAuth";

const queryClient = new QueryClient();

/* ===============================
   ROUTES
================================ */

// Update src/App.tsx - change the AppRoutes function:

const AppRoutes = () => {
  const { user, loading, signIn, signUp } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* AUTH */}
      <Route
        path="/auth"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Auth
              signIn={signIn}
              signUp={signUp}
            />
          )
        }
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Index />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

/* ===============================
   ROOT
================================ */

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
