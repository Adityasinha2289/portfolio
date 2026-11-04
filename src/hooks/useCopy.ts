import { useCallback, useEffect, useRef, useState } from "react";

/** Copy text to the clipboard with a short-lived "copied" state and a fallback. */
export function useCopy(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      let ok: boolean;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        // Fallback for browsers/contexts without the async clipboard API
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          ok = document.execCommand("copy");
        } catch {
          ok = false;
        }
        ta.remove();
      }
      setCopied(ok);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), resetMs);
      return ok;
    },
    [resetMs],
  );

  return { copied, copy };
}
