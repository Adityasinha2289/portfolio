import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/brutalist/SectionHeading";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { EngineeringTerminal } from "@/components/terminal/EngineeringTerminal";
import { projectPath } from "@/data/projects";
import type { ProjectSlug } from "@/data/types";

const experiments: { code: string; title: string; body: string; status: string; to?: ProjectSlug }[] = [
  {
    code: "EXP.01",
    title: "Local LLM infrastructure",
    body: "Qwen 3.5 9B on MLX, served by LM Studio through an OpenAI-compatible API, with a validated tool-calling round trip.",
    status: "Validated",
    to: "local-llm",
  },
  {
    code: "EXP.02",
    title: "NLP & classification",
    body: "Text preprocessing, TF-IDF features and what class imbalance does to the metrics that matter.",
    status: "Reproduced",
    to: "hate-speech-detection",
  },
  {
    code: "EXP.03",
    title: "Hadoop & MapReduce",
    body: "HDFS, YARN, MapReduce and Apache Pig — how processing changes when data no longer fits on one machine.",
    status: "Studying",
  },
  {
    code: "EXP.04",
    title: "Web data extraction",
    body: "ExtractFlow: a config-driven pipeline for crawling, rendering, extracting and validating data — the groundwork behind RenoCred's card data.",
    status: "Built",
  },
  {
    code: "EXP.05",
    title: "Explainable backends",
    body: "Engines that calculate, explanations that describe — and a guardrail that rejects any figure the evidence can't support.",
    status: "Built",
    to: "nexgram",
  },
  {
    code: "EXP.06",
    title: "Agentic development",
    body: "Building with Cursor, Claude and Gemini as collaborators — shifting effort toward architecture, review and verification.",
    status: "Daily",
  },
];

export function EngineeringLab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="theme-dark section-y relative overflow-hidden bg-ink">
      <div className="container-x">
        <SectionHeading
          id="lab-title"
          index="06"
          kicker="Engineering lab"
          lines={["Beyond the", "production code."]}
          intro="Where curiosity gets a terminal. Experiments, explorations and the systems I take apart to understand."
          dark
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10 md:mt-20">
          <Reveal as="ul" stagger={0.06} className="grid gap-px self-start border-2 border-ivory/20 bg-ivory/20 sm:grid-cols-2 lg:col-span-6">
            {experiments.map((x) => (
              <RevealItem as="li" key={x.code} className="flex flex-col gap-3 bg-ink p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="meta text-lime">{x.code}</span>
                  <span className="meta border border-ivory/30 px-1.5 py-0.5 text-muted-dark">{x.status}</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-[-0.02em]">{x.title}</h3>
                <p className="text-[0.92rem] leading-relaxed text-muted-dark">{x.body}</p>
                {x.to && (
                  <Link to={projectPath(x.to)} className="link-draw meta mt-auto inline-flex items-center gap-2 self-start text-ivory">
                    Case study <ArrowRight aria-hidden className="size-3.5" />
                  </Link>
                )}
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="lg:sticky lg:top-24 lg:col-span-6 lg:self-start" delay={0.1}>
            <p className="meta mb-4 flex items-center gap-3 text-muted-dark">
              <span aria-hidden className="inline-block size-2 bg-lime" /> Interactive · try <code className="text-ivory">open 03</code>
            </p>
            <EngineeringTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
