import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

/**
 * Scroll behaviour on navigation:
 *  - "/#id" → scroll to that section once it's in the DOM
 *  - new page (PUSH/REPLACE) → top of page
 *  - back/forward (POP) → restore the previous position
 * Route-level scrolls are always instant: CSS smooth scrolling is for in-page jumps only.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const lastKey = useRef(key);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const save = () => positions.current.set(lastKey.current, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, []);

  useEffect(() => {
    lastKey.current = key;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ block: "start", behavior: "instant" });
          return;
        }
        if (tries++ < 20) requestAnimationFrame(attempt);
      };
      attempt();
      return;
    }
    if (navType === "POP" && positions.current.has(key)) {
      const y = positions.current.get(key) ?? 0;
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, key, navType]);

  return null;
}
