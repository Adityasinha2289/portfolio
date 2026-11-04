import { projects, projectPath } from "@/data/projects";
import { skillGroups, tierMeta } from "@/data/skills";
import { experience } from "@/data/experience";
import { person, social, resumeUrl } from "@/data/site";

/**
 * Safe, predefined command registry for the Engineering Lab terminal.
 * Commands are pure functions over typed site data. There is no eval, no shell,
 * no network and no filesystem — unknown input simply returns an error line.
 */

export type Tone = "default" | "muted" | "lime" | "coral";

export type OutputLine =
  | { kind: "text"; text: string; tone?: Tone }
  | { kind: "heading"; text: string }
  | { kind: "row"; label: string; value: string; to?: string; href?: string }
  | { kind: "spacer" };

export type CommandResult =
  | { type: "output"; lines: OutputLine[] }
  | { type: "clear" }
  | { type: "exit" }
  | { type: "navigate"; to: string; lines: OutputLine[] };

export interface Command {
  name: string;
  summary: string;
  usage?: string;
  hidden?: boolean;
  run: (args: string[]) => CommandResult;
}

const out = (...lines: OutputLine[]): CommandResult => ({ type: "output", lines });
const t = (text: string, tone?: Tone): OutputLine => ({ kind: "text", text, tone });
const h = (text: string): OutputLine => ({ kind: "heading", text });
const row = (label: string, value: string, link?: { to?: string; href?: string }): OutputLine => ({
  kind: "row",
  label,
  value,
  ...link,
});
const gap: OutputLine = { kind: "spacer" };

const findProject = (q: string) => {
  const s = q.toLowerCase().replace(/^p\/?/, "");
  return projects.find(
    (p) => p.slug === s || p.index === s || p.index === s.padStart(2, "0") || p.name.toLowerCase().replace(/\s+/g, "-") === s || p.slug.startsWith(s),
  );
};

export const commands: Command[] = [
  {
    name: "help",
    summary: "List available commands",
    run: () =>
      out(
        h("Available commands"),
        ...commands.filter((c) => !c.hidden).map((c) => row(c.usage ?? c.name, c.summary)),
        gap,
        t("Tip: ↑/↓ for history, Tab to autocomplete.", "muted"),
      ),
  },
  {
    name: "whoami",
    summary: "Who is behind this terminal",
    run: () =>
      out(
        t(`${person.name}`, "lime"),
        t(`${person.roles.join(" / ")}`),
        t(
          `${person.education.degree} (${person.education.specialization}), ${person.education.school} — graduating ${person.education.graduation}.`,
          "muted",
        ),
        t("Founder of RenoCred. Interested in where software engineering, AI and real-world products meet.", "muted"),
      ),
  },
  {
    name: "projects",
    summary: "List selected projects",
    run: () =>
      out(
        h("Selected projects"),
        ...projects.map((p) => row(`${p.index}  ${p.name}`, `${p.category.slice(0, 2).join(" / ")} · ${p.statusLabel}`, { to: projectPath(p.slug) })),
        gap,
        t("Run `open <name|number>` to read a case study — e.g. `open 01`.", "muted"),
      ),
  },
  {
    name: "open",
    usage: "open <project>",
    summary: "Open a project case study",
    run: (args) => {
      const q = args[0];
      if (!q) return out(t("usage: open <project>   e.g. open renocred, open 02", "coral"));
      const p = findProject(q);
      if (!p) return out(t(`open: no project matching “${q}”. Try \`projects\`.`, "coral"));
      return { type: "navigate", to: projectPath(p.slug), lines: [t(`Opening ${p.name}…`, "lime")] };
    },
  },
  {
    name: "skills",
    usage: "skills [group]",
    summary: "Show capabilities by group",
    run: (args) => {
      const q = args.join(" ").toLowerCase();
      const groups = q ? skillGroups.filter((g) => g.title.toLowerCase().includes(q) || g.code === q.padStart(2, "0")) : skillGroups;
      if (!groups.length) return out(t(`skills: no group matching “${q}”.`, "coral"));
      return out(
        ...groups.flatMap((g) => [
          h(`${g.code} ${g.title}`),
          t(
            g.skills.map((s) => (s.tier === "shipped" ? `${s.name}*` : s.name)).join(" · "),
            "default",
          ),
        ]),
        gap,
        t(`* ${tierMeta.shipped.description.toLowerCase()}.`, "muted"),
      );
    },
  },
  {
    name: "current",
    summary: "What I'm working on now",
    run: () =>
      out(
        h("Now"),
        row("Building", "RenoCred — AI credit card intelligence", { href: social.renocred.href }),
        row("Exploring", "Local LLM inference & tool calling", { to: projectPath("local-llm") }),
        row("Working", `${experience.find((e) => e.id === "cnh")?.role ?? ""}`),
        row("Studying", `${person.education.specialization} @ ${person.education.school}`),
      ),
  },
  {
    name: "stack",
    summary: "The stack this site and my products use",
    run: () =>
      out(
        h("This site"),
        t("React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · React Router"),
        h("RenoCred"),
        t(projects[0]?.technologies.join(" · ") ?? ""),
        h("NEXGram"),
        t("Python · FastAPI · SQLAlchemy · Alembic · PostgreSQL · JWT"),
      ),
  },
  {
    name: "contact",
    summary: "Ways to reach me",
    run: () =>
      out(
        row("email", person.email, { href: `mailto:${person.email}` }),
        row("github", social.github.handle, { href: social.github.href }),
        row("linkedin", social.linkedin.handle, { href: social.linkedin.href }),
        row("x", social.x.handle, { href: social.x.href }),
        ...(resumeUrl ? [row("resume", "Download PDF", { href: resumeUrl })] : [t("resume: available on request by email.", "muted")]),
      ),
  },
  {
    name: "clear",
    summary: "Clear the screen",
    run: () => ({ type: "clear" }),
  },
  {
    name: "exit",
    summary: "Collapse the terminal",
    run: () => ({ type: "exit" }),
  },
  // Aliases and small easter eggs — harmless and hidden from help
  { name: "ls", summary: "", hidden: true, run: (a) => commands.find((c) => c.name === "projects")!.run(a) },
  { name: "cd", summary: "", hidden: true, run: (a) => commands.find((c) => c.name === "open")!.run(a) },
  {
    name: "sudo",
    summary: "",
    hidden: true,
    run: () => out(t("Permission denied. This is a portfolio, not a production box. 🙂", "coral")),
  },
  { name: "pwd", summary: "", hidden: true, run: () => out(t("/home/aditya/engineering-lab")) },
  { name: "date", summary: "", hidden: true, run: () => out(t(new Date().toString())) },
];

export const commandNames = commands.map((c) => c.name);

export const MAX_INPUT = 80;

export function runCommand(raw: string): CommandResult {
  const input = raw.trim().slice(0, MAX_INPUT);
  if (!input) return out();
  const [name = "", ...args] = input.split(/\s+/);
  const cmd = commands.find((c) => c.name === name.toLowerCase());
  if (!cmd) return out(t(`command not found: ${name}. Type \`help\` for a list.`, "coral"));
  return cmd.run(args);
}

export function complete(partial: string): string | undefined {
  const p = partial.trimStart().toLowerCase();
  if (!p) return undefined;
  if (p.startsWith("open ")) {
    const q = p.slice(5);
    const m = projects.find((x) => x.slug.startsWith(q));
    return m ? `open ${m.slug}` : undefined;
  }
  const matches = commands.filter((c) => !c.hidden && c.name.startsWith(p));
  return matches.length === 1 ? matches[0]!.name + (matches[0]!.usage ? " " : "") : undefined;
}

export const quickCommands = ["whoami", "projects", "skills", "current", "stack", "contact", "help"] as const;
