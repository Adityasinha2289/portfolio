import type { SkillGroup, SkillTier } from "./types";

/**
 * No percentages, no progress bars. Each skill is tagged with the strongest
 * evidence that exists for it:
 *   shipped   — used in something running live on the web
 *   built     — used in a completed project (hackathon, coursework, personal)
 *   exploring — hands-on experimentation or study
 * Untagged items are everyday tools.
 */
export const tierMeta: Record<SkillTier, { label: string; description: string }> = {
  shipped: { label: "Shipped", description: "Used in something running live" },
  built: { label: "Built", description: "Used in a completed project" },
  exploring: { label: "Exploring", description: "Experimenting & learning" },
};

export const skillGroups: SkillGroup[] = [
  {
    code: "01",
    title: "Programming",
    blurb: "The languages everything else is built on.",
    skills: [
      { name: "Python", tier: "shipped", projects: ["hate-speech-detection", "nexgram"] },
      { name: "TypeScript", tier: "shipped", projects: ["renocred"] },
      { name: "JavaScript", tier: "shipped", projects: ["renocred", "hate-speech-detection"] },
      { name: "SQL", tier: "shipped", projects: ["renocred", "nexgram"] },
      { name: "HTML5", tier: "shipped" },
      { name: "CSS3", tier: "shipped" },
    ],
  },
  {
    code: "02",
    title: "Frontend Engineering",
    blurb: "Interfaces that are fast, responsive and pleasant to use.",
    skills: [
      { name: "React 19", tier: "shipped", projects: ["renocred", "nexgram"] },
      { name: "Vite", tier: "shipped", projects: ["renocred"] },
      { name: "Tailwind CSS", tier: "shipped", projects: ["renocred"] },
      { name: "Framer Motion", tier: "shipped", projects: ["renocred"] },
      { name: "Zustand", tier: "shipped", projects: ["renocred"] },
      { name: "Responsive design", tier: "shipped" },
      { name: "Component architecture", tier: "shipped" },
      { name: "State management", tier: "shipped", projects: ["renocred"] },
      { name: "API integration", tier: "shipped", projects: ["renocred"] },
      { name: "Interactive interfaces", tier: "shipped" },
    ],
  },
  {
    code: "03",
    title: "Backend Engineering",
    blurb: "APIs, business logic and the rules around who can do what.",
    skills: [
      { name: "FastAPI", tier: "built", projects: ["nexgram"] },
      { name: "SQLAlchemy", tier: "built", projects: ["nexgram"] },
      { name: "REST APIs", tier: "built", projects: ["nexgram", "hate-speech-detection"] },
      { name: "Business logic", tier: "built", projects: ["nexgram"] },
      { name: "Authentication", tier: "shipped", projects: ["renocred", "nexgram"] },
      { name: "Authorization", tier: "built", projects: ["nexgram"] },
      { name: "JWT", tier: "shipped", projects: ["renocred", "nexgram"] },
      { name: "RBAC", tier: "built", projects: ["nexgram"] },
      { name: "Node.js", tier: "exploring", projects: ["local-llm"] },
    ],
  },
  {
    code: "04",
    title: "Databases & Auth",
    blurb: "Data models that hold up, and security that lives in the database.",
    skills: [
      { name: "PostgreSQL", tier: "shipped", projects: ["renocred", "nexgram"] },
      { name: "Supabase", tier: "shipped", projects: ["renocred"] },
      { name: "Clerk", tier: "shipped", projects: ["renocred"] },
      { name: "Row-Level Security", tier: "shipped", projects: ["renocred"] },
      { name: "Relational design", tier: "shipped", projects: ["renocred", "nexgram"] },
      { name: "Prisma", tier: "exploring" },
    ],
  },
  {
    code: "05",
    title: "AI & Machine Learning",
    blurb: "From classical NLP pipelines to LLM features real users touch.",
    skills: [
      { name: "Gemini API", tier: "shipped", projects: ["renocred"] },
      { name: "LLM integration", tier: "shipped", projects: ["renocred"] },
      { name: "Prompt engineering", tier: "shipped", projects: ["renocred"] },
      { name: "Scikit-learn", tier: "shipped", projects: ["hate-speech-detection"] },
      { name: "Pandas", tier: "built", projects: ["hate-speech-detection"] },
      { name: "NLP", tier: "built", projects: ["hate-speech-detection"] },
      { name: "Text processing", tier: "built", projects: ["hate-speech-detection"] },
      { name: "Classification", tier: "built", projects: ["hate-speech-detection"] },
      { name: "Python ML workflows", tier: "built", projects: ["hate-speech-detection"] },
    ],
  },
  {
    code: "06",
    title: "Local AI Infrastructure",
    blurb: "Running models on my own hardware to understand what's under the API.",
    skills: [
      { name: "LM Studio", tier: "exploring", projects: ["local-llm"] },
      { name: "MLX", tier: "exploring", projects: ["local-llm"] },
      { name: "Qwen", tier: "exploring", projects: ["local-llm"] },
      { name: "DeepSeek Harness", tier: "exploring", projects: ["local-llm"] },
      { name: "Local inference", tier: "exploring", projects: ["local-llm"] },
      { name: "OpenAI-compatible APIs", tier: "exploring", projects: ["local-llm"] },
      { name: "Tool calling", tier: "exploring", projects: ["local-llm"] },
    ],
  },
  {
    code: "07",
    title: "Big Data",
    blurb: "How processing works when data doesn't fit on one machine.",
    skills: [
      { name: "Hadoop", tier: "exploring" },
      { name: "HDFS", tier: "exploring" },
      { name: "YARN", tier: "exploring" },
      { name: "MapReduce", tier: "exploring" },
      { name: "Apache Pig", tier: "exploring" },
      { name: "Distributed processing", tier: "exploring" },
    ],
  },
  {
    code: "08",
    title: "Developer Tools",
    blurb: "The everyday workbench.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Netlify" },
      { name: "npm" },
      { name: "pip" },
      { name: "Homebrew" },
      { name: "macOS terminal" },
      { name: "Jupyter Notebook" },
      { name: "Cursor" },
      { name: "Claude" },
      { name: "Figma" },
      { name: "Canva" },
    ],
  },
];
