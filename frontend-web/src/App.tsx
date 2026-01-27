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

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* ===============================
   ROUTES
================================ */

const AppRoutes = () => {
  const { user, loading, signIn, signUp } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {/* AUTH */}
      <Route
        path="/auth"
        element={
          user ? (
            <Navigate to="/" replace />
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
        path="/"
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
