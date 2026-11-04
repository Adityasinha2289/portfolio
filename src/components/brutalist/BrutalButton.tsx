import type { ReactNode, MouseEvent } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";

type Variant = "primary" | "secondary" | "dark";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  /** "right" for internal navigation, "diag" for leaving the site, false for none */
  arrow?: "right" | "diag" | false;
  onDark?: boolean;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
}

type Props = BaseProps &
  (
    | { to: string; href?: never; onClick?: (e: MouseEvent<HTMLElement>) => void; type?: never }
    | { href: string; to?: never; onClick?: (e: MouseEvent<HTMLElement>) => void; type?: never; download?: boolean }
    | { onClick: (e: MouseEvent<HTMLElement>) => void; to?: never; href?: never; type?: "button" | "submit" }
  );

const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * The physical button. Renders a router Link, an anchor or a button depending on
 * props, so the click target is always the right element for assistive tech.
 */
export function BrutalButton(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    arrow = false,
    onDark = false,
    magnetic = false,
    className = "",
    ariaLabel,
  } = props;

  const cls = [
    "btn",
    `btn-${variant}`,
    size === "sm" ? "btn-sm" : "",
    onDark ? "btn-on-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const icon =
    arrow === "right" ? (
      <ArrowRight aria-hidden className="btn-arrow size-4 shrink-0" strokeWidth={2.5} />
    ) : arrow === "diag" ? (
      <ArrowUpRight aria-hidden className="btn-arrow btn-arrow-diag size-4 shrink-0" strokeWidth={2.5} />
    ) : null;

  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  let el: ReactNode;
  if ("to" in props && props.to !== undefined) {
    el = (
      <Link to={props.to} className={cls} aria-label={ariaLabel} onClick={props.onClick}>
        {content}
      </Link>
    );
  } else if ("href" in props && props.href !== undefined) {
    const external = isExternal(props.href);
    el = (
      <a
        href={props.href}
        className={cls}
        aria-label={ariaLabel}
        onClick={props.onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...("download" in props && props.download ? { download: "" } : {})}
      >
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  } else {
    el = (
      <button type={props.type ?? "button"} className={cls} aria-label={ariaLabel} onClick={props.onClick}>
        {content}
      </button>
    );
  }

  return magnetic ? <MagneticButton>{el}</MagneticButton> : el;
}
