import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import BookNow from "./pages/BookNow";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import HomeAppliances from "./pages/HomeAppliances";
import KitchenAppliances from "./pages/KitchenAppliances";
import CleaningLaundry from "./pages/CleaningLaundry";
import AllServices from "./pages/AllServices";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="repairup-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/book-now" element={<BookNow />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home-appliances" element={<HomeAppliances />} />
              <Route path="/kitchen-appliances" element={<KitchenAppliances />} />
              <Route path="/cleaning-laundry" element={<CleaningLaundry />} />
              <Route path="/all-services" element={<AllServices />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
