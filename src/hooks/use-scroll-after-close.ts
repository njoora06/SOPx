"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { scrollToSection } from "@/components/navigation/section-link";

/**
 * Navigation out of a Radix overlay (Sheet/Dialog). The open overlay locks
 * page scroll, so the target is remembered on close and scrolled to once the
 * overlay has fully closed: pass `onCloseAutoFocus` to the overlay's content.
 * Falls back to a route change when the target isn't on this page.
 */
export function useScrollAfterClose(beforeScroll?: () => void) {
  const pendingHref = useRef<string | null>(null);
  const router = useRouter();

  const scrollAfterClose = (href: string) => {
    pendingHref.current = href;
  };

  const onCloseAutoFocus = (e: Event) => {
    const href = pendingHref.current;
    if (!href) return;
    pendingHref.current = null;
    e.preventDefault(); // focus goes to the target instead of the trigger
    setTimeout(() => {
      beforeScroll?.();
      if (!scrollToSection(href)) router.push(href);
    });
  };

  return { scrollAfterClose, onCloseAutoFocus };
}
