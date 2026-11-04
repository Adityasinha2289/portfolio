import type { Diagram, FlowDiagram as FlowDiagramT } from "@/data/types";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

/** Layered architecture diagram — responsive HTML, readable by screen readers as nested lists. */
export function LayerDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="rounded-md border-2 border-ink bg-paper">
      <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2.5">
        <span className="meta">{diagram.title}</span>
        <span className="meta text-muted">fig. layers</span>
      </div>
      <Reveal as="ol" stagger={0.06} className="bg-grid p-4 sm:p-6">
        {diagram.layers.map((layer, li) => (
          <RevealItem as="li" key={layer.name} className="relative">
            <div className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:items-stretch sm:gap-4">
              <div className="meta flex items-center gap-2 text-muted sm:justify-end sm:text-right">
                <span className="text-ink">L{li + 1}</span>
                {layer.name}
              </div>
              <ul className="flex flex-wrap gap-2">
                {layer.nodes.map((n) => (
                  <li
                    key={n.label}
                    className={`min-w-[9rem] flex-1 border-2 border-ink px-3 py-2.5 ${
                      n.accent ? "bg-lime shadow-[3px_3px_0_var(--ink)]" : "bg-ivory"
                    }`}
                  >
                    <span className="block font-display text-[0.98rem] font-bold leading-tight tracking-[-0.01em]">
                      {n.label}
                    </span>
                    {n.detail && <span className="mt-0.5 block font-mono text-[11px] leading-snug text-muted">{n.detail}</span>}
                  </li>
                ))}
              </ul>
            </div>
            {li < diagram.layers.length - 1 && (
              <div aria-hidden className="flex h-6 items-center sm:ml-[9.5rem]">
                <span className="ml-6 h-full w-[2px] bg-ink" />
                <span className="-ml-[5px] mt-auto block size-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-ink" />
              </div>
            )}
          </RevealItem>
        ))}
      </Reveal>
      <figcaption className="border-t-2 border-ink px-4 py-3 text-sm text-muted">{diagram.caption}</figcaption>
    </figure>
  );
}

/** Left-to-right process flow; wraps to a vertical sequence on small screens. */
export function FlowDiagram({ diagram, dark = false }: { diagram: FlowDiagramT; dark?: boolean }) {
  const border = dark ? "border-ivory/70" : "border-ink";
  return (
    <figure className={`rounded-md border-2 ${border} ${dark ? "bg-[#0b0b0b] text-ivory" : "bg-paper"}`}>
      <div className={`flex items-center justify-between border-b-2 ${border} px-4 py-2.5`}>
        <span className="meta">{diagram.title}</span>
        <span className={`meta ${dark ? "text-muted-dark" : "text-muted"}`}>fig. flow</span>
      </div>
      <Reveal
        as="ol"
        stagger={0.05}
        className={`grid gap-2 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3 xl:grid-cols-4 ${dark ? "bg-grid-dark" : "bg-grid"}`}
      >
        {diagram.steps.map((s, i) => (
          <RevealItem
            as="li"
            key={s.label}
            className={`relative flex min-h-[84px] flex-col justify-between border-2 px-3 py-2.5 ${
              s.accent ? "border-ink bg-lime text-ink" : dark ? "border-ivory/60 bg-ink text-ivory" : "border-ink bg-ivory"
            }`}
          >
            <span className={`font-mono text-[10px] ${s.accent ? "text-ink/70" : dark ? "text-muted-dark" : "text-muted"}`}>
              {String(i + 1).padStart(2, "0")} {i < diagram.steps.length - 1 ? "→" : diagram.loops ? "↻" : "■"}
            </span>
            <span className="mt-2 block font-display text-[1rem] font-bold leading-tight tracking-[-0.01em]">{s.label}</span>
            {s.detail && (
              <span className={`mt-0.5 block font-mono text-[11px] leading-snug ${s.accent ? "text-ink/75" : dark ? "text-muted-dark" : "text-muted"}`}>
                {s.detail}
              </span>
            )}
          </RevealItem>
        ))}
      </Reveal>
      <figcaption className={`border-t-2 ${border} px-4 py-3 text-sm ${dark ? "text-muted-dark" : "text-muted"}`}>
        {diagram.loops && <span className="meta mr-2">↻ loops</span>}
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
