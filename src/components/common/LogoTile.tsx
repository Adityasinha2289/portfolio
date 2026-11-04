import type { Logo } from "@/data/types";

const sizes = {
  sm: { box: "size-10", wide: "h-10 w-24", pad: "p-1.5" },
  md: { box: "size-16", wide: "h-16 w-40", pad: "p-2.5" },
  lg: { box: "size-20", wide: "h-20 w-48", pad: "p-3" },
} as const;

/** Bordered tile for an organisation mark. Decorative when a visible name sits beside it. */
export function LogoTile({
  logo,
  size = "md",
  decorative = true,
  className = "",
}: {
  logo: Logo;
  size?: keyof typeof sizes;
  decorative?: boolean;
  className?: string;
}) {
  const s = sizes[size];
  const cover = logo.fit === "cover";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden border-2 border-ink bg-paper shadow-[3px_3px_0_var(--ink)] ${
        logo.wide ? s.wide : s.box
      } ${cover ? "" : s.pad} ${className}`}
    >
      <img
        src={logo.src}
        alt={decorative ? "" : logo.alt}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
        className={cover ? "size-full object-cover" : "max-h-full max-w-full object-contain"}
      />
    </span>
  );
}
