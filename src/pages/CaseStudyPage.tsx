import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, projectBySlug, projectPath } from "@/data/projects";
import { caseStudyMeta } from "@/data/site";
import type { Project, Visual } from "@/data/types";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { NotFound } from "./NotFound";
import { BrutalButton } from "@/components/brutalist/BrutalButton";
import { ProvenanceBadge } from "@/components/brutalist/ProvenanceBadge";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { DeviceFrame } from "@/components/common/DeviceFrame";
import { TerminalWindow } from "@/components/common/TerminalWindow";
import { ConfusionMatrixView } from "@/components/common/ConfusionMatrixView";
import { LayerDiagram, FlowDiagram } from "@/components/case-study/Diagrams";
import { LogoTile } from "@/components/common/LogoTile";

/* ───────── theme per project ───────── */

const heroTheme: Record<Project["theme"], { section: string; dark: boolean }> = {
  light: { section: "bg-grid bg-ivory", dark: false },
  paper: { section: "bg-grid bg-paper", dark: false },
  dark: { section: "theme-dark bg-grid-dark bg-ink", dark: true },
  terminal: { section: "theme-dark bg-grid-dark bg-[#0b0b0b]", dark: true },
};

/* ───────── building blocks ───────── */

interface TocItem {
  id: string;
  label: string;
}

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-t-2 border-ink py-14 md:py-20">
      <Reveal>
        <p className="meta mb-4 text-muted">{String(n).padStart(2, "0")} —</p>
        <h2 id={`${id}-h`} className="mb-8 font-bold uppercase leading-[0.92] tracking-[-0.045em] text-[clamp(2rem,4.6vw,3.5rem)]">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="max-w-[44rem] text-[1.1rem] leading-[1.75] md:text-[1.18rem]">{children}</p>
    </Reveal>
  );
}

function VisualBlock({ visual, project }: { visual: Visual; project: Project }) {
  if (visual.kind === "image") {
    return (
      <figure className={visual.frame === "mobile" ? "flex flex-col items-center" : ""}>
        <DeviceFrame visual={visual} className={visual.frame === "mobile" ? "" : "shadow-brutal"} />
        <figcaption className="meta mt-4 normal-case tracking-normal text-muted">{visual.caption}</figcaption>
      </figure>
    );
  }
  if (visual.kind === "terminal") {
    return (
      <figure>
        <TerminalWindow title={visual.title} lines={visual.lines} className="shadow-[6px_6px_0_var(--ink)]" />
        <figcaption className="meta mt-4 normal-case tracking-normal text-muted">{visual.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="bg-hatch flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-ink p-8 text-center">
      <span className="meta bg-ivory px-2 py-1">Placeholder · {visual.label}</span>
      <figcaption className="max-w-md bg-ivory px-2 text-sm text-muted">
        {visual.caption}
        {project.githubUrl && (
          <>
            {" "}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-ink">
              Browse the repository ↗
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}

function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study contents" className="sticky top-24">
      <p className="meta mb-4 text-muted">Contents</p>
      <ol className="space-y-0.5 border-l-2 border-ink/15">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={`-ml-[2px] flex gap-3 border-l-2 py-1.5 pl-4 text-[0.92rem] transition-colors ${
                active === it.id ? "border-ink font-semibold text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <span className="font-mono text-[11px] leading-[1.6]">{String(i + 1).padStart(2, "0")}</span>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ───────── page ───────── */

export function CaseStudyPage() {
  const { slug = "" } = useParams();
  const project = projectBySlug(slug);
  const meta = caseStudyMeta.find((m) => m.path === `/work/${slug}`);
  useDocumentMeta(
    meta ?? { title: "Not found | Aditya Sinha", description: "This page doesn't exist.", path: `/work/${slug}` },
  );

  if (!project) return <NotFound />;

  const cs = project.caseStudy;
  const theme = heroTheme[project.theme];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length]!;
  const next = projects[(idx + 1) % projects.length]!;

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "why", label: "Why I built it" },
    { id: "role", label: "My role" },
    { id: "stack", label: "Technical stack" },
    { id: "architecture", label: "Architecture" },
    { id: "features", label: "Main features" },
    { id: "challenges", label: "Engineering challenges" },
    { id: "decisions", label: "Technical decisions" },
    { id: "visuals", label: "Screens & demos" },
    { id: "results", label: "Results" },
    ...(cs.limitations ? [{ id: "limitations", label: "Known limitations" }] : []),
    { id: "links", label: "Code & deployment" },
  ];
  let n = 0;
  const num = () => ++n;

  return (
    <article aria-labelledby="cs-title">
      {/* ── Hero ── */}
      <header className={`${theme.section} border-b-2 border-ink`}>
        <div className="container-x pb-14 pt-8 md:pb-20 md:pt-10">
          <nav aria-label="Breadcrumb" className="meta mb-12 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/#work"
              className={`link-draw inline-flex items-center gap-2 ${theme.dark ? "text-concrete hover:text-ivory" : "text-muted hover:text-ink"}`}
            >
              <ArrowLeft aria-hidden className="size-3.5" /> All work
            </Link>
            <span className={theme.dark ? "text-muted-dark" : "text-muted"}>
              Case study · P/{project.index} of {String(projects.length).padStart(2, "0")}
            </span>
          </nav>

          <Reveal>
            {project.logo && <LogoTile logo={project.logo} size="lg" className="mb-6" />}
            <p className={`meta mb-6 ${theme.dark ? "text-lime" : "text-ink"}`}>{project.category.join(" / ")}</p>
            <h1
              id="cs-title"
              className={`max-w-[14ch] font-bold uppercase leading-[0.86] tracking-[-0.04em] text-[clamp(2.75rem,10vw,8rem)] ${
                project.theme === "terminal" ? "text-lime" : ""
              }`}
            >
              {project.title}
            </h1>
            <p className={`mt-8 max-w-[42rem] text-[1.15rem] leading-relaxed md:text-[1.3rem] ${theme.dark ? "text-concrete" : ""}`}>
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl
              className={`mt-12 grid grid-cols-1 border-2 sm:grid-cols-2 lg:grid-cols-4 ${
                theme.dark ? "border-ivory/40" : "border-ink bg-ivory"
              }`}
            >
              {[
                { k: "Role", v: project.role },
                { k: "Status", v: project.statusLabel },
                { k: "Core stack", v: project.technologies.slice(0, 4).join(" · ") },
                { k: project.highlight.label, v: project.highlight.value, p: project.highlight.provenance },
              ].map((f, i) => (
                <div
                  key={f.k}
                  className={`p-4 md:p-5 ${theme.dark ? "border-ivory/40" : "border-ink"} ${
                    i < 3 ? "border-b-2 lg:border-b-0 lg:border-r-2" : ""
                  } ${i === 1 ? "sm:border-l-2 lg:border-l-0" : ""} ${i === 2 ? "sm:border-b-0" : ""} ${i === 3 ? "sm:border-l-2 lg:border-l-0" : ""}`}
                >
                  <dt className={`meta mb-1.5 flex items-center gap-2 ${theme.dark ? "text-muted-dark" : "text-muted"}`}>
                    {f.k} {f.p && <ProvenanceBadge value={f.p} />}
                  </dt>
                  <dd className="font-display text-[1.05rem] font-semibold leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.liveUrl && (
              <BrutalButton href={project.liveUrl} arrow="diag" onDark={theme.dark} magnetic>
                Visit live site
              </BrutalButton>
            )}
            {project.githubUrl && (
              <BrutalButton href={project.githubUrl} arrow="diag" variant={theme.dark ? "dark" : "secondary"} onDark={theme.dark} magnetic>
                View on GitHub
              </BrutalButton>
            )}
            <BrutalButton href="#overview" variant={theme.dark ? "dark" : "secondary"} onDark={theme.dark} arrow="right">
              Read the case study
            </BrutalButton>
          </div>
        </div>
      </header>

      {project.cover?.kind === "image" && (
        <div className="border-b-2 border-ink bg-concrete">
          <div className="container-x py-10 md:py-16">
            <Reveal>
              <DeviceFrame visual={project.cover} eager className="shadow-[8px_8px_0_var(--ink)]" />
            </Reveal>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="bg-ivory">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <aside className="hidden pt-20 lg:col-span-3 lg:block">
            <Toc items={toc} />
          </aside>

          <div className="min-w-0 lg:col-span-9">
            <Block id="overview" n={num()} title="Overview">
              <Prose>{cs.overview}</Prose>
            </Block>

            <Block id="problem" n={num()} title="The problem">
              <Prose>{cs.problem}</Prose>
            </Block>

            <Block id="why" n={num()} title="Why I built it">
              <Prose>{cs.why}</Prose>
            </Block>

            <Block id="role" n={num()} title="My role">
              <Reveal>
                <p className="mb-6 inline-block bg-lime px-2 py-1 font-display text-xl font-bold tracking-[-0.02em]">{cs.roleSummary}</p>
              </Reveal>
              <Reveal as="ul" stagger={0.04} className="grid gap-x-8 md:grid-cols-2">
                {cs.responsibilities.map((r, i) => (
                  <RevealItem as="li" key={r} className="flex gap-4 border-b border-ink/20 py-3">
                    <span className="font-mono text-xs leading-[1.9] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span>{r}</span>
                  </RevealItem>
                ))}
              </Reveal>
            </Block>

            <Block id="stack" n={num()} title="Technical stack">
              <Reveal as="dl" stagger={0.05} className="border-t-2 border-ink">
                {cs.stackGroups.map((g) => (
                  <RevealItem key={g.label} className="grid gap-3 border-b-2 border-ink py-4 sm:grid-cols-[11rem_1fr] sm:items-center">
                    <dt className="meta text-muted">{g.label}</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-1.5">
                        {g.items.map((it) => (
                          <li key={it} className="chip bg-paper">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </RevealItem>
                ))}
              </Reveal>
            </Block>

            <Block id="architecture" n={num()} title="Architecture">
              <div className="space-y-10">
                {cs.diagrams.map((d) =>
                  d.kind === "layers" ? (
                    <LayerDiagram key={d.title} diagram={d} />
                  ) : (
                    <FlowDiagram key={d.title} diagram={d} dark={project.theme === "terminal"} />
                  ),
                )}
              </div>
            </Block>

            <Block id="features" n={num()} title="Main features">
              <Reveal stagger={0.05} className="grid gap-4 sm:grid-cols-2">
                {cs.features.map((f, i) => (
                  <RevealItem key={f.title} as="article" className="card-brutal flex flex-col gap-2 bg-paper p-5">
                    <span className="meta text-muted">F.{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em]">{f.title}</h3>
                    <p className="text-muted">{f.body}</p>
                  </RevealItem>
                ))}
              </Reveal>
            </Block>

            <Block id="challenges" n={num()} title="Engineering challenges">
              <Reveal as="ol" stagger={0.06} className="space-y-4">
                {cs.challenges.map((c, i) => (
                  <RevealItem as="li" key={c.title} className="theme-dark grid gap-3 rounded-md border-2 border-ink bg-ink p-5 sm:grid-cols-[4rem_1fr] md:p-6">
                    <span className="font-mono text-3xl font-semibold leading-none text-lime">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em]">{c.title}</h3>
                      <p className="mt-2 text-concrete">{c.body}</p>
                    </div>
                  </RevealItem>
                ))}
              </Reveal>
            </Block>

            <Block id="decisions" n={num()} title="Technical decisions">
              <Reveal as="dl" stagger={0.05} className="border-t-2 border-ink">
                {cs.decisions.map((d) => (
                  <RevealItem key={d.decision} className="grid gap-2 border-b-2 border-ink py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
                    <dt className="font-display text-lg font-bold leading-snug tracking-[-0.015em]">
                      <span aria-hidden className="mr-2 text-coral">◆</span>
                      {d.decision}
                    </dt>
                    <dd className="text-muted">{d.why}</dd>
                  </RevealItem>
                ))}
              </Reveal>
            </Block>

            <Block id="visuals" n={num()} title="Screens & demos">
              <div
                className={`grid gap-10 ${
                  cs.visuals.some((v) => v.kind === "image" && v.frame === "mobile") ? "md:grid-cols-[minmax(0,1fr)_240px] md:items-start" : ""
                }`}
              >
                {cs.visuals.map((v, i) => (
                  <Reveal key={i}>
                    <VisualBlock visual={v} project={project} />
                  </Reveal>
                ))}
              </div>
            </Block>

            <Block id="results" n={num()} title="Results">
              <Reveal stagger={0.05} className="grid border-l-2 border-t-2 border-ink sm:grid-cols-2 xl:grid-cols-3">
                {cs.results.map((m) => (
                  <RevealItem key={m.label} className="flex flex-col gap-2 border-b-2 border-r-2 border-ink bg-paper p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="meta text-muted">{m.label}</span>
                      <ProvenanceBadge value={m.provenance} />
                    </div>
                    <span className="font-display text-[clamp(2rem,4vw,2.9rem)] font-bold leading-none tracking-[-0.045em]">
                      {m.value}
                    </span>
                    {m.note && <span className="text-sm text-muted">{m.note}</span>}
                  </RevealItem>
                ))}
              </Reveal>
              {cs.confusionMatrix && (
                <Reveal className="mt-10 max-w-2xl">
                  <h3 className="meta mb-4 flex items-center gap-2">
                    Confusion matrix <ProvenanceBadge value="measured" />
                  </h3>
                  <ConfusionMatrixView matrix={cs.confusionMatrix} />
                </Reveal>
              )}
              {cs.resultsNote && (
                <Reveal>
                  <p className="mt-8 max-w-[44rem] border-l-4 border-lime bg-paper py-3 pl-4 pr-3 text-[0.95rem] text-muted">
                    <span className="meta mr-2 text-ink">Note</span>
                    {cs.resultsNote}
                  </p>
                </Reveal>
              )}
            </Block>

            {cs.limitations && (
              <Block id="limitations" n={num()} title="Known limitations">
                <Reveal as="ul" stagger={0.04} className="max-w-[44rem] space-y-3">
                  {cs.limitations.map((l) => (
                    <RevealItem as="li" key={l} className="flex gap-3">
                      <span aria-hidden className="mt-[0.55em] size-2 shrink-0 bg-coral" />
                      <span>{l}</span>
                    </RevealItem>
                  ))}
                </Reveal>
              </Block>
            )}

            <Block id="links" n={num()} title="Code & deployment">
              <Reveal className="grid gap-4 sm:grid-cols-2">
                <LinkCard label="Repository" href={project.githubUrl} empty="No public repository yet." />
                <LinkCard label="Live deployment" href={project.liveUrl} empty="No public deployment — runs locally." />
                {project.extraLinks?.map((l) => <LinkCard key={l.href} label={l.label} href={l.href} />)}
              </Reveal>
            </Block>
          </div>
        </div>
      </div>

      {/* ── Prev / next ── */}
      <nav aria-label="More case studies" className="grid border-t-2 border-ink md:grid-cols-2">
        {[
          { p: prev, dir: "Previous", Icon: ArrowLeft },
          { p: next, dir: "Next", Icon: ArrowRight },
        ].map(({ p, dir, Icon }, i) => (
          <Link
            key={dir}
            to={projectPath(p.slug)}
            className={`group flex flex-col gap-4 p-8 transition-colors duration-200 md:p-12 ${
              i === 0 ? "bg-ivory hover:bg-lime md:border-r-2 md:border-ink" : "theme-dark border-t-2 border-ink bg-ink hover:bg-[#1c1c1c] md:border-t-0"
            }`}
          >
            <span className={`meta flex items-center gap-2 ${i === 1 ? "justify-end text-muted-dark" : "text-muted"}`}>
              {i === 0 && <Icon aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-1" />}
              {dir} project · P/{p.index}
              {i === 1 && <Icon aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />}
            </span>
            <span
              className={`font-display text-[clamp(2rem,5vw,3.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em] ${
                i === 1 ? "text-right text-lime" : ""
              }`}
            >
              {p.name}
            </span>
          </Link>
        ))}
      </nav>
    </article>
  );
}

function LinkCard({ label, href, empty }: { label: string; href?: string; empty?: string }) {
  if (!href) {
    return (
      <div className="flex flex-col gap-2 rounded-md border-2 border-dashed border-ink/50 p-5">
        <span className="meta text-muted">{label}</span>
        <span className="text-muted">{empty}</span>
      </div>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-brutal group flex flex-col gap-2 bg-paper p-5 transition-[transform,box-shadow] duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--ink)]"
    >
      <span className="meta text-muted">{label}</span>
      <span className="break-all font-display text-lg font-bold tracking-[-0.015em]">
        {href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
