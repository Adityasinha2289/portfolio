import { useRef, type ReactNode, type PointerEvent } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useFinePointer } from "@/hooks/useMediaQuery";

/**
 * Subtle magnetic pull toward the cursor on desktop.
 * The outer span is the stable hit area; only the inner visual moves, so the
 * actual click target never shifts. Disabled for touch and reduced motion.
 */
export function MagneticButton({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) return <>{children}</>;

  return (
    <span ref={ref} className="inline-block p-2 -m-2" onPointerMove={onMove} onPointerLeave={reset}>
      <m.span className="inline-block" style={{ x: sx, y: sy }}>
        {children}
      </m.span>
    </span>
  );
}
