import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface Props {
  index: string;
  kicker: string;
  lines: [string, string];
  intro?: ReactNode;
  id?: string;
  dark?: boolean;
  aside?: ReactNode;
}

/**
 * Oversized two-line section heading with a technical index label.
 * The second line is set in outline/accent to create typographic tension.
 */
export function SectionHeading({ index, kicker, lines, intro, id, dark = false, aside }: Props) {
  return (
    <header className="grid gap-8 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-8">
        <p className={`meta mb-6 flex items-center gap-3 ${dark ? "text-muted-dark" : "text-muted"}`}>
          <span className={`inline-block px-1.5 py-0.5 ${dark ? "bg-lime text-ink" : "bg-ink text-ivory"}`}>
            §{index}
          </span>
          <span aria-hidden className={`h-px w-10 ${dark ? "bg-muted-dark" : "bg-muted"}`} />
          {kicker}
        </p>
        <h2
          id={id}
          className="font-bold uppercase text-[clamp(2.5rem,7.2vw,5.5rem)] leading-[0.9] tracking-[-0.035em]"
        >
          <span className="block">{lines[0]}</span>
          {dark ? (
            <span className="block text-lime">{lines[1]}</span>
          ) : (
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.06em] bottom-[0.06em] h-[0.34em] bg-lime"
              />
              <span className="relative">{lines[1]}</span>
            </span>
          )}
        </h2>
      </Reveal>
      {(intro || aside) && (
        <Reveal className="md:col-span-4 md:pb-2" delay={0.1}>
          {intro && (
            <p className={`max-w-sm text-[1.05rem] leading-relaxed ${dark ? "text-concrete" : "text-muted"}`}>
              {intro}
            </p>
          )}
          {aside}
        </Reveal>
      )}
    </header>
  );
}
