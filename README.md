# Aditya Sinha · Portfolio

Personal portfolio of **Aditya Sinha** — software engineer, AI builder and founder of [RenoCred](https://renocred.com).
Neo-brutalist × Swiss editorial design: ivory and ink, acid-lime accents, engineering-grid details.

## Stack

React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · Motion (`motion/react`, via `LazyMotion`) · React Router 7 · Lucide.
Fonts are self-hosted through Fontsource (Space Grotesk, DM Sans, IBM Plex Mono). No backend.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run typecheck
npm run lint
```

## Environment

| Variable        | Required | Purpose |
|-----------------|----------|---------|
| `VITE_SITE_URL` | No, but recommended | Public origin, e.g. `https://adityasinha.dev`. Enables canonical URLs, absolute `og:url`/`og:image`, and `sitemap.xml`. Without it the build skips those and prints a warning. |

See `.env.example`.

## Deploy (Vercel)

1. Import the repo in Vercel — the Vite preset is detected (build `npm run build`, output `dist`).
2. Set `VITE_SITE_URL` in Project → Settings → Environment Variables, then redeploy.
3. `vercel.json` handles SPA rewrites, clean URLs, long-lived caching for hashed assets and basic security headers.

## How it's organised

```text
src/
├── app/            router + root layout (nav, footer, page transition, scroll manager)
├── components/
│   ├── brutalist/  BrutalButton, SectionHeading, Marquee, ProvenanceBadge
│   ├── motion/     Reveal, MagneticButton
│   ├── terminal/   EngineeringTerminal + typed command registry
│   ├── case-study/ architecture & flow diagrams
│   ├── common/     DeviceFrame, TerminalWindow, ConfusionMatrixView
│   └── layout/     Navbar, Footer, ScrollManager
├── sections/       home-page sections (Hero … Contact)
├── pages/          Home, CaseStudyPage (one data-driven template, code-split), NotFound, errors
├── data/           ALL content: site, projects, skills, experience, achievements, navigation
├── hooks/
└── styles/         design tokens + base styles (globals.css)
build/seo-plugin.ts  build-time <head> tags, per-route HTML, robots.txt, sitemap.xml
legacy/              the previous single-file site, kept for reference (not deployed)
```

**Content lives only in `src/data/`.** To edit copy, add a project or change a link, edit the data files — components
never hardcode content. Case-study routes (`/work/:slug`) are generated from `src/data/projects.ts`; per-route SEO
metadata lives in `src/data/site.ts`.

### Honesty rules baked into the data

Every metric carries a `provenance`, rendered as a small badge:

- **Measured** — reproduced by running the project's own code (e.g. the hate-speech metrics were reproduced on
  3 Nov 2026 by re-running `train_model.py`'s exact pipeline).
- **Per repository** — stated in that project's repo docs.
- **Reported** — reported by Aditya, not independently verified.
- **Verifiable** — publicly observable (e.g. a live site).
- **Documented** — backed by an official document shown on the site (the Grand Demo Day finalist poster, the BU SIH-26
  rank certificate). Certificates live in `src/assets/` and open in a lightbox.
- **Pending** — not available yet.

Skills are tagged *Shipped / Built / Exploring* instead of proficiency bars.

## Adding things later

- **Resume:** add a redacted PDF at `public/resume.pdf` and set `resumeUrl = "/resume.pdf"` in `src/data/site.ts`.
  Until then, resume buttons open a pre-filled email request.
- **NEXGram screenshots:** add images to `src/assets/projects/` and replace the `placeholder` visual in
  `src/data/projects.ts` with `kind: "image"` entries.
- **Social image:** `public/og.png` (1200×630).

## Accessibility & motion

Semantic landmarks, skip link, visible focus rings, focus-trapped mobile menu, labelled terminal input with a live
log region. Every animation honours `prefers-reduced-motion` (Motion's `reducedMotion="user"` plus CSS fallbacks);
content never depends on an animation to become readable. Magnetic buttons are disabled on touch devices.

© Aditya Sinha
