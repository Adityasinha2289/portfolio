import { Outlet, useLocation } from "react-router";
import { m, useReducedMotion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollManager } from "@/components/layout/ScrollManager";

/**
 * App shell. Page transitions are enter-only and short (≈250ms) so navigation
 * never waits on an exit animation.
 */
export function RootLayout() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  return (
    <>
      <ScrollManager />
      <Navbar />
      <m.main
        id="main"
        tabIndex={-1}
        key={pathname}
        className="outline-none"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </m.main>
      <Footer />
    </>
  );
}
