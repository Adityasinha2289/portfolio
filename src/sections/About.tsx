import { useState } from "react";
import portrait640 from "@/assets/aditya-sinha-640.webp";
import portrait1080 from "@/assets/aditya-sinha-1080.webp";
import { person } from "@/data/site";
import { certifications } from "@/data/experience";
import { SectionHeading } from "@/components/brutalist/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LogoTile } from "@/components/common/LogoTile";
import { logos } from "@/data/logos";
import type { Certification, Logo } from "@/data/types";
import { ImageLightbox } from "@/components/common/ImageLightbox";

const facts: { k: string; v: string; logo?: Logo }[] = [
  { k: "University", v: person.education.school, logo: logos.bennett },
  { k: "Degree", v: "B.Tech, Computer Science & Engineering" },
  { k: "Specialization", v: person.education.specialization },
  { k: "Graduating", v: person.education.graduation },
  { k: "Founder", v: "RenoCred", logo: logos.renocred },
  { k: "Interests", v: "Full-stack · AI engineering · Product · Entrepreneurship" },
];

export function About() {
  const [viewing, setViewing] = useState<Certification | null>(null);
  const featured = certifications.filter((c) => c.evidence);
  const others = certifications.filter((c) => !c.evidence);
  return (
    <section id="about" aria-labelledby="about-title" className="section-y bg-ivory">
      <div className="container-x">
        <SectionHeading id="about-title" index="07" kicker="About" lines={["The person", "behind the code."]} />

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <figure className="relative mx-auto max-w-sm lg:mx-0">
              <div className="card-brutal overflow-hidden bg-concrete">
                <img
                  src={portrait640}
                  srcSet={`${portrait640} 640w, ${portrait1080} 1080w`}
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 92vw"
                  alt="Portrait of Aditya Sinha in a navy blazer and black shirt, standing outdoors."
                  width={1080}
                  height={987}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full grayscale-[15%]"
                />
              </div>
              <figcaption className="meta mt-4 flex justify-between text-muted">
                <span>Aditya Sinha</span>
                <span>{person.location}</span>
              </figcaption>
              <span aria-hidden className="absolute -right-3 -top-3 size-6 border-2 border-ink bg-lime" />
            </figure>
          </Reveal>

          <div className="lg:col-span-8 lg:pl-6">
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,2.8vw,2.3rem)] font-medium leading-[1.2] tracking-[-0.025em]">
                I'm a Computer Science student specializing in Data Science, interested in the intersection of software
                engineering, <span className="bg-lime px-1">artificial intelligence</span> and entrepreneurship.
              </p>
            </Reveal>
            <Reveal className="mt-8 grid gap-6 text-[1.05rem] leading-relaxed text-muted md:grid-cols-2" delay={0.08}>
              <p>
                My approach to learning has always been practical: identify a problem, explore the technology, build a
                solution and learn from what breaks.
              </p>
              <p>
                From developing fintech products to experimenting with local language models, I enjoy understanding how
                systems work beneath the interface. I'm particularly interested in building products that combine
                technical depth with meaningful real-world utility.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="mt-12 grid border-t-2 border-ink sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.k} className="flex flex-col gap-1 border-b-2 border-ink py-4 sm:odd:pr-6 sm:even:border-l-2 sm:even:pl-6">
                    <dt className="meta text-muted">{f.k}</dt>
                    <dd className="flex items-center gap-3 font-medium">
                      {f.logo && <LogoTile logo={f.logo} size="sm" />}
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <h3 className="meta mb-4 text-muted">Certifications</h3>
              {featured.map((c) => (
                <div key={c.name} className="card-brutal mb-4 flex flex-col gap-4 bg-paper p-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => setViewing(c)}
                    className="group/cert relative w-full shrink-0 border-2 border-ink bg-ivory transition-transform duration-200 hover:-translate-y-0.5 sm:w-44"
                  >
                    <img
                      src={c.evidence!.src}
                      alt=""
                      width={c.evidence!.width}
                      height={c.evidence!.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                    <span className="meta absolute inset-x-0 bottom-0 bg-ink/90 px-2 py-1.5 text-center text-lime">
                      View certificate <span aria-hidden>↗</span>
                    </span>
                    <span className="sr-only">: {c.name}</span>
                  </button>
                  <div className="min-w-0">
                    <p className="meta text-muted">Latest · {c.issuer}</p>
                    <p className="mt-1 font-display text-lg font-bold leading-tight tracking-[-0.01em]">{c.name}</p>
                    {c.detail && <p className="mt-1 text-sm text-muted">{c.detail}</p>}
                  </div>
                </div>
              ))}
              <ul className="flex flex-wrap gap-2">
                {others.map((c) => (
                  <li key={c.name} className="chip bg-paper text-ink">
                    {c.name} <span className="text-muted">· {c.issuer}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
      {viewing?.evidence && <ImageLightbox open onClose={() => setViewing(null)} {...viewing.evidence} />}
    </section>
  );
}
