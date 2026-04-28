// ================================================================
// App.tsx — NCC Portal
// National Cultural Competition
// ================================================================
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import ScrollToTop from "./components/ncc/ScrollToTop";

// NCC Pages
import NccIndex          from "./pages/NccIndex";
import NccAbout          from "./pages/NccAbout";
import NccFaq            from "./pages/NccFaq";
import NccContact        from "./pages/NccContact";
import NccUpcomingEvents from "./pages/NccUpcomingEvents";

// Shared pages
import PastEvents        from "./pages/PastEvents";
import EventDetail       from "./pages/events/Eventdetail";
import NotFound          from "./pages/NotFound";
import Terms             from "@/pages/data/Terms";
import Guide             from "@/pages/guide";
import NccRegister       from "./pages/NccRegister";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main */}
              <Route path="/"            element={<NccIndex />} />

              {/* Events */}
              <Route path="/events"      element={<NccUpcomingEvents />} />
              <Route path="/past-events" element={<PastEvents />} />
              <Route path="/events/:slug" element={<EventDetail />} />

              {/* Info pages */}
              <Route path="/about"       element={<NccAbout />} />
              <Route path="/faq"         element={<NccFaq />} />
              <Route path="/contact"     element={<NccContact />} />
              <Route path="/terms"       element={<Terms />} />
              <Route path="/guide"       element={<Guide />} />
              <Route path="/register"    element={<NccRegister />} />

              <Route path="*"            element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;