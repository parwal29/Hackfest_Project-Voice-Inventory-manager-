import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { BackgroundProvider } from "@/contexts/BackgroundContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { InventoryProvider } from "@/contexts/InventoryContext";
import { DocumentsProvider } from "@/contexts/DocumentsContext";
import { BackgroundWrapper } from "@/components/BackgroundWrapper";
import { AuthUnified } from "@/pages/AuthUnified";
import { VoiceCall } from "@/pages/VoiceCall";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import Channels from "./pages/Channels";
import Analytics from "./pages/Analytics";
import Collaborators from "./pages/Collaborators";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, showLayout = true }: { children: React.ReactNode; showLayout?: boolean }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // For voice call, don't show the normal layout
  if (!showLayout) {
    return <>{children}</>;
  }
  
  return (
    <BackgroundWrapper>
      <div className="flex min-h-screen w-full relative">
        <AppSidebar />
        <div className="flex-1 flex flex-col relative">
          <AppHeader />
          <main className="flex-1 overflow-auto relative">
            {children}
          </main>
        </div>
      </div>
    </BackgroundWrapper>
  );
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Only wrap with GoogleOAuthProvider if client ID is configured
const AppContent = () => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InventoryProvider>
          <DocumentsProvider>
            <BackgroundProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthUnified />} />
              <Route
                path="/voice-call"
                element={
                  <ProtectedRoute showLayout={false}>
                    <VoiceCall />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
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
                path="/inventory"
                element={
                  <ProtectedRoute>
                    <Inventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales"
                element={
                  <ProtectedRoute>
                    <Sales />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/purchase"
                element={
                  <ProtectedRoute>
                    <Purchase />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/channels"
                element={
                  <ProtectedRoute>
                    <Channels />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/collaborators"
                element={
                  <ProtectedRoute>
                    <Collaborators />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/documents"
                element={
                  <ProtectedRoute>
                    <Documents />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BackgroundProvider>
          </DocumentsProvider>
        </InventoryProvider>
      </AuthProvider>
    </QueryClientProvider>
);

const App = () => {
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== '') {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AppContent />
      </GoogleOAuthProvider>
    );
  }
  return <AppContent />;
};

export default App;
