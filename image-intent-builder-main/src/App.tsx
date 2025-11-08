import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { BackgroundProvider } from "@/contexts/BackgroundContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BackgroundWrapper } from "@/components/BackgroundWrapper";
import { Auth } from "@/pages/Auth";
import { AuthVoice } from "@/pages/AuthVoice";
import { VoiceCall } from "@/pages/VoiceCall";
import Dashboard from "./pages/Dashboard";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BackgroundProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthVoice />} />
              <Route path="/auth-classic" element={<Auth />} />
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
