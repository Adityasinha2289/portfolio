import { useState } from "react";
import { Link } from "react-router";
import { skillGroups, tierMeta } from "@/data/skills";
import { projectBySlug, projectPath } from "@/data/projects";
import type { Skill, SkillTier } from "@/data/types";
import { SectionHeading } from "@/components/brutalist/SectionHeading";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

type Filter = "all" | SkillTier;

const tierMarker: Record<SkillTier, string> = {
  shipped: "bg-lime border-lime",
  built: "bg-transparent border-ivory",
  exploring: "bg-transparent border-coral rounded-full",
};

/* Bento spans for the 8 groups on large screens */
const spans = [
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-5",
  "lg:col-span-7",
];

function Marker({ tier }: { tier?: SkillTier }) {
  if (!tier) return null;
  return <span aria-hidden className={`inline-block size-2.5 shrink-0 border-2 ${tierMarker[tier]}`} />;
}

function SkillChip({ skill, filter }: { skill: Skill; filter: Filter }) {
  const dim = filter !== "all" && skill.tier !== filter;
  const project = skill.projects?.[0] ? projectBySlug(skill.projects[0]) : undefined;
  const cls = `chip transition-[opacity,background-color,color] duration-200 ${
    dim ? "opacity-25" : "opacity-100"
  } ${project ? "hover:bg-lime hover:text-ink hover:border-lime" : ""}`;
  const tierText = skill.tier ? `, ${tierMeta[skill.tier].label.toLowerCase()}` : "";

  const inner = (
    <>
      <Marker tier={skill.tier} />
      {skill.name}
      <span className="sr-only">{tierText}</span>
    </>
  );

  return (
    <li>
      {project ? (
        <Link
          to={projectPath(project.slug)}
          className={cls}
          title={`Used in ${skill.projects!.map((s) => projectBySlug(s)?.name).join(", ")} — open case study`}
        >
          {inner}
          <span className="sr-only"> — see the {project.name} case study</span>
        </Link>
      ) : (
        <span className={cls}>{inner}</span>
      )}
    </li>
  );
}

export function Capabilities() {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...(Object.keys(tierMeta) as SkillTier[]).map((t) => ({ id: t, label: tierMeta[t].label })),
  ];

  return (
    <section id="engineering" aria-labelledby="engineering-title" className="theme-dark section-y bg-grid-dark relative">
      <div className="container-x">
        <SectionHeading
          id="engineering-title"
          index="03"
          kicker="Engineering capabilities"
          lines={["My technical", "arsenal."]}
          intro="Tools, technologies and systems I use to turn ideas into working products."
          dark
        />

        {/* Legend + filter */}
        <Reveal className="mt-14 flex flex-col gap-5 border-y-2 border-ivory/20 py-5 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Evidence legend">
            {(Object.keys(tierMeta) as SkillTier[]).map((t) => (
              <li key={t} className="meta flex items-center gap-2 text-concrete">
                <Marker tier={t} />
                <span className="text-ivory">{tierMeta[t].label}</span>
                <span className="normal-case tracking-normal text-muted-dark">— {tierMeta[t].description}</span>
              </li>
            ))}
          </ul>
          <div role="group" aria-label="Filter skills by evidence" className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`border-2 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  filter === f.id ? "border-lime bg-lime text-ink" : "border-ivory/40 text-ivory hover:border-ivory"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>
        <p className="meta mt-3 normal-case tracking-normal text-muted-dark">
          No proficiency bars — just where each skill has actually been used. Linked items open the project that uses them.
        </p>

        <Reveal stagger={0.05} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {skillGroups.map((g, i) => (
            <RevealItem
              key={g.code}
              as="article"
              className={`flex flex-col gap-5 rounded-md border-2 border-ivory/25 bg-ink p-5 transition-colors duration-200 hover:border-ivory/70 md:p-6 ${spans[i] ?? ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="meta mb-2 text-lime">CAP.{g.code}</p>
                  <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold uppercase leading-none tracking-[-0.035em]">
                    {g.title}
                  </h3>
                </div>
                <span className="meta text-muted-dark">{String(g.skills.length).padStart(2, "0")}</span>
              </div>
              <p className="text-[0.95rem] text-muted-dark">{g.blurb}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 text-ivory">
                {g.skills.map((s) => (
                  <SkillChip key={s.name} skill={s} filter={filter} />
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
