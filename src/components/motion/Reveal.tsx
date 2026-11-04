import type { ReactNode } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const hiddenState = { opacity: 0, y: 24 };
const item: Variants = {
  hidden: hiddenState,
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

type Tag = "div" | "li" | "section" | "article" | "ul" | "ol" | "dl" | "span" | "p" | "header";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  /** Render as a stagger container whose RevealItem children animate in sequence */
  stagger?: number;
  id?: string;
}

/**
 * Scroll reveal. Under reduced motion it renders plain, fully visible content —
 * nothing is ever hidden waiting on an animation.
 */
export function Reveal({ children, className, delay = 0, as = "div", stagger, id }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} id={id}>
        {children}
      </Plain>
    );
  }
  const M = m[as];
  const variants: Variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
    : {
        hidden: hiddenState,
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } },
      };
  return (
    <M
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  const M = m[as];
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  );
}
