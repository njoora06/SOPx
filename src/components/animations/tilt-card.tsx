"use client";

import { useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 5.5;

const canTilt = () => hasFinePointer() && !prefersReducedMotion();

type TiltCardProps = React.ComponentProps<"div">;

/**
 * Card that tilts subtly toward the cursor and shows a soft light that follows
 * it. Inert for touch input and when the user prefers reduced motion.
 */
export function TiltCard({ className, children, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  // Pointer events can fire faster than the display refreshes; apply at most one update per frame.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current || !canTilt()) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = pointer.current.x - rect.left;
      const y = pointer.current.y - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -MAX_TILT_DEG;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * MAX_TILT_DEG;
      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "group/tilt relative transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-3d",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-1 rounded-[inherit] bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgb(255_255_255/0.08),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
      {children}
    </div>
  );
}
