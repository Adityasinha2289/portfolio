import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * Scrolls to a home-page section. On the home page it scrolls in place and
 * updates the hash; elsewhere it navigates to "/#id" and ScrollManager finishes the job.
 */
export function useScrollToSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id: string) => {
      if (pathname === "/") {
        const el = document.getElementById(id);
        if (el) {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          window.history.replaceState(null, "", `#${id}`);
          // Move focus for keyboard and screen-reader users without a second scroll
          const heading = el.querySelector<HTMLElement>("h2, h1");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
          }
          return;
        }
      }
      navigate(`/#${id}`);
    },
    [pathname, navigate],
  );
}
