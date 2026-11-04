/**
 * Content model for the whole site. Every fact on the page comes from a typed
 * module in src/data — components never hardcode content.
 */

export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "cover" for marks that carry their own background (fills the tile) */
  fit: "contain" | "cover";
  /** Wordmarks wider than they are tall get a wider tile */
  wide?: boolean;
}

export type ProjectSlug = "renocred" | "nexgram" | "local-llm" | "hate-speech-detection";

export type ProjectStatus = "live" | "completed" | "ongoing" | "experimental";

/** How a number or claim was established. Rendered next to every metric. */
export type Provenance =
  | "measured" // reproduced from source code and data by running it
  | "repo" // stated in the project's own repository documentation
  | "reported" // reported by Aditya; not independently verified
  | "observed" // directly observable (e.g. the site is live)
  | "documented" // backed by an official document shown on the site
  | "pending"; // not yet available

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Metric {
  label: string;
  value: string;
  note?: string;
  provenance: Provenance;
}

export interface TitledText {
  title: string;
  body: string;
}

export interface Decision {
  decision: string;
  why: string;
}

export interface DiagramNode {
  label: string;
  detail?: string;
  accent?: boolean;
}

export interface DiagramLayer {
  name: string;
  nodes: DiagramNode[];
}

export interface Diagram {
  kind: "layers";
  title: string;
  caption: string;
  layers: DiagramLayer[];
}

export interface FlowDiagram {
  kind: "flow";
  title: string;
  caption: string;
  steps: DiagramNode[];
  loops?: boolean;
}

export interface ConfusionMatrix {
  labels: string[];
  /** rows = actual, columns = predicted */
  rows: number[][];
  caption: string;
}

export type Visual =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
      frame?: "desktop" | "mobile";
      /** Shown in the browser chrome */
      url?: string;
    }
  | { kind: "terminal"; title: string; caption: string; lines: TerminalLine[] }
  | { kind: "placeholder"; label: string; caption: string };

export interface TerminalLine {
  type: "cmd" | "out" | "ok" | "comment";
  text: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  why: string;
  roleSummary: string;
  responsibilities: string[];
  stackGroups: { label: string; items: string[] }[];
  diagrams: (Diagram | FlowDiagram)[];
  features: TitledText[];
  challenges: TitledText[];
  decisions: Decision[];
  visuals: Visual[];
  results: Metric[];
  resultsNote?: string;
  confusionMatrix?: ConfusionMatrix;
  limitations?: string[];
}

export interface Project {
  id: string;
  slug: ProjectSlug;
  index: string;
  title: string;
  /** Short title used in nav, cards, terminal */
  name: string;
  category: string[];
  description: string;
  role: string;
  technologies: string[];
  status: ProjectStatus;
  statusLabel: string;
  featured: boolean;
  theme: "light" | "dark" | "terminal" | "paper";
  liveUrl?: string;
  githubUrl?: string;
  logo?: Logo;
  extraLinks?: ExternalLink[];
  cover?: Visual;
  highlight: Metric;
  seoDescription: string;
  caseStudy: CaseStudy;
}

export type SkillTier = "shipped" | "built" | "exploring";

export interface Skill {
  name: string;
  tier?: SkillTier;
  projects?: ProjectSlug[];
}

export interface SkillGroup {
  code: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  orgDetail?: string;
  period: string;
  tag: string;
  summary: string;
  points: string[];
  project?: ProjectSlug;
  logo?: Logo;
  recognition?: { text: string; provenance: Provenance };
}

export interface Achievement {
  id: string;
  figure: string;
  figureSub?: string;
  title: string;
  context: string;
  note: string;
  provenance: Provenance;
  project?: ProjectSlug;
  tone: "lime" | "ink" | "paper" | "coral";
  /** Supporting document, e.g. an official certificate or poster */
  evidence?: Evidence;
}

/** An official document shown as proof, opened full-size in a lightbox */
export interface Evidence {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  /** Short noun for the button, e.g. "poster" or "certificate" */
  kind: "poster" | "certificate";
}

export interface Certification {
  name: string;
  issuer: string;
  /** Extra facts printed on the certificate, e.g. score and term */
  detail?: string;
  evidence?: Evidence;
}
