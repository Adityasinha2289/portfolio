import { Check, Copy, Mail, ArrowUpRight, FileText } from "lucide-react";
import { person, social, resumeUrl, resumeRequestHref } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";
import { BrutalButton } from "@/components/brutalist/BrutalButton";
import { Reveal } from "@/components/motion/Reveal";
import avatar from "@/assets/aditya-sinha-avatar.webp";

const mailto = `mailto:${person.email}?subject=${encodeURIComponent("Let's build something")}`;

export function Contact() {
  const { copied, copy } = useCopy();
  const links = [
    { ...social.github, sub: social.github.handle },
    { ...social.linkedin, sub: social.linkedin.handle },
    { ...social.x, sub: social.x.handle },
    { ...social.renocred, sub: "The company" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-grid-lime relative border-t-2 border-ink bg-lime">
      <div className="container-x">
        <Reveal>
          <p className="meta mb-8 flex items-center gap-3">
            <span className="bg-ink px-1.5 py-0.5 text-lime">§08</span>
            <span aria-hidden className="h-px w-10 bg-ink" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="font-bold uppercase leading-[0.86] tracking-[-0.04em] text-[clamp(2.6rem,9.5vw,8rem)]"
          >
            <span className="block">Have something</span>
            <span className="block">interesting?</span>
            <span className="mt-2 block text-[0.55em] leading-none tracking-[-0.04em]">
              <span className="bg-ink px-[0.15em] text-lime">Let's build it.</span>
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6" delay={0.06}>
            <p className="max-w-lg text-[1.1rem] leading-relaxed">
              Interested in working together, discussing an idea, building something ambitious or exploring an
              opportunity? Let's connect.
            </p>

            {/* Email block */}
            <div className="card-brutal mt-8 bg-paper p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-4 border-b-2 border-ink pb-5">
                <img
                  src={avatar}
                  alt=""
                  width={160}
                  height={147}
                  loading="lazy"
                  decoding="async"
                  className="size-14 shrink-0 border-2 border-ink object-cover object-top"
                />
                <div>
                  <p className="font-display text-lg font-bold leading-tight tracking-[-0.01em]">{person.name}</p>
                  <p className="meta mt-1 text-muted">Founder, RenoCred · {person.location}</p>
                </div>
              </div>
              <p className="meta mb-2 text-muted">Email</p>
              <a
                href={mailto}
                className="link-draw break-all font-display text-[clamp(1.25rem,3.2vw,2rem)] font-bold tracking-[-0.03em]"
              >
                {person.email}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <BrutalButton href={mailto} variant="dark" size="sm" magnetic>
                  <span className="inline-flex items-center gap-2">
                    <Mail aria-hidden className="size-4" /> Write an email
                  </span>
                </BrutalButton>
                <button type="button" onClick={() => copy(person.email)} className="btn btn-secondary btn-sm">
                  {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                  {copied ? "Copied" : "Copy email"}
                </button>
                <span role="status" aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.12}>
            <ul className="border-t-2 border-ink">
              {links.map((l) => (
                <li key={l.href} className="border-b-2 border-ink">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5 transition-[padding] duration-200 hover:bg-ink hover:px-4 hover:text-lime"
                  >
                    <span>
                      <span className="block font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-none tracking-[-0.03em]">
                        {l.label}
                      </span>
                      <span className="meta mt-1.5 block opacity-70">{l.sub}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-7 shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                      strokeWidth={2.25}
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li className="border-b-2 border-ink">
                <a
                  href={resumeUrl ?? resumeRequestHref}
                  {...(resumeUrl ? { download: "" } : {})}
                  className="group flex items-center justify-between gap-4 py-5 transition-[padding] duration-200 hover:bg-ink hover:px-4 hover:text-lime"
                >
                  <span>
                    <span className="block font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-none tracking-[-0.03em]">
                      Resume
                    </span>
                    <span className="meta mt-1.5 block opacity-70">{resumeUrl ? "PDF download" : "Request by email"}</span>
                  </span>
                  <FileText aria-hidden className="size-7 shrink-0" strokeWidth={2.25} />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
