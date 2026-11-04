import { Link } from "react-router";
import { ArrowUp } from "lucide-react";
import { person, social } from "@/data/site";
import { projects, projectPath } from "@/data/projects";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark border-t-2 border-ivory/15">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.045em]">
            ADITYA<sup className="text-[0.35em] align-super">®</sup>
          </p>
          <p className="meta mt-4 text-lime">Built with intention.</p>
        </div>
        <nav aria-label="Case studies" className="md:col-span-4">
          <p className="meta mb-4 text-muted-dark">Case studies</p>
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={projectPath(p.slug)} className="link-draw text-concrete hover:text-ivory">
                  <span className="mr-3 font-mono text-xs text-muted-dark">{p.index}</span>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="meta mb-4 text-muted-dark">Elsewhere</p>
          <ul className="space-y-2">
            {[social.github, social.linkedin, social.x, social.renocred].map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw text-concrete hover:text-ivory">
                  {s.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-4 border-t border-ivory/15 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta text-muted-dark">
          © {year} {person.name} · {person.location}
        </p>
        <p className="meta text-muted-dark">React · TypeScript · Vite · Tailwind · Motion</p>
        <button
          type="button"
          className="btn btn-dark btn-sm btn-on-dark self-start sm:self-auto"
          onClick={() => {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
          }}
        >
          Back to top <ArrowUp aria-hidden className="size-3.5" />
        </button>
      </div>
    </footer>
  );
}
