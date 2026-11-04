import { useLocation } from "react-router";
import { BrutalButton } from "@/components/brutalist/BrutalButton";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { projects, projectPath } from "@/data/projects";

export function NotFound() {
  const { pathname } = useLocation();
  useDocumentMeta({
    title: "Not found | Aditya Sinha",
    description: "This page doesn't exist.",
    path: pathname,
  });
  return (
    <section className="bg-grid border-b-2 border-ink" aria-labelledby="nf-title">
      <div className="container-x flex min-h-[70vh] flex-col justify-center py-20">
        <p className="meta mb-6 text-muted">Error 404 · {pathname}</p>
        <h1 id="nf-title" className="font-bold uppercase leading-[0.86] tracking-[-0.04em] text-[clamp(3rem,12vw,9rem)]">
          Nothing
          <br />
          <span className="bg-lime px-[0.06em]">built here.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-muted">Yet. Try one of these instead:</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BrutalButton to="/" arrow="right">
            Home
          </BrutalButton>
          {projects.map((p) => (
            <BrutalButton key={p.slug} to={projectPath(p.slug)} variant="secondary" size="sm">
              {p.name}
            </BrutalButton>
          ))}
        </div>
      </div>
    </section>
  );
}
