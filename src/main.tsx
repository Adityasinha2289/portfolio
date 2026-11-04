import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "./styles/globals.css";

import { router } from "./app/router";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

createRoot(root).render(
  <StrictMode>
    {/* "user" = every Motion animation honours prefers-reduced-motion */}
    <MotionConfig reducedMotion="user">
      {/* LazyMotion + `m` components ship only the DOM-animation feature set (strict guards against full `motion` imports) */}
      <LazyMotion features={domAnimation} strict>
        <RouterProvider router={router} />
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
);
