import type { TerminalLine } from "@/data/types";

/** Static terminal window for documented output. */
export function TerminalWindow({ title, lines, className = "" }: { title: string; lines: TerminalLine[]; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-md border-2 border-ivory/80 bg-[#0b0b0b] text-ivory ${className}`}>
      <div className="flex items-center justify-between border-b-2 border-ivory/20 px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-coral" />
          <span className="size-2.5 rounded-full bg-concrete" />
          <span className="size-2.5 rounded-full bg-lime" />
        </span>
        <span className="font-mono text-[11px] text-muted-dark">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.75] md:text-[13px]">
        <code>
          {lines.map((l, i) => (
            <span key={i} className="block whitespace-pre-wrap break-words">
              {l.type === "cmd" && (
                <>
                  <span className="text-lime">❯ </span>
                  {l.text}
                </>
              )}
              {l.type === "out" && <span className="text-concrete">{l.text}</span>}
              {l.type === "comment" && <span className="text-muted-dark">{l.text}</span>}
              {l.type === "ok" && (
                <span className="inline-block bg-lime px-1.5 font-semibold text-ink">{l.text}</span>
              )}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
