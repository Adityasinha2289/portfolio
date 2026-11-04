import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { achievements } from "@/data/achievements";
import { projectBySlug, projectPath } from "@/data/projects";
import type { Achievement } from "@/data/types";
import { SectionHeading } from "@/components/brutalist/SectionHeading";
import { ProvenanceBadge } from "@/components/brutalist/ProvenanceBadge";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ImageLightbox } from "@/components/common/ImageLightbox";

const toneCls: Record<Achievement["tone"], { card: string; muted: string; shadow: string }> = {
  lime: { card: "bg-lime text-ink border-ink", muted: "text-ink/70", shadow: "shadow-[6px_6px_0_var(--ink)]" },
  ink: { card: "theme-dark bg-ink border-ink", muted: "text-muted-dark", shadow: "shadow-[6px_6px_0_var(--lime)]" },
  paper: { card: "bg-ivory text-ink border-ink", muted: "text-muted", shadow: "shadow-[6px_6px_0_var(--ink)]" },
  coral: { card: "bg-coral text-ink border-ink", muted: "text-ink/70", shadow: "shadow-[6px_6px_0_var(--ink)]" },
};

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

export function Achievements() {
  const [viewing, setViewing] = useState<Achievement | null>(null);
  return (
    <section id="milestones" aria-labelledby="milestones-title" className="section-y bg-grid relative border-y-2 border-ink bg-paper">
      <div className="container-x">
        <SectionHeading
          id="milestones-title"
          index="05"
          kicker="Achievements & recognition"
          lines={["Milestones", "that matter."]}
          intro="Every number is labelled with where it comes from."
        />

        <Reveal stagger={0.07} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-12 md:mt-20">
          {achievements.map((a, i) => {
            const t = toneCls[a.tone];
            const project = a.project ? projectBySlug(a.project) : undefined;
            const isWord = !/^\d/.test(a.figure);
            return (
              <RevealItem
                key={a.id}
                as="article"
                className={`relative flex min-h-[260px] flex-col justify-between gap-8 rounded-md border-2 p-6 md:p-8 ${t.card} ${t.shadow} ${spans[i] ?? ""} ${
                  i === 0 ? "md:col-span-2 lg:col-span-7" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className={`meta ${t.muted}`}>M/{String(i + 1).padStart(2, "0")}</p>
                  <ProvenanceBadge value={a.provenance} />
                </div>
                <div className={a.evidence ? "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" : ""}>
                  <div className="min-w-0">
                    <p
                      className={`font-display font-bold leading-[0.82] tracking-[-0.06em] ${
                        isWord ? "text-[clamp(2.75rem,6vw,5rem)] uppercase" : "text-[clamp(4.5rem,11vw,9rem)]"
                      }`}
                    >
                      {a.id === "local-ai" ? (
                        <span className="font-mono text-[0.55em] tracking-[-0.04em]">
                          <span className="text-lime">ROUND_TRIP_</span>OK
                        </span>
                      ) : (
                        a.figure
                      )}
                      {a.figureSub && <span className="ml-1 align-top text-[0.32em] tracking-[-0.02em]">{a.figureSub}</span>}
                    </p>
                    <h3 className="mt-4 font-display text-[1.4rem] font-bold uppercase leading-tight tracking-[-0.02em]">
                      {a.title}
                    </h3>
                    <p className="mt-1 font-medium">{a.context}</p>
                    <p className={`mt-3 max-w-md text-sm ${t.muted}`}>{a.note}</p>
                    {project && (
                      <Link to={projectPath(project.slug)} className="link-draw meta mt-4 inline-flex items-center gap-2">
                        {project.name} case study <ArrowRight aria-hidden className="size-3.5" />
                      </Link>
                    )}
                  </div>
                  {a.evidence && (
                    <button
                      type="button"
                      onClick={() => setViewing(a)}
                      className={`group/ev relative shrink-0 self-start rotate-2 border-2 bg-ivory transition-transform duration-200 hover:rotate-0 hover:-translate-y-1 sm:self-end ${
                        a.evidence.width > a.evidence.height ? "w-44 sm:w-48" : "w-32 sm:w-40"
                      } ${a.tone === "ink" ? "border-ivory shadow-[5px_5px_0_var(--lime)]" : "border-ink shadow-[5px_5px_0_var(--ink)]"}`}
                    >
                      <img
                        src={a.evidence.src}
                        alt=""
                        width={a.evidence.width}
                        height={a.evidence.height}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                      <span className="meta absolute inset-x-0 bottom-0 bg-ink/90 px-2 py-1.5 text-center text-lime">
                        View {a.evidence.kind} <span aria-hidden>↗</span>
                      </span>
                      <span className="sr-only">: {a.title}</span>
                    </button>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
      {viewing?.evidence && (
        <ImageLightbox open onClose={() => setViewing(null)} {...viewing.evidence} />
      )}
    </section>
  );
}
