import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { RouteError } from "@/pages/RouteError";
import { PageLoader } from "@/pages/PageLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RouteError,
    HydrateFallback: PageLoader,
    children: [
      { index: true, Component: Home },
      {
        // Case studies are code-split: one data-driven template for all four.
        path: "work/:slug",
        lazy: async () => {
          const { CaseStudyPage } = await import("@/pages/CaseStudyPage");
          return { Component: CaseStudyPage };
        },
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
