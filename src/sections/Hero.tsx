import { useRef, type PointerEvent } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { BrutalButton } from "@/components/brutalist/BrutalButton";
import { person } from "@/data/site";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useFinePointer } from "@/hooks/useMediaQuery";
import portrait640 from "@/assets/aditya-sinha-640.webp";
import portrait1080 from "@/assets/aditya-sinha-1080.webp";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const line: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.7, ease } },
};
/* Slide-only (no opacity) for LCP candidates — intro paragraph and portrait — so they paint immediately */
const slide: Variants = {
  hidden: { y: 10 },
  show: { y: 0, transition: { duration: 0.55, ease } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const headline = ["I build", "things that", "matter."];
const pillars = ["Building software.", "Exploring intelligence.", "Creating products."];
const facts = [
  { k: "Based in", v: "India" },
  { k: "Degree", v: "B.Tech CSE — Data Science" },
  { k: "University", v: person.education.school },
  { k: "Graduating", v: "2028" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const goTo = useScrollToSection();
  const coordRef = useRef<HTMLSpanElement>(null);

  // Live pointer coordinates, written straight to the DOM (no re-renders)
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || !coordRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - r.left);
    const y = Math.round(e.clientY - r.top);
    coordRef.current.textContent = `X ${String(x).padStart(4, "0")} · Y ${String(y).padStart(4, "0")}`;
  };

  const initial = reduce ? false : "hidden";
  const jump = (id: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    goTo(id);
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-grid relative overflow-hidden border-b-2 border-ink"
      onPointerMove={onPointerMove}
    >
      <m.div
        className="container-x relative pb-10 pt-8 md:pb-14 md:pt-10"
        variants={container}
        initial={initial}
        animate="show"
      >
        {/* Technical header strip */}
        <m.div
          variants={fade}
          className="meta mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-muted md:mb-14"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden className="inline-block size-2 bg-coral" />
            Portfolio — Index 001
          </span>
          <span className="hidden sm:inline">{person.coordinates}</span>
          <span ref={coordRef} aria-hidden className="hidden tabular-nums lg:inline">
            X 0000 · Y 0000
          </span>
          <span>Status: building RenoCred</span>
        </m.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <m.p variants={fade} className="meta mb-6 flex flex-wrap gap-x-2 text-ink">
              {person.roles.map((r, i) => (
                <span key={r} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="text-muted">/</span>}
                  {r}
                </span>
              ))}
            </m.p>

            <h1
              id="hero-title"
              className="font-bold uppercase leading-[0.86] tracking-[-0.04em] text-[clamp(2.6rem,12.4vw,8rem)] lg:text-[clamp(5rem,8.6vw,8rem)]"
            >
              <span className="sr-only">Aditya Sinha — </span>
              {headline.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]">
                  <m.span variants={line} className="relative inline-block">
                    {i === headline.length - 1 ? (
                      <>
                        <span aria-hidden className="absolute inset-x-[-0.08em] bottom-[0.02em] top-[0.12em] bg-lime" />
                        <span className="relative">{l}</span>
                      </>
                    ) : (
                      l
                    )}
                  </m.span>
                </span>
              ))}
            </h1>

            <m.p variants={slide} className="mt-8 max-w-[38rem] text-[1.08rem] leading-relaxed text-ink md:text-[1.18rem]">
              I'm <strong className="font-semibold">Aditya Sinha</strong> — a software engineer and founder building
              intelligent digital products at the intersection of AI, fintech, data and full-stack engineering.
            </m.p>

            <m.div variants={fade} className="mt-9 flex flex-wrap gap-4">
              <BrutalButton href="/#work" onClick={jump("work")} arrow="right" magnetic>
                Explore my work
              </BrutalButton>
              <BrutalButton href="/#contact" onClick={jump("contact")} variant="secondary" arrow="diag" magnetic>
                Let's connect
              </BrutalButton>
            </m.div>
          </div>

          {/* Lime accent panel */}
          <m.aside
            variants={slide}
            aria-label="What I do"
            className="relative lg:col-span-4 lg:mt-2"
          >
            <div className="card-brutal bg-grid-lime relative bg-lime p-5 sm:p-6">
              <div className="meta mb-4 flex justify-between">
                <span>Fig. 01</span>
                <span>{person.name}</span>
              </div>
              <figure className="relative">
                <div className="overflow-hidden border-2 border-ink bg-concrete">
                  <img
                    src={portrait640}
                    srcSet={`${portrait640} 640w, ${portrait1080} 1080w`}
                    sizes="(min-width: 1024px) 380px, 92vw"
                    alt="Aditya Sinha in a navy blazer and black shirt."
                    width={1080}
                    height={987}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="block aspect-[4/4.2] h-auto w-full object-cover object-[50%_25%]"
                  />
                </div>
                {/* blueprint corner marks */}
                {["-left-1.5 -top-1.5 border-l-2 border-t-2", "-right-1.5 -top-1.5 border-r-2 border-t-2", "-bottom-1.5 -left-1.5 border-b-2 border-l-2", "-bottom-1.5 -right-1.5 border-b-2 border-r-2"].map((c) => (
                  <span key={c} aria-hidden className={`absolute size-4 border-ink ${c}`} />
                ))}
                <figcaption className="meta absolute bottom-0 left-0 bg-ink px-2 py-1 text-lime">
                  Founder, RenoCred
                </figcaption>
              </figure>
              <ol className="mt-5 border-t-2 border-ink">
                {pillars.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/30 py-2.5 font-display text-[1.05rem] font-bold uppercase tracking-[-0.02em] last:border-b-0"
                  >
                    {p}
                    <span className="font-mono text-[11px] font-medium">0{i + 1}</span>
                  </li>
                ))}
              </ol>
            </div>
            {/* corner annotation */}
            <span aria-hidden className="meta absolute -left-2 -top-6 hidden text-muted lg:block">
              ┌ 4 col
            </span>
          </m.aside>
        </div>

        {/* Metadata strip */}
        <m.dl
          variants={fade}
          className="mt-14 grid grid-cols-2 border-2 border-ink bg-ivory md:mt-20 md:grid-cols-4"
        >
          {facts.map((f, i) => (
            <div
              key={f.k}
              className={`p-4 md:p-5 ${i % 2 === 0 ? "border-r-2" : ""} ${
                i < 2 ? "border-b-2 md:border-b-0" : ""
              } border-ink md:border-r-2 md:last:border-r-0`}
            >
              <dt className="meta mb-1.5 text-muted">{f.k}</dt>
              <dd className="font-display text-[0.98rem] font-semibold leading-tight tracking-[-0.01em] md:text-[1.1rem]">
                {f.v}
              </dd>
            </div>
          ))}
        </m.dl>

        {/* Scroll indicator */}
        <m.button
          variants={fade}
          type="button"
          onClick={() => goTo("work")}
          className="meta group mt-8 flex items-center gap-3 text-muted hover:text-ink"
        >
          <span className="relative block h-9 w-[2px] overflow-hidden bg-ink/15" aria-hidden>
            <span className="absolute inset-x-0 top-0 block h-1/3 bg-ink motion-safe:animate-[scroll-cue_1.8s_var(--ease-out)_infinite]" />
          </span>
          Scroll to selected work
        </m.button>
      </m.div>
    </section>
  );
}
