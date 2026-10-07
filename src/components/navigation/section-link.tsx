"use client";

import Link from "next/link";
import {
  HEADER_OFFSET,
  SCROLL_MAX_MS,
  SCROLL_MIN_MS,
  SCROLL_MS_PER_PX,
  easeInOutCubic,
  prefersReducedMotion,
} from "@/lib/motion";

let cancelActiveScroll: (() => void) | null = null;

/** Eased window scroll that the user can interrupt with wheel, touch or keys. */
function smoothScrollTo(top: number) {
  cancelActiveScroll?.();
  const start = window.scrollY;
  const distance = top - start;
  if (Math.abs(distance) < 2 || prefersReducedMotion()) {
    window.scrollTo(0, top);
    return;
  }

  const duration = Math.min(SCROLL_MAX_MS, Math.max(SCROLL_MIN_MS, Math.abs(distance) * SCROLL_MS_PER_PX));
  const startTime = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    cancelActiveScroll = null;
  };
  const tick = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, start + distance * easeInOutCubic(t));
    if (t < 1) frame = requestAnimationFrame(tick);
    else stop();
  };

  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  cancelActiveScroll = stop;
  frame = requestAnimationFrame(tick);
}

/**
 * Glides to the section `href` points at (`/#id`, `#id`, or `/` for the top)
 * when it is on the current page, stopping just below the fixed header.
 * Returns false when `href` belongs to another route.
 */
export function scrollToSection(href: string) {
  const url = new URL(href, window.location.href);
  if (url.pathname !== window.location.pathname) return false;

  const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
  if (url.hash && !target) return false;

  const top = target ? target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET : 0;
  smoothScrollTo(Math.max(0, top));
  window.history.pushState(null, "", url.hash || url.pathname);
  // Move focus to the section so keyboard and screen-reader users follow along.
  if (target) {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  return true;
}

type SectionLinkProps = React.ComponentProps<typeof Link> & { href: string };

/**
 * Link that smooth-scrolls to a section on the current page. Links to other
 * routes fall through to normal Next.js navigation (with its page transition).
 */
export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (scrollToSection(href)) e.preventDefault();
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
