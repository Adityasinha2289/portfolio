import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { seoPlugin } from "./build/seo-plugin.ts";
import { heroPreloadPlugin } from "./build/hero-preload.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Public URL of the deployed site, e.g. https://adityasinha.dev — enables canonical URLs and sitemap.xml
  const siteUrl = env.VITE_SITE_URL || undefined;

  return {
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl), heroPreloadPlugin()],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    build: {
      target: "es2022",
      cssMinify: true,
      assetsInlineLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/motion") || id.includes("node_modules/framer-motion")) return "motion";
            if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "react";
          },
        },
      },
    },
  };
});
