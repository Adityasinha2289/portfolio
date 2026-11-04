import type { Plugin } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { allRoutes, caseStudyMeta, homeMeta, person, site, social, type RouteMeta } from "../src/data/site.ts";

/**
 * Build-time SEO for a client-rendered SPA:
 *  1. Injects title, description, Open Graph, Twitter and JSON-LD tags into index.html.
 *  2. Emits a copy of index.html per case-study route (work/<slug>.html) with that
 *     route's metadata, so crawlers and link unfurlers see correct tags without JS.
 *     Vercel's cleanUrls serves /work/<slug> from work/<slug>.html.
 *  3. Emits robots.txt and, when SITE_URL is known, sitemap.xml + canonical URLs.
 */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headTags(meta: RouteMeta, siteUrl?: string): string {
  const url = siteUrl ? `${siteUrl}${meta.path === "/" ? "/" : meta.path}` : undefined;
  const img = siteUrl ? `${siteUrl}${site.ogImage}` : site.ogImage;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    url && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.path === "/" ? "profile" : "article"}" />`,
    `<meta property="og:site_name" content="${esc(person.name)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${person.name} — Software Engineer, AI Builder & Founder`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${site.twitter}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ];
  return tags.filter(Boolean).join("\n    ");
}

function personSchema(siteUrl?: string) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: "Software Engineer",
    description: site.description,
    ...(siteUrl ? { url: siteUrl, image: `${siteUrl}${person.photo}` } : {}),
    email: `mailto:${person.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Greater Noida", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: person.education.school },
    award: [
      "Grand Demo Day Finalist, Entrepreneurship Boot-Camp 2.0, Bennett University",
      "Rank 14, BU SIH-26 (Smart India Internal Hackathon 2026), Bennett University",
    ],
    founder: { "@type": "Organization", name: "RenoCred", url: social.renocred.href },
    knowsAbout: ["Full-stack development", "Artificial intelligence", "Machine learning", "Product engineering"],
    sameAs: [social.github.href, social.linkedin.href, social.x.href],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

const START = "<!--seo:start-->";
const END = "<!--seo:end-->";

export function seoPlugin(siteUrl?: string): Plugin {
  const base = siteUrl?.replace(/\/$/, "");
  let outDir = "dist";
  let isBuild = false;
  return {
    name: "portfolio-seo",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(
          "<!--seo-->",
          `${START}\n    ${headTags(homeMeta, base)}\n    ${END}\n    ${personSchema(base)}`,
        );
      },
    },
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },
    closeBundle() {
      if (!isBuild) return;
      const write = (file: string, content: string) => {
        const full = resolve(outDir, file);
        mkdirSync(dirname(full), { recursive: true });
        writeFileSync(full, content);
      };
      const html = readFileSync(resolve(outDir, "index.html"), "utf8");
      const re = new RegExp(`${START}[\\s\\S]*?${END}`);
      if (!re.test(html)) throw new Error("seo-plugin: SEO markers missing from built index.html");

      // Case-study pages don't show the hero portrait, so drop its preload there
      const pageHtml = html.replace(/\s*<link rel="preload" as="image"[^>]*>/, "");
      for (const meta of caseStudyMeta) {
        write(`${meta.path.slice(1)}.html`, pageHtml.replace(re,`${START}\n    ${headTags(meta, base)}\n    ${END}`));
      }

      const robots = ["User-agent: *", "Allow: /", base ? `\nSitemap: ${base}/sitemap.xml` : ""].join("\n");
      write("robots.txt", robots.trim() + "\n");

      if (base) {
        const today = new Date().toISOString().slice(0, 10);
        const urls = allRoutes
          .map(
            (r) =>
              `  <url><loc>${base}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${
                r.path === "/" ? "1.0" : "0.8"
              }</priority></url>`,
          )
          .join("\n");
        write(
          "sitemap.xml",
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
      } else {
        console.warn("\n[portfolio-seo] VITE_SITE_URL is not set — skipped sitemap.xml and canonical URLs. See README.");
      }
    },
  };
}
