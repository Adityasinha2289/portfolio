import type { Provenance } from "@/data/types";
import { provenanceLabel } from "@/data/achievements";

const tone: Record<Provenance, string> = {
  measured: "bg-lime text-ink border-ink",
  repo: "bg-paper text-ink border-ink",
  reported: "bg-transparent border-current",
  observed: "bg-ink text-lime border-ink",
  documented: "bg-lime text-ink border-ink",
  pending: "bg-transparent border-current border-dashed",
};

const titles: Record<Provenance, string> = {
  measured: "Reproduced by running the project's own code and data",
  repo: "Stated in the project's repository documentation",
  reported: "Reported by Aditya; not independently verified",
  observed: "Publicly verifiable",
  documented: "Backed by an official document shown on this site",
  pending: "Not yet available",
};

/** Small tag that says how a number was established. Honesty, made visible. */
export function ProvenanceBadge({ value, className = "" }: { value: Provenance; className?: string }) {
  return (
    <span
      title={titles[value]}
      className={`inline-flex items-center border px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] ${tone[value]} ${className}`}
    >
      <span className="sr-only">Source: </span>
      {provenanceLabel[value]}
    </span>
  );
}
