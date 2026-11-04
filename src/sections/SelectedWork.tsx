import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Code } from "lucide-react";
import { projects, projectPath, moreWork, projectBySlug } from "@/data/projects";
import type { Project, Visual } from "@/data/types";
import { SectionHeading } from "@/components/brutalist/SectionHeading";
import { BrutalButton } from "@/components/brutalist/BrutalButton";
import { ProvenanceBadge } from "@/components/brutalist/ProvenanceBadge";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { DeviceFrame } from "@/components/common/DeviceFrame";
import { ConfusionMatrixView } from "@/components/common/ConfusionMatrixView";
import { TerminalWindow } from "@/components/common/TerminalWindow";
import { LogoTile } from "@/components/common/LogoTile";

/* ───────── shared bits ───────── */

function CardMeta({ project, dark }: { project: Project; dark: boolean }) {
  return (
    <div className={`meta flex flex-wrap items-center justify-between gap-3 ${dark ? "text-muted-dark" : "text-muted"}`}>
      <span className="flex items-center gap-3">
        <span className={`px-1.5 py-0.5 font-semibold ${dark ? "bg-lime text-ink" : "bg-ink text-ivory"}`}>
          P/{project.index}
        </span>
        {project.category.join(" / ")}
      </span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className={`inline-block size-2 ${project.status === "live" ? "bg-lime ring-2 ring-ink" : project.status === "experimental" ? "bg-coral" : dark ? "bg-ivory" : "bg-ink"}`}
        />
        {project.statusLabel}
      </span>
    </div>
  );
}

/** Title doubles as a stretched link so the whole card is a tap target. */
function CardTitle({ project, size = "lg" }: { project: Project; size?: "lg" | "md" }) {
  return (
    <h3
      className={`font-bold uppercase leading-[0.9] tracking-[-0.045em] ${
        size === "lg" ? "text-[clamp(2.6rem,6vw,4.5rem)]" : "text-[clamp(2.1rem,4.2vw,3.25rem)]"
      }`}
    >
      <Link
        to={projectPath(project.slug)}
        className="outline-none after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:underline focus-visible:decoration-4 focus-visible:underline-offset-8"
      >
        {project.title}
      </Link>
    </h3>
  );
}

function StackList({ items, dark }: { items: string[]; dark: boolean }) {
  return (
    <ul aria-label="Technologies" className={`flex flex-wrap gap-1.5 ${dark ? "text-concrete" : "text-ink"}`}>
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

function CardActions({ project, dark }: { project: Project; dark: boolean }) {
  return (
    <div className="relative z-10 flex flex-wrap gap-3">
      <BrutalButton to={projectPath(project.slug)} arrow="right" size="sm" variant={dark ? "primary" : "dark"} onDark={dark}>
        View case study
      </BrutalButton>
      {project.liveUrl && (
        <BrutalButton href={project.liveUrl} arrow="diag" size="sm" variant="secondary" onDark={dark}>
          Live website
        </BrutalButton>
      )}
      {project.githubUrl && (
        <BrutalButton href={project.githubUrl} arrow="diag" size="sm" variant={dark ? "dark" : "secondary"} onDark={dark}>
          GitHub
        </BrutalButton>
      )}
    </div>
  );
}

function Highlight({ project, dark }: { project: Project; dark: boolean }) {
  const h = project.highlight;
  return (
    <div className={`border-t-2 pt-4 ${dark ? "border-ivory/25" : "border-ink"}`}>
      <div className="flex items-center gap-2">
        <p className={`meta ${dark ? "text-muted-dark" : "text-muted"}`}>{h.label}</p>
        <ProvenanceBadge value={h.provenance} />
      </div>
      <p className="mt-1 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em]">{h.value}</p>
      {h.note && <p className={`mt-2 text-sm ${dark ? "text-muted-dark" : "text-muted"}`}>{h.note}</p>}
    </div>
  );
}

const cardBase =
  "group relative flex h-full flex-col rounded-md border-2 transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] motion-safe:hover:-translate-y-1 focus-within:-translate-y-1";

/* ───────── cards ───────── */

function RenoCredCard({ p }: { p: Project }) {
  const mobileShot = p.caseStudy.visuals.find(
    (v): v is Extract<Visual, { kind: "image" }> => v.kind === "image" && v.frame === "mobile",
  );
  return (
    <article
      aria-labelledby={`t-${p.slug}`}
      className={`${cardBase} border-ink bg-paper shadow-[8px_8px_0_var(--ink)] hover:shadow-[4px_4px_0_var(--ink)]`}
    >
      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-12 lg:gap-10 lg:p-10">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <CardMeta project={p} dark={false} />
          <div id={`t-${p.slug}`} className="flex items-center gap-4">
            {p.logo && <LogoTile logo={p.logo} />}
            <CardTitle project={p} />
          </div>
          <p className="text-[1.05rem] leading-relaxed">{p.description}</p>
          <p className="meta">
            <span className="text-muted">Role — </span>
            {p.role}
          </p>
          <StackList items={p.technologies} dark={false} />
          <div className="mt-auto flex flex-col gap-6">
            <Highlight project={p} dark={false} />
            <CardActions project={p} dark={false} />
          </div>
        </div>
        <div className="relative lg:col-span-7 lg:pb-28">
          {p.cover?.kind === "image" && (
            <div className="relative">
              <DeviceFrame visual={p.cover} zoom className="shadow-brutal" />
              <p className="meta mt-4 text-muted lg:max-w-[60%]">↳ {p.cover.caption}</p>
            </div>
          )}
          {mobileShot && (
            <div
              aria-hidden
              className="absolute -right-2 bottom-0 hidden w-[150px] rotate-[-4deg] transition-transform duration-300 ease-[var(--ease-out)] group-hover:rotate-0 lg:block xl:w-[170px]"
            >
              <DeviceFrame visual={mobileShot} />
            </div>
          )}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-3 hidden rotate-3 border-2 border-ink bg-lime px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider shadow-brutal-sm md:block"
          >
            Real product · Live
          </span>
        </div>
      </div>
    </article>
  );
}

function NexgramCard({ p }: { p: Project }) {
  const flow = p.caseStudy.diagrams.find((d) => d.kind === "flow");
  return (
    <article
      aria-labelledby={`t-${p.slug}`}
      className={`${cardBase} theme-dark border-ink bg-ink shadow-[8px_8px_0_var(--lime)] hover:shadow-[4px_4px_0_var(--lime)]`}
    >
      <div className="bg-grid-dark flex h-full flex-col gap-6 p-5 sm:p-7 lg:p-9">
        <CardMeta project={p} dark />
        <div id={`t-${p.slug}`}>
          <CardTitle project={p} size="md" />
        </div>
        <p className="leading-relaxed text-concrete">{p.description}</p>

        {/* Supply-chain workflow illustration */}
        {flow && flow.kind === "flow" && (
          <ol aria-label="Core workflow" className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {flow.steps.map((s, i) => (
              <li
                key={s.label}
                className={`relative border-[1.5px] px-2 py-2 font-mono text-[11px] uppercase leading-tight tracking-wide ${
                  s.accent ? "border-lime bg-lime text-ink" : "border-ivory/40 text-ivory"
                }`}
              >
                <span className={`block text-[9px] ${s.accent ? "text-ink/70" : "text-muted-dark"}`}>0{i + 1}</span>
                {s.label}
              </li>
            ))}
            <li className="flex items-center justify-center border-[1.5px] border-dashed border-ivory/40 px-2 py-2 font-mono text-[11px] uppercase text-muted-dark">
              ↻ loop
            </li>
          </ol>
        )}

        <p className="meta text-concrete">
          <span className="text-muted-dark">Role — </span>
          {p.role}
        </p>
        <StackList items={p.technologies.slice(0, 7)} dark />
        <div className="mt-auto flex flex-col gap-6">
          <Highlight project={p} dark />
          <CardActions project={p} dark />
        </div>
      </div>
    </article>
  );
}

function LocalLlmCard({ p }: { p: Project }) {
  const term = p.caseStudy.visuals.find((v) => v.kind === "terminal");
  return (
    <article
      aria-labelledby={`t-${p.slug}`}
      className={`${cardBase} theme-dark border-ink bg-[#0b0b0b] shadow-[8px_8px_0_var(--ink)] hover:shadow-[4px_4px_0_var(--ink)]`}
    >
      <div className="flex h-full flex-col gap-6 p-5 sm:p-7 lg:p-9">
        <CardMeta project={p} dark />
        <div id={`t-${p.slug}`} className="text-lime">
          <CardTitle project={p} size="md" />
        </div>
        <p className="leading-relaxed text-concrete">{p.description}</p>
        {term && term.kind === "terminal" && <TerminalWindow title="~/local-llm — zsh" lines={term.lines.slice(-3)} />}
        <dl className="grid grid-cols-2 gap-px border-[1.5px] border-ivory/30 bg-ivory/30 font-mono text-[11px] uppercase">
          {[
            ["Machine", "MacBook Air M4"],
            ["Memory", "16GB unified"],
            ["Model", "Qwen 3.5 9B · MLX"],
            ["Endpoint", "localhost:1234"],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#0b0b0b] p-2.5">
              <dt className="text-muted-dark">{k}</dt>
              <dd className="mt-0.5 text-ivory">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto">
          <CardActions project={p} dark />
        </div>
      </div>
    </article>
  );
}

function HateSpeechCard({ p }: { p: Project }) {
  const cm = p.caseStudy.confusionMatrix;
  return (
    <article
      aria-labelledby={`t-${p.slug}`}
      className={`${cardBase} border-ink bg-ivory shadow-[8px_8px_0_var(--ink)] hover:shadow-[4px_4px_0_var(--ink)]`}
    >
      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-12 lg:gap-10 lg:p-10">
        <div className="order-2 lg:order-1 lg:col-span-6">
          {p.cover?.kind === "image" && <DeviceFrame visual={p.cover} zoom className="shadow-brutal" />}
          {cm && (
            <div className="mt-8 max-w-md">
              <p className="meta mb-3 flex items-center gap-2">
                Confusion matrix <ProvenanceBadge value="measured" />
              </p>
              <ConfusionMatrixView matrix={cm} compact />
            </div>
          )}
        </div>
        <div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-6">
          <CardMeta project={p} dark={false} />
          <div id={`t-${p.slug}`}>
            <CardTitle project={p} size="md" />
          </div>
          <p className="text-[1.05rem] leading-relaxed">{p.description}</p>
          <p className="text-muted">
            88.7% accuracy hides the real story: the rarest class — hate speech — scores an F1 of 0.44. The case study
            walks through why.
          </p>
          <StackList items={p.technologies} dark={false} />
          <div className="mt-auto flex flex-col gap-6">
            <Highlight project={p} dark={false} />
            <CardActions project={p} dark={false} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ───────── section ───────── */

export function SelectedWork() {
  const [reno, nex, llm, hs] = (["renocred", "nexgram", "local-llm", "hate-speech-detection"] as const).map(
    (s) => projectBySlug(s)!,
  );
  if (!reno || !nex || !llm || !hs || projects.length < 4) return null;

  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative bg-ivory">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="02"
          kicker="Selected work · 2025 — 2026"
          lines={["Selected", "Projects."]}
          intro="A collection of products, systems and experiments built around real-world problems."
        />

        <div className="mt-16 grid gap-10 md:mt-24 md:gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-12">
            <RenoCredCard p={reno} />
          </Reveal>
          <Reveal className="lg:col-span-7">
            <NexgramCard p={nex} />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <LocalLlmCard p={llm} />
          </Reveal>
          <Reveal className="lg:col-span-12">
            <HateSpeechCard p={hs} />
          </Reveal>
        </div>

        {/* Smaller builds */}
        <div className="mt-24">
          <Reveal>
            <h3 className="meta mb-6 flex items-center gap-3 text-muted">
              <span aria-hidden className="h-px w-10 bg-muted" /> Also built
            </h3>
          </Reveal>
          <Reveal as="ul" stagger={0.06} className="border-t-2 border-ink">
            {moreWork.map((w) => (
              <RevealItem as="li" key={w.name} className="border-b-2 border-ink">
                <div className="group grid gap-3 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                  <p className="font-display text-2xl font-bold uppercase tracking-[-0.03em] md:col-span-3">{w.name}</p>
                  <p className="meta text-muted md:col-span-2">{w.kind}</p>
                  <p className="text-muted md:col-span-4">
                    {w.description}
                    <span className="mt-1 block font-mono text-xs text-ink">{w.stack}</span>
                  </p>
                  <div className="flex gap-4 md:col-span-3 md:justify-end">
                    <a href={w.githubUrl} target="_blank" rel="noopener noreferrer" className="link-draw meta inline-flex items-center gap-1.5">
                      <Code aria-hidden className="size-3.5" /> Code <ArrowUpRight aria-hidden className="size-3.5" />
                      <span className="sr-only">for {w.name} on GitHub (opens in a new tab)</span>
                    </a>
                    {w.liveUrl && (
                      <a href={w.liveUrl} target="_blank" rel="noopener noreferrer" className="link-draw meta inline-flex items-center gap-1.5">
                        Live <ArrowRight aria-hidden className="size-3.5 -rotate-45" />
                        <span className="sr-only">{w.name} (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
