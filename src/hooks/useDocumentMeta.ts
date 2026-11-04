import { useEffect } from "react";
import { site } from "@/data/site";

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "");

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps <title>, description, Open Graph and Twitter tags in sync on client-side
 * navigation. The same values are prerendered into static HTML at build time
 * (see build/prerender-head.ts) so crawlers and link unfurlers get them without JS.
 */
export function useDocumentMeta(meta: { title: string; description: string; path: string }) {
  useEffect(() => {
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    if (SITE_URL) {
      const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
      setMeta("property", "og:url", url);
      setCanonical(url);
    }
  }, [meta.title, meta.description, meta.path]);
}

export { site };
