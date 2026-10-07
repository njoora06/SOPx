import { ViewTransition } from "react";

/**
 * Animates a page in and out on route navigation (fade + slight rise; see the
 * `page-enter` / `page-exit` rules in globals.css). Wrap each page's content
 * in this inside its page.tsx — layouts persist and would never animate.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
