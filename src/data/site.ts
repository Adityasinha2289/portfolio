/**
 * Site-wide identity, links and per-route metadata.
 * Plain TypeScript with no browser or React imports, so vite.config.ts can
 * reuse it to prerender route-specific <head> tags at build time.
 */

export const person = {
  name: "Aditya Sinha",
  shortName: "Aditya",
  roles: ["Software Engineer", "AI Builder", "Founder"],
  location: "Greater Noida, India",
  coordinates: "28.47°N 77.50°E",
  email: "adityasinha2598@gmail.com",
  /** Public portrait used for structured data (served from /public) */
  photo: "/aditya-sinha.jpg",
  education: {
    degree: "B.Tech, Computer Science & Engineering",
    specialization: "Data Science",
    school: "Bennett University",
    city: "Greater Noida",
    graduation: "May 2028",
  },
} as const;

export const social = {
  github: { label: "GitHub", handle: "Adityasinha2289", href: "https://github.com/Adityasinha2289" },
  linkedin: {
    label: "LinkedIn",
    handle: "aditya-sinha2289",
    href: "https://www.linkedin.com/in/aditya-sinha2289/",
  },
  x: { label: "X", handle: "@AdityaProbot", href: "https://x.com/AdityaProbot" },
  renocred: { label: "RenoCred", handle: "renocred.com", href: "https://renocred.com" },
} as const;

/**
 * Resume. The PDF in the repo root is intentionally git-ignored (it contains a
 * phone number and date of birth). To publish one, put a redacted copy at
 * public/resume.pdf and set this to "/resume.pdf". Until then every resume
 * button opens a pre-filled email request instead of a dead link.
 */
export const resumeUrl: string | undefined = undefined;

export const resumeRequestHref = `mailto:${person.email}?subject=${encodeURIComponent(
  "Resume request",
)}&body=${encodeURIComponent("Hi Aditya — could you share your latest resume?\n\n")}`;

export const site = {
  title: "Aditya Sinha | Software Engineer, AI Builder & Founder",
  description:
    "Explore the engineering portfolio of Aditya Sinha — Full-Stack Developer, AI Builder and Founder of RenoCred. Discover software projects, AI experiments and technical work.",
  themeColor: "#F4F0E8",
  ogImage: "/og.png",
  locale: "en_IN",
  twitter: "@AdityaProbot",
} as const;

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

export const caseStudyMeta: RouteMeta[] = [
  {
    path: "/work/renocred",
    title: "RenoCred — Case Study | Aditya Sinha",
    description:
      "How Aditya Sinha founded and engineered RenoCred, a live AI-powered credit card intelligence platform: architecture, card data infrastructure, Clerk + Supabase auth and Gemini insights.",
  },
  {
    path: "/work/nexgram",
    title: "NEXGram — Case Study | Aditya Sinha",
    description:
      "NEXGram: an explainable B2B retail–distributor intelligence engine built with FastAPI, SQLAlchemy and PostgreSQL. Rank 14 at Bennett University's internal Smart India Hackathon 2026.",
  },
  {
    path: "/work/local-llm",
    title: "Running Intelligence Locally — Case Study | Aditya Sinha",
    description:
      "Serving Qwen 3.5 9B with MLX and LM Studio on a 16GB MacBook Air M4 through an OpenAI-compatible API, and validating a tool-calling round trip.",
  },
  {
    path: "/work/hate-speech-detection",
    title: "Hate Speech Detection — Case Study | Aditya Sinha",
    description:
      "A TF-IDF + Logistic Regression text classifier for hate speech, offensive and normal language — with reproduced metrics, a confusion matrix and an honest look at class imbalance.",
  },
];

export const homeMeta: RouteMeta = { path: "/", title: site.title, description: site.description };

export const allRoutes: RouteMeta[] = [homeMeta, ...caseStudyMeta];
