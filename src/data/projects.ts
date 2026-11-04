import type { Project, ProjectSlug } from "./types";
import { logos } from "./logos";
import renocredDesktop from "@/assets/projects/renocred-home-desktop.webp";
import renocredMobile from "@/assets/projects/renocred-home-mobile.webp";
import hateSpeechDemo from "@/assets/projects/hate-speech-demo.webp";

/**
 * Sources for every claim below:
 * - RenoCred: renocred.com (live), Aditya's resume, the previous portfolio, the build brief.
 * - NEXGram: github.com/Adityasinha2289/NEXGram — README.md, SUBMISSION.md, backend/.
 * - Local LLM: Aditya's own notes (no public repository yet).
 * - Hate speech: github.com/Adityasinha2289/Hate-Speech-DAP — metrics reproduced by
 *   re-running train_model.py's exact pipeline on 3 Nov 2026 (scikit-learn 1.6.1).
 * Screenshots were captured from the live sites on 3 Nov 2026.
 */

const renocred: Project = {
  id: "p01",
  slug: "renocred",
  index: "01",
  name: "RenoCred",
  title: "RenoCred",
  category: ["Fintech", "Full-Stack", "AI", "Product Engineering"],
  description:
    "An AI-powered fintech intelligence platform designed to simplify credit card discovery, rewards optimization and financial decision-making.",
  role: "Founder & Full-Stack Product Engineer",
  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "Zustand",
    "Supabase",
    "PostgreSQL",
    "Clerk",
    "Gemini API",
    "Vercel",
  ],
  status: "live",
  statusLabel: "Live · ongoing",
  featured: true,
  theme: "light",
  liveUrl: "https://renocred.com",
  logo: logos.renocred,
  extraLinks: [
    { label: "Partner portal", href: "https://renocred-partners.vercel.app" },
    { label: "Careers", href: "https://renocred-careers.vercel.app" },
  ],
  cover: {
    kind: "image",
    src: renocredDesktop,
    alt: "RenoCred's live homepage: the headline 'The right card for every flight home' above a stack of credit cards sliding out of a green wallet.",
    caption: "renocred.com — live homepage, captured 3 Nov 2026",
    width: 1440,
    height: 900,
    frame: "desktop",
    url: "renocred.com",
  },
  highlight: {
    label: "Card records in master dataset",
    value: "536+",
    note: "Reported record count — not a count of independently validated unique cards.",
    provenance: "reported",
  },
  seoDescription:
    "Founded and engineered RenoCred, an AI-powered credit card intelligence platform.",
  caseStudy: {
    overview:
      "RenoCred tells you which credit card to swipe for every spend. Add the cards you already own and it scores each one against the purchase in front of you, explains where your money goes, and reminds you before subscriptions renew. It's free and never touches your credit score. I founded it and built it end to end — product, architecture, data and business.",
    problem:
      "Most people carry more than one credit card and still pay with the wrong one. Reward structures are buried in long, inconsistent terms documents, category rules differ by issuer, and offers change constantly. The information needed to make a good choice exists — it just isn't structured anywhere a person can use at the moment of paying.",
    why:
      "It's a problem I had myself, and it sits exactly where my interests meet: messy real-world data, deterministic scoring logic, and AI used for explanation rather than guesswork. It was also a chance to own a product completely — from the database schema to the partner programme.",
    roleSummary:
      "Founder & Full-Stack Product Engineer. I lead technical execution and business development.",
    responsibilities: [
      "Scoped the core loop: add the cards you own, get told which one to swipe.",
      "Designed the full-stack application architecture and state model (Zustand).",
      "Designed the Supabase schemas and the card and offer data infrastructure.",
      "Built the deterministic multi-factor recommendation engine, “Taqdeer”.",
      "Integrated the Gemini API for natural-language spend insights.",
      "Wired Clerk authentication into Supabase Row-Level Security.",
      "Own deployment, domains and the public-facing web properties.",
      "Launched a partner portal and careers page; onboarded RenoCred's first intern development team.",
    ],
    stackGroups: [
      { label: "Interface", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Zustand"] },
      { label: "Identity & data", items: ["Clerk", "Supabase", "PostgreSQL", "Row-Level Security"] },
      { label: "Intelligence", items: ["Taqdeer scoring engine", "Gemini API"] },
      { label: "Data pipeline", items: ["ExtractFlow", "Universal Card Data Engine", "Structured JSON"] },
      { label: "Delivery", items: ["Vercel", "Custom domain", "Agentic workflows — Cursor, Claude, Gemini"] },
    ],
    diagrams: [
      {
        kind: "layers",
        title: "System architecture",
        caption:
          "A simplified view of how the product is layered. Scores are computed deterministically; the language model only explains them.",
        layers: [
          {
            name: "Interface",
            nodes: [
              { label: "Web app", detail: "React · TypeScript · Vite" },
              { label: "Client state", detail: "Zustand" },
              { label: "Public site", detail: "Marketing · partners · careers" },
            ],
          },
          {
            name: "Identity",
            nodes: [
              { label: "Clerk", detail: "Sign-in, sessions, JWT" },
              { label: "JWT → Supabase", detail: "Identity carried into the database", accent: true },
            ],
          },
          {
            name: "Intelligence",
            nodes: [
              { label: "Taqdeer", detail: "Deterministic multi-factor card scoring", accent: true },
              { label: "Gemini API", detail: "Natural-language spend insights" },
            ],
          },
          {
            name: "Data",
            nodes: [
              { label: "Supabase Postgres", detail: "Users, wallets, cards, offers" },
              { label: "Row-Level Security", detail: "Policies keyed to the signed-in user" },
            ],
          },
          {
            name: "Pipeline",
            nodes: [
              { label: "ExtractFlow", detail: "Configurable web data extraction" },
              { label: "Universal Card Data Engine", detail: "Normalise terms, rewards & offers" },
            ],
          },
        ],
      },
      {
        kind: "flow",
        title: "Card data flow",
        caption: "How raw, inconsistent issuer information becomes something the engine can score.",
        steps: [
          { label: "Issuer pages & terms" },
          { label: "Extract", detail: "ExtractFlow" },
          { label: "Normalise", detail: "Universal Card Data Engine" },
          { label: "Structured records", detail: "Cards & offers" },
          { label: "Score", detail: "Taqdeer", accent: true },
          { label: "Explain", detail: "Gemini" },
        ],
      },
    ],
    features: [
      {
        title: "Card recommendations",
        body: "A deterministic, multi-factor engine scores every card in your wallet against the spend in front of you and tells you which to use.",
      },
      {
        title: "Spend intelligence",
        body: "Gemini-powered insights explain where your money goes, category by category, in plain language.",
      },
      {
        title: "Rewards & renewals",
        body: "See what each card earns, and get a reminder before a subscription renews.",
      },
      {
        title: "Wallet intelligence",
        body: "Your cards as structured data — reward rates, categories and offers — rather than a list of names.",
      },
      {
        title: "Partner & careers portals",
        body: "Separate public sites for partnerships and hiring, built and deployed alongside the core product.",
      },
    ],
    challenges: [
      {
        title: "Bridging Clerk and Supabase",
        body: "Clerk owns identity; Supabase owns the data. For Row-Level Security to work, Supabase has to trust the Clerk-issued JWT so each policy can key off the signed-in user. Getting the token configuration, claims and policies to agree took careful, step-by-step debugging.",
      },
      {
        title: "Writing RLS policies that actually hold",
        body: "Policies that are too loose leak data; too strict and the app silently returns nothing. Each table needed its own read/write rules, tested from the client as a real user rather than with service credentials.",
      },
      {
        title: "Normalising financial product data",
        body: "Every issuer describes rewards differently. Turning terms, categories and offers into one consistent structure the engine can score is the hardest — and most valuable — part of the product.",
      },
      {
        title: "Shipping fast without breaking the bundle",
        body: "A motion-rich marketing site and a data-heavy app pull in opposite directions. Bundle size, API configuration, error handling and SEO all needed attention once the product was live.",
      },
    ],
    decisions: [
      {
        decision: "Scores are deterministic; the LLM only explains.",
        why: "A recommendation about money has to be reproducible and auditable. A rules-based engine gives the same answer for the same input; Gemini is used where language helps — explaining spend — not where it could invent numbers.",
      },
      {
        decision: "Managed auth (Clerk) + managed Postgres (Supabase).",
        why: "As a solo founder, time spent on auth plumbing is time not spent on the product. The trade-off is integration work between two vendors, which RLS makes worth it.",
      },
      {
        decision: "Security in the database, not just the UI.",
        why: "Row-Level Security means a bug in the frontend can't expose another user's wallet.",
      },
      {
        decision: "Agentic development workflows.",
        why: "Built with Cursor, Claude and Gemini as collaborators — which shifts the job toward architecture, review and verification rather than typing.",
      },
    ],
    visuals: [
      {
        kind: "image",
        src: renocredDesktop,
        alt: "RenoCred's live desktop homepage with the headline 'The right card for every flight home' and a wallet of credit cards.",
        caption: "Live homepage, desktop — captured from renocred.com on 3 Nov 2026.",
        width: 1440,
        height: 900,
        frame: "desktop",
        url: "renocred.com",
      },
      {
        kind: "image",
        src: renocredMobile,
        alt: "RenoCred on mobile showing '+₹150 — 5% back on fuel' for a fuel top-up with the IndianOil HDFC card.",
        caption: "Live homepage, mobile — the hero cycles through real spend scenarios.",
        width: 390,
        height: 844,
        frame: "mobile",
      },
    ],
    results: [
      { label: "Status", value: "Live", note: "Running in production at renocred.com.", provenance: "observed" },
      {
        label: "Grand Demo Day",
        value: "Finalist",
        note: "Entrepreneurship Boot-Camp 2.0, Bennett University — pitched as Founder of RenoCred. Poster in Milestones.",
        provenance: "documented",
      },
      {
        label: "Master card dataset",
        value: "536+",
        note: "Card records in the updated master dataset, as reported. Records, not independently validated unique cards.",
        provenance: "reported",
      },
      {
        label: "Unique cards in the engine",
        value: "133+",
        note: "Unique cards the Taqdeer engine recommends across, per Aditya's resume.",
        provenance: "reported",
      },
      {
        label: "Offer master data",
        value: "~1.5–2L",
        note: "Lines of JSON (≈150,000–200,000) — a line count, not a record count.",
        provenance: "reported",
      },
      {
        label: "Team",
        value: "Interns",
        note: "Onboarded RenoCred's first core intern development team.",
        provenance: "reported",
      },
    ],
    resultsNote:
      "Dataset figures describe the size of RenoCred's internal data, not production usage. No user, revenue or funding numbers are claimed here.",
  },
};

const nexgram: Project = {
  id: "p02",
  slug: "nexgram",
  index: "02",
  name: "NEXGram",
  title: "NEXGram",
  category: ["B2B SaaS", "Backend Engineering", "Hackathon"],
  description:
    "A B2B retailer–distributor ecosystem designed to connect demand, supply, inventory and procurement intelligence.",
  role: "Team Leader & Software Developer",
  technologies: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "JWT", "RBAC", "React 19", "Docker"],
  status: "completed",
  statusLabel: "Hackathon · completed",
  featured: true,
  theme: "dark",
  githubUrl: "https://github.com/Adityasinha2289/NEXGram",
  highlight: {
    label: "SIH 2026 · Bennett internal round",
    value: "Rank 14",
    note: "Top 100 teams at BU SIH-26, per the official certificate.",
    provenance: "documented",
  },
  seoDescription: "Explainable B2B retail–distributor intelligence. Rank 14 at Bennett University's internal Smart India Hackathon 2026.",
  caseStudy: {
    overview:
      "NEXGram is local business intelligence for rural B2B commerce. It turns scattered demand and supply signals into one explainable decision — a budget-aware stock plan for a retailer, a scored opportunity for a distributor — with every number traceable to the evidence behind it. I led the team and worked on the backend architecture, APIs and procurement workflows.",
    problem:
      "Rural and small-town retailers and distributors make stocking decisions on gut feel and word of mouth. Existing platforms answer “who sells X?”. Nobody answers “what should I sell — and why do you think so?” There's no aggregation of what customers ask for but can't find, and no view of which categories are under-supplied nearby.",
    why:
      "Smart India Hackathon set the brief; the team chose this wedge because it is computable with simple statistics on a small dataset, demonstrable in minutes, valuable to both sides of the market from one engine, and explainable without a language model inventing facts.",
    roleSummary: "Team Leader & Software Developer.",
    responsibilities: [
      "Led the team and coordinated product development through the hackathon.",
      "Worked on the backend architecture — FastAPI modules over SQLAlchemy and PostgreSQL.",
      "Developed APIs for catalogue, distributors, procurement, inventory and orders.",
      "Designed the procurement workflow: demand → supply gap → stock plan → order → reorder.",
      "Kept scope honest: what is real, what is stubbed, and what was deliberately not built.",
    ],
    stackGroups: [
      { label: "Backend", items: ["Python", "FastAPI", "SQLAlchemy 2.0", "Alembic", "Pydantic"] },
      { label: "Data", items: ["PostgreSQL", "SQLite (development)"] },
      { label: "Security", items: ["JWT", "Role-based access", "Rate limiting", "Audit trail"] },
      { label: "Frontend", items: ["React 19", "Vite", "Tailwind CSS v4", "PWA"] },
      { label: "Delivery", items: ["Docker Compose", "nginx", "pytest", "Vitest", "CI"] },
    ],
    diagrams: [
      {
        kind: "flow",
        title: "Core workflow",
        caption:
          "The product loop. When a distributor stocks a gap, it closes for every retailer — and their stock plans re-source automatically.",
        loops: true,
        steps: [
          { label: "Demand", detail: "Retailers report unmet asks" },
          { label: "Supply gap", detail: "Who can fulfil today" },
          { label: "Opportunity", detail: "Scored, with evidence", accent: true },
          { label: "Smart stock plan", detail: "Budget-aware" },
          { label: "Procurement", detail: "Multi-product" },
          { label: "Order", detail: "Locked, snapshotted" },
          { label: "Reorder", detail: "From order history" },
        ],
      },
      {
        kind: "layers",
        title: "API architecture",
        caption: "A modular FastAPI backend. Each business area is its own router, service and schema module.",
        layers: [
          {
            name: "Client",
            nodes: [
              { label: "Retailer app", detail: "Stock plan · procurement · orders" },
              { label: "Distributor app", detail: "Opportunities · catalogue · stock" },
            ],
          },
          {
            name: "API",
            nodes: [
              { label: "Auth", detail: "JWT · roles · password reset" },
              { label: "Catalogue", detail: "Products · categories" },
              { label: "Distributors", detail: "Listings · MOQ · stock" },
              { label: "Procurement & orders", detail: "Status machine" },
            ],
          },
          {
            name: "Intelligence",
            nodes: [
              { label: "Demand engine" },
              { label: "Supply-gap engine" },
              { label: "Opportunity engine", accent: true },
              { label: "Explanation + guardrail", detail: "Rejects unsupported figures" },
            ],
          },
          {
            name: "Core",
            nodes: [
              { label: "Security", detail: "JWT · rate limiting" },
              { label: "Audit & logging" },
            ],
          },
          {
            name: "Data",
            nodes: [
              { label: "SQLAlchemy 2.0 models" },
              { label: "Alembic migrations", detail: "Drift-checked in CI" },
              { label: "PostgreSQL" },
            ],
          },
        ],
      },
    ],
    features: [
      { title: "Product catalogue APIs", body: "Distributor catalogues managed against canonical products." },
      { title: "Distributor APIs", body: "Listings with pricing, stock and Minimum Order Quantity constraints." },
      {
        title: "Multi-product procurement",
        body: "A budget-aware stock plan using greedy allocation with MOQ and stock clamping.",
      },
      {
        title: "Price snapshots",
        body: "Unit prices are snapshotted at order time so later catalogue edits never rewrite history.",
      },
      {
        title: "Order management",
        body: "Row-level stock locking, a status machine with valid transitions, status history and stock rollback on cancellation.",
      },
      {
        title: "Authentication & authorization",
        body: "JWT auth with retailer and distributor roles, rate limiting, an audit trail and password recovery.",
      },
    ],
    challenges: [
      {
        title: "Making scores defensible",
        body: "A bare “82/100” invites the question “says who?”. Every score carries a confidence label and the arithmetic behind it — local demand, supply scarcity and fit — so it holds up under questioning from judges.",
      },
      {
        title: "Guarding the explanation layer",
        body: "Explanations are rendered from an evidence object and then verified against it: any sentence containing a figure the evidence can't support is rejected. It's tested with deliberately fabricated claims.",
      },
      {
        title: "Code that had never run",
        body: "The intelligence engine once shipped reading a column that didn't exist — nothing had executed it. End-to-end tests now run the whole chain against a real database.",
      },
      {
        title: "Models vs. migrations",
        body: "A migration-drift check fails the build if SQLAlchemy models and Alembic migrations disagree — the failure that passes every test and then breaks on deploy.",
      },
    ],
    decisions: [
      {
        decision: "The system calculates. The explanation describes.",
        why: "No score, quantity or ranking is ever produced by generated text. That's what would make it safe to add a language model later.",
      },
      {
        decision: "Scarcity means “can fulfil today”, not “has it listed”.",
        why: "Three suppliers who are all out of stock is still an opportunity. The engine and UI both enforce the distinction.",
      },
      {
        decision: "Design for cold-start from day one.",
        why: "One village is deliberately sparse in the dataset, so the low-confidence state is a real screen, not a hypothetical.",
      },
      {
        decision: "Synthetic, engineered data — and say so.",
        why: "Three villages, 25 retailers, 8 distributors, 46 products, 49 orders over 60 days. Reproducible demos; real onboarding writes to the same tables.",
      },
    ],
    visuals: [
      {
        kind: "placeholder",
        label: "Application screenshots",
        caption:
          "Screenshots of the retailer and distributor apps will be added here. Until then, the diagrams above describe the system as built.",
      },
    ],
    results: [
      {
        label: "SIH 2026 · internal round",
        value: "Rank 14",
        note: "BU SIH-26, Bennett University's internal Smart India Hackathon, 11–13 Sep 2026 — top 100 teams, per the certificate. Team leader.",
        provenance: "documented",
      },
      {
        label: "Automated tests",
        value: "102 + 49",
        note: "Backend + frontend tests, per the repository's SUBMISSION.md.",
        provenance: "repo",
      },
      { label: "Backend test files", value: "22", note: "Counted in backend/tests.", provenance: "measured" },
      {
        label: "Demo dataset",
        value: "Synthetic",
        note: "3 villages · 25 retailers · 8 distributors · 46 products · 49 orders.",
        provenance: "repo",
      },
    ],
    limitations: [
      "The rate limiter is in-process; multi-instance deployment needs Redis or a load-balancer limit.",
      "Geographic matching is exact string comparison on area and district — real deployment wants PostGIS.",
      "The stock plan's saturation constant (15 retailers) is a judgement call, not a fitted parameter.",
      "SMS delivery for password reset is stubbed; payments, logistics and invoicing are out of scope.",
    ],
  },
};

const localLlm: Project = {
  id: "p03",
  slug: "local-llm",
  index: "03",
  name: "Local LLM",
  title: "Running Intelligence Locally.",
  category: ["AI Systems", "Local Inference", "Experimentation"],
  description:
    "An exploration into local language model inference, model serving and tool-calling workflows on Apple Silicon.",
  role: "AI Systems Developer · personal experimentation",
  technologies: ["LM Studio", "MLX", "Qwen 3.5 9B", "DeepSeek Harness", "Node.js", "OpenAI-compatible API"],
  status: "experimental",
  statusLabel: "Experiment · validated",
  featured: true,
  theme: "terminal",
  highlight: {
    label: "Smoke test",
    value: "ROUND_TRIP_OK",
    note: "A local tool-calling round trip, validated end to end.",
    provenance: "reported",
  },
  seoDescription: "Local LLM inference and tool calling on a 16GB MacBook Air M4.",
  caseStudy: {
    overview:
      "Can a fanless laptop serve a language model well enough to drive real tool-calling workflows — with no cloud API at all? I set up local inference on a MacBook Air M4, exposed the model through an OpenAI-compatible API, pointed an agent harness at it, and validated a full tool-calling round trip.",
    problem:
      "Cloud LLM APIs cost money per token, send data off the device and stop working without a network. Most agent tooling assumes a hosted, OpenAI-style endpoint. The question was whether a local model on 16GB of unified memory could slot into that tooling unchanged.",
    why:
      "To understand the layers under the API call — model formats, runtimes, serving, and the tool-calling protocol — rather than treating “the model” as a black box behind a key.",
    roleSummary: "Personal experimentation — I set up, integrated and tested everything myself.",
    responsibilities: [
      "Installed and configured the LM Studio CLI.",
      "Ran Qwen 3.5 9B in MLX format on Apple Silicon.",
      "Started a local inference server on port 1234 with an OpenAI-compatible API.",
      "Tested the local model API directly before adding any tooling.",
      "Integrated DeepSeek Harness (Node.js) against the local endpoint.",
      "Wrote and ran smoke tests for a tool-calling round trip.",
    ],
    stackGroups: [
      { label: "Hardware", items: ["MacBook Air M4", "16GB unified memory", "Apple Silicon"] },
      { label: "Runtime", items: ["MLX", "LM Studio", "LM Studio CLI"] },
      { label: "Model", items: ["Qwen 3.5 9B (MLX)"] },
      { label: "Integration", items: ["OpenAI-compatible API", "DeepSeek Harness", "Node.js"] },
    ],
    diagrams: [
      {
        kind: "layers",
        title: "Local inference stack",
        caption: "Everything runs on one machine. The harness talks to localhost exactly as it would to a hosted API.",
        layers: [
          { name: "Harness", nodes: [{ label: "DeepSeek Harness", detail: "Node.js agent harness" }] },
          {
            name: "Protocol",
            nodes: [{ label: "OpenAI-compatible API", detail: "http://localhost:1234/v1", accent: true }],
          },
          { name: "Server", nodes: [{ label: "LM Studio", detail: "Local inference server" }] },
          { name: "Runtime", nodes: [{ label: "MLX", detail: "Apple's array framework for Apple Silicon" }] },
          { name: "Model", nodes: [{ label: "Qwen 3.5 9B", detail: "MLX weights" }] },
          { name: "Hardware", nodes: [{ label: "M4 · 16GB unified memory", detail: "MacBook Air" }] },
        ],
      },
      {
        kind: "flow",
        title: "Tool-calling round trip",
        caption: "What the smoke test checks: the model must request a tool, receive its result and finish the turn.",
        steps: [
          { label: "Prompt + tool schema", detail: "Harness → model" },
          { label: "Tool call", detail: "Model → harness" },
          { label: "Execute tool", detail: "In the harness" },
          { label: "Tool result", detail: "Harness → model" },
          { label: "Final answer", detail: "Model → harness" },
          { label: "Assert", detail: "ROUND_TRIP_OK", accent: true },
        ],
      },
    ],
    features: [
      { title: "Local model serving", body: "Qwen 3.5 9B served by LM Studio over MLX, entirely on-device." },
      {
        title: "Drop-in API",
        body: "An OpenAI-compatible endpoint on port 1234, so existing clients only need a different base URL.",
      },
      { title: "Harness integration", body: "DeepSeek Harness running against the local endpoint instead of a cloud provider." },
      { title: "Smoke tests", body: "A repeatable check that the full tool-calling loop works — not just plain chat." },
    ],
    challenges: [
      {
        title: "Memory is the budget",
        body: "16GB of unified memory is shared by the OS, the runtime and the model weights. Model size and format had to fit the machine, not the other way round.",
      },
      {
        title: "“Compatible” isn't identical",
        body: "An endpoint that answers chat requests doesn't guarantee tool calls are emitted and parsed correctly. That's why the test targets the round trip, not a hello-world.",
      },
      {
        title: "Testing the right thing",
        body: "Checking the API directly first separated server problems from harness problems before they got tangled together.",
      },
    ],
    decisions: [
      {
        decision: "MLX over a generic runtime.",
        why: "MLX is built for Apple Silicon's unified memory, which is the constraint that matters most on this machine.",
      },
      {
        decision: "Standard protocol over custom glue.",
        why: "Using the OpenAI-compatible API means the harness needs no local-specific code paths.",
      },
      {
        decision: "Validate with a sentinel string.",
        why: "A single unambiguous marker makes the test pass/fail obvious and scriptable.",
      },
    ],
    visuals: [
      {
        kind: "terminal",
        title: "smoke-test",
        caption:
          "The success line is the actual output from the smoke test. The surrounding commands are an illustrative reconstruction of the steps, not a captured session.",
        lines: [
          { type: "comment", text: "# start the local inference server" },
          { type: "cmd", text: "lms server start --port 1234" },
          { type: "comment", text: "# confirm the model is being served" },
          { type: "cmd", text: "curl -s http://localhost:1234/v1/models" },
          { type: "comment", text: "# run the harness smoke test against localhost" },
          { type: "cmd", text: "node smoke-test" },
          { type: "ok", text: "LOCAL_QWEN_TOOL_ROUND_TRIP_OK" },
        ],
      },
    ],
    results: [
      {
        label: "Tool-calling round trip",
        value: "Passed",
        note: "Smoke test printed LOCAL_QWEN_TOOL_ROUND_TRIP_OK.",
        provenance: "reported",
      },
      { label: "Cloud API calls", value: "0", note: "The whole loop runs on-device.", provenance: "reported" },
      { label: "Tokens / second", value: "—", note: "Not benchmarked yet.", provenance: "pending" },
      { label: "Memory footprint", value: "—", note: "Not measured yet.", provenance: "pending" },
    ],
    resultsNote:
      "This validates that the pieces work together. It is an experiment, not a production-ready autonomous agent.",
  },
};

const hateSpeech: Project = {
  id: "p04",
  slug: "hate-speech-detection",
  index: "04",
  name: "Hate Speech Detection",
  title: "Hate Speech Detection.",
  category: ["Machine Learning", "NLP", "Data Science"],
  description:
    "An NLP-oriented machine learning project exploring automated text classification and detection of harmful language.",
  role: "Developer",
  technologies: ["Python", "Pandas", "Scikit-learn", "NLTK", "TF-IDF", "Logistic Regression", "Vercel"],
  status: "completed",
  statusLabel: "Completed · live demo",
  featured: true,
  theme: "paper",
  liveUrl: "https://hate-speech-rec.vercel.app",
  githubUrl: "https://github.com/Adityasinha2289/Hate-Speech-DAP",
  cover: {
    kind: "image",
    src: hateSpeechDemo,
    alt: "The ModerateAI live moderation dashboard: a dark interface with a sidebar and a message input, labelling text as Normal, Offensive or Hate Speech.",
    caption: "Live demo — captured 3 Nov 2026",
    width: 1440,
    height: 900,
    frame: "desktop",
    url: "hate-speech-rec.vercel.app",
  },
  highlight: {
    label: "Test accuracy · macro F1",
    value: "88.7% · 0.73",
    note: "Reproduced from the repository's training pipeline.",
    provenance: "measured",
  },
  seoDescription: "TF-IDF + Logistic Regression hate speech classifier with reproduced metrics.",
  caseStudy: {
    overview:
      "A three-class text classifier that labels a message as Hate Speech, Offensive Language or Normal Speech, served through a small Python API with a moderation-dashboard frontend. The interesting part isn't the headline accuracy — it's what the accuracy hides.",
    problem:
      "Moderating text at scale needs a first-pass filter. The hard part is that hateful and merely offensive language share vocabulary, and genuinely hateful examples are rare — so a model can look accurate while missing the class that matters most.",
    why:
      "To work through a complete applied-NLP loop — preprocessing, features, a class-imbalanced dataset, evaluation and deployment — and to learn where a simple baseline breaks.",
    roleSummary: "Built it end to end: data preparation, model, API and frontend.",
    responsibilities: [
      "Cleaned text: lowercasing and removing URLs, mentions, hashtags, punctuation and stopwords.",
      "Built a scikit-learn pipeline: TF-IDF unigrams + bigrams into Logistic Regression.",
      "Handled class imbalance with balanced class weights and a stratified split.",
      "Served predictions with confidence through a Python API at /api/classify.",
      "Built the moderation dashboard and deployed it to Vercel.",
    ],
    stackGroups: [
      { label: "Data", items: ["Pandas", "labeled_data.csv — 24,783 tweets"] },
      { label: "Model", items: ["Scikit-learn", "TfidfVectorizer (1–2 grams)", "LogisticRegression (balanced)"] },
      { label: "Text", items: ["NLTK stopwords", "Regex preprocessing"] },
      { label: "Serving", items: ["Python serverless function", "joblib", "Vercel"] },
      { label: "Interface", items: ["HTML", "JavaScript", "Tailwind CSS"] },
    ],
    diagrams: [
      {
        kind: "flow",
        title: "Training pipeline",
        caption: "Exactly what train_model.py does.",
        steps: [
          { label: "labeled_data.csv", detail: "24,783 tweets" },
          { label: "Clean", detail: "URLs, @, #, punctuation, stopwords" },
          { label: "Split", detail: "80/20 stratified · seed 42" },
          { label: "TF-IDF", detail: "Unigrams + bigrams" },
          { label: "Logistic Regression", detail: "class_weight = balanced", accent: true },
          { label: "model.joblib" },
        ],
      },
      {
        kind: "flow",
        title: "Inference path",
        caption: "What happens when someone types into the live demo.",
        steps: [
          { label: "Message", detail: "Dashboard input" },
          { label: "POST /api/classify" },
          { label: "Same cleaning" },
          { label: "Pipeline.predict", accent: true },
          { label: "Label + confidence", detail: "JSON response" },
        ],
      },
    ],
    features: [
      { title: "Three-way classification", body: "Hate Speech, Offensive Language and Normal Speech — not just toxic / non-toxic." },
      { title: "Confidence scores", body: "Every prediction returns the model's probability alongside the label." },
      { title: "Moderation dashboard", body: "Workspace, dashboard and analytics views that update as predictions are made." },
      { title: "Serverless API", body: "A lean Python function that loads the trained pipeline and classifies on request." },
    ],
    challenges: [
      {
        title: "Severe class imbalance",
        body: "Only 5.8% of examples are hate speech, against 77.4% offensive. Balanced class weights help, but the minority class remains the weakest by a wide margin.",
      },
      {
        title: "Hate vs. offensive",
        body: "The two classes share vocabulary. In the reproduced test set, 146 of 286 hate-speech tweets were predicted as offensive — more than were classified correctly.",
      },
      {
        title: "Training–serving consistency",
        body: "Training removes NLTK's stopword list; the deployed API uses scikit-learn's built-in list to avoid downloading NLTK data at runtime. The two lists differ, so served inputs are cleaned slightly differently from training data — worth unifying.",
      },
    ],
    decisions: [
      {
        decision: "A linear baseline first.",
        why: "TF-IDF + Logistic Regression trains in seconds, is easy to inspect and gives an honest benchmark any heavier model has to beat.",
      },
      {
        decision: "Bigrams, not just words.",
        why: "Pairs of words capture phrases whose meaning differs from their parts.",
      },
      {
        decision: "Report per-class metrics, not just accuracy.",
        why: "88.7% accuracy sounds good; a 0.44 F1 on the class that matters most is the real story.",
      },
    ],
    visuals: [
      {
        kind: "image",
        src: hateSpeechDemo,
        alt: "The ModerateAI live moderation dashboard with sidebar navigation, a welcome card listing Normal, Offensive and Hate Speech labels, and a text input.",
        caption: "The live demo at hate-speech-rec.vercel.app — captured 3 Nov 2026.",
        width: 1440,
        height: 900,
        frame: "desktop",
        url: "hate-speech-rec.vercel.app",
      },
    ],
    results: [
      { label: "Accuracy", value: "88.7%", note: "4,957-tweet held-out test set.", provenance: "measured" },
      { label: "Macro F1", value: "0.731", note: "Unweighted mean across the three classes.", provenance: "measured" },
      { label: "Weighted F1", value: "0.885", note: "Weighted by class frequency.", provenance: "measured" },
      { label: "Hate-speech F1", value: "0.438", note: "Precision 0.481 · recall 0.402.", provenance: "measured" },
      { label: "Offensive F1", value: "0.931", note: "Precision 0.930 · recall 0.933.", provenance: "measured" },
      { label: "Normal F1", value: "0.825", note: "Precision 0.808 · recall 0.843.", provenance: "measured" },
    ],
    resultsNote:
      "Measured on 3 Nov 2026 by re-running the repository's exact training pipeline (stratified 80/20 split, random_state = 42, scikit-learn 1.6.1). No metrics were committed to the repository, so these are reproduced rather than quoted.",
    confusionMatrix: {
      labels: ["Hate", "Offensive", "Normal"],
      rows: [
        [115, 146, 25],
        [117, 3579, 142],
        [7, 124, 702],
      ],
      caption: "Rows are the true label, columns the prediction. 4,957 held-out tweets.",
    },
    limitations: [
      "Hate-speech recall is 0.40 — most hateful tweets are still missed or labelled offensive.",
      "Stopword removal drops negations like “not”, which can invert meaning.",
      "Trained on tweets; performance on other kinds of text is untested.",
      "A first-pass filter at best — moderation decisions still need human review.",
    ],
  },
};

export const projects: Project[] = [renocred, nexgram, localLlm, hateSpeech];

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

export const projectPath = (slug: ProjectSlug) => `/work/${slug}`;

/** Smaller builds, listed on the home page without case studies. */
export const moreWork: {
  name: string;
  kind: string;
  description: string;
  stack: string;
  githubUrl: string;
  liveUrl?: string;
}[] = [
  {
    name: "ExtractFlow",
    kind: "Open-source framework",
    description:
      "A configuration-driven Python framework for web data extraction — crawling, rendering, extraction, validation and export as pluggable layers. Honours robots.txt and per-host rate limits.",
    stack: "Python · Playwright · YAML/JSON",
    githubUrl: "https://github.com/Adityasinha2289/ExtractFlow",
  },
  {
    name: "UniAssist",
    kind: "Document-grounded assistant",
    description:
      "Answers student questions using only the university's official documents. Admins upload rule PDFs and re-index without code; runs fully offline.",
    stack: "Python · Flask · pdfplumber · scikit-learn",
    githubUrl: "https://github.com/Adityasinha2289/UniAssist",
  },
  {
    name: "Bennett Connect",
    kind: "Campus web app",
    description: "A web app for Bennett University students, and one of my first full-stack builds.",
    stack: "Next.js · TypeScript · Vercel",
    githubUrl: "https://github.com/Adityasinha2289/Bennett-connect",
    liveUrl: "https://bennett-connect.vercel.app",
  },
];
