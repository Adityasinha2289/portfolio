import type { Plugin } from "vite";

/**
 * Preloads the hero portrait from the HTML so the browser fetches it in parallel
 * with the JS bundle instead of discovering it after React renders. It is the
 * largest above-the-fold element (the LCP candidate). Hashed names are resolved
 * from the bundle at build time; the srcset/sizes mirror the <img> in Hero.tsx.
 */
export function heroPreloadPlugin(): Plugin {
  return {
    name: "hero-preload",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        const files = Object.keys(ctx.bundle ?? {});
        const find = (re: RegExp) => files.find((f) => re.test(f));
        const small = find(/aditya-sinha-640-[\w-]+\.webp$/);
        const large = find(/aditya-sinha-1080-[\w-]+\.webp$/);
        if (!small || !large) return [];
        return [
          {
            tag: "link",
            injectTo: "head",
            attrs: {
              rel: "preload",
              as: "image",
              type: "image/webp",
              href: `/${small}`,
              imagesrcset: `/${small} 640w, /${large} 1080w`,
              imagesizes: "(min-width: 1024px) 380px, 92vw",
              fetchpriority: "high",
            },
          },
        ];
      },
    },
  };
}
