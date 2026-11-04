import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { experience } from "@/data/experience";
import { projectPath } from "@/data/projects";
import { SectionHeading } from "@/components/brutalist/SectionHeading";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ProvenanceBadge } from "@/components/brutalist/ProvenanceBadge";
import { LogoTile } from "@/components/common/LogoTile";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y bg-ivory">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="04"
          kicker="Experience"
          lines={["Built through", "execution."]}
          intro="Founding, building, leading teams and keeping production systems honest."
        />

        <Reveal as="ol" stagger={0.07} className="mt-16 border-t-2 border-ink md:mt-20">
          {experience.map((e, i) => (
            <RevealItem as="li" key={e.id} className="group border-b-2 border-ink">
              <article className="grid gap-4 py-8 transition-colors duration-200 md:grid-cols-12 md:gap-8 md:py-10 md:hover:bg-paper">
                <div className="flex items-start gap-4 md:col-span-3 md:flex-col md:pl-2">
                  {e.logo && <LogoTile logo={e.logo} className="md:mb-2" />}
                  <div className="flex flex-1 flex-wrap items-start justify-between gap-3 md:flex-col md:justify-start">
                    <p className="meta flex items-center gap-2">
                      <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span>{e.period}</span>
                    </p>
                    <span className="meta border-[1.5px] border-ink px-1.5 py-0.5">{e.tag}</span>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1] tracking-[-0.035em]">
                    {e.role}
                  </h3>
                  <p className="mt-2 font-medium">
                    {e.org}
                    {e.orgDetail && <span className="text-muted"> · {e.orgDetail}</span>}
                  </p>
                  {e.recognition && (
                    <p className="mt-4 inline-flex flex-wrap items-center gap-2 bg-lime px-2 py-1 text-sm font-medium">
                      {e.recognition.text} <ProvenanceBadge value={e.recognition.provenance} />
                    </p>
                  )}
                </div>
                <div className="md:col-span-5 md:pr-2">
                  <p className="leading-relaxed">{e.summary}</p>
                  <ul className="mt-4 space-y-1.5 text-[0.95rem] text-muted">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-[2px] w-3 shrink-0 bg-ink" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {e.project && (
                    <Link to={projectPath(e.project)} className="link-draw meta mt-5 inline-flex items-center gap-2">
                      Read the case study <ArrowRight aria-hidden className="size-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
