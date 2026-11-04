import { Fragment } from "react";

interface Props {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  separator?: string;
}

/**
 * Seamless infinite marquee. The sequence is rendered twice and the track is
 * translated by exactly -50%, so the loop reset lands on an identical frame.
 * Each half repeats the items enough times to overfill ultra-wide screens.
 * Under reduced motion the track is static (see globals.css).
 */
export function Marquee({ items, reverse = false, duration = 40, className = "", separator = "/" }: Props) {
  const half = Array.from({ length: 3 }, () => items).flat();
  const renderHalf = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {half.map((word, i) => (
        <Fragment key={i}>
          <span className="px-[0.35em]">{word}</span>
          <span className="px-[0.35em] opacity-40">{separator}</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      {/* Screen readers get the words once, not a looping wall of text */}
      <p className="sr-only">{items.join(", ")}</p>
      <div
        className="marquee-track"
        aria-hidden
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {renderHalf(false)}
        {renderHalf(true)}
      </div>
    </div>
  );
}
