import type { Visual } from "@/data/types";

type ImageVisual = Extract<Visual, { kind: "image" }>;

/** Browser / phone chrome around a real screenshot. Dimensions reserved to prevent layout shift. */
export function DeviceFrame({
  visual,
  eager = false,
  className = "",
  zoom = false,
}: {
  visual: ImageVisual;
  eager?: boolean;
  className?: string;
  zoom?: boolean;
}) {
  const img = (
    <img
      src={visual.src}
      alt={visual.alt}
      width={visual.width}
      height={visual.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`block h-auto w-full ${zoom ? "transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]" : ""}`}
    />
  );

  if (visual.frame === "mobile") {
    return (
      <div className={`mx-auto w-full max-w-[260px] rounded-[28px] border-2 border-ink bg-ink p-2 shadow-brutal ${className}`}>
        <div className="overflow-hidden rounded-[20px]">{img}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-md border-2 border-ink bg-paper ${className}`}>
      <div className="flex items-center gap-3 border-b-2 border-ink bg-concrete px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full border-[1.5px] border-ink bg-coral" />
          <span className="size-2.5 rounded-full border-[1.5px] border-ink bg-paper" />
          <span className="size-2.5 rounded-full border-[1.5px] border-ink bg-lime" />
        </span>
        <span className="truncate font-mono text-[11px] text-ink/80">{visual.url ?? ""}</span>
      </div>
      <div className="overflow-hidden">{img}</div>
    </div>
  );
}
