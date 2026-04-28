// ================================================================
// NccShell.tsx — layout wrapper for NCC pages
// ================================================================
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import NccNavbar from "./NccNavbar";
import NccFooter from "./NccFooter";
import ScrollToTop from "@/components/ncc/ScrollToTop";

type NccShellProps = {
  children: ReactNode;
  showFooter?: boolean;
};

const NccShell = ({ children, showFooter = true }: NccShellProps) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <NccNavbar />
      <main className="relative">{children}</main>
      {showFooter && <NccFooter />}

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 rounded-lg border border-border bg-surface p-3 shadow-lg backdrop-blur-xl"
        style={{
          boxShadow: "0 0 0 1px hsl(32 100% 55% / 0.2), 0 8px 32px hsl(32 100% 55% / 0.15)",
          color: "hsl(32 100% 55%)",
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default NccShell;