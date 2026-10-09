import { cn } from "@/lib/utils";

interface EnterProps {
  children: React.ReactNode;
  /** Position among siblings; each step adds one stagger interval. */
  index?: number;
  className?: string;
}

/**
 * CSS-only entrance for above-the-fold content (the `hero-enter` keyframes in
 * globals.css). Unlike Reveal it needs no JavaScript, so headings paint with
 * the first HTML instead of waiting for hydration — keeps LCP fast.
 */
export function Enter({ children, index = 0, className }: EnterProps) {
  return (
    <div className={cn("hero-enter", className)} style={index ? ({ "--enter-step": index } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
