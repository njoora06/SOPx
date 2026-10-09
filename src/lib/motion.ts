/**
 * Motion tokens for JS-driven animation. Keep in sync with the `--ease-*` and
 * `--dur-*` custom properties in app/globals.css.
 */

/** Height of the fixed site header; section scrolling stops just below it. */
export const HEADER_OFFSET = 80;

/** Smooth-scroll duration scales with distance, within these bounds (ms). */
export const SCROLL_MIN_MS = 500;
export const SCROLL_MAX_MS = 1100;
export const SCROLL_MS_PER_PX = 0.35;

/** cubic-bezier(0.65, 0, 0.35, 1) approximated as ease-in-out cubic. */
export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

// Media query lists are created once and shared; `.matches` stays current as settings change.
const queries = new Map<string, MediaQueryList>();
function matches(query: string) {
  if (typeof window === "undefined") return false;
  let list = queries.get(query);
  if (!list) queries.set(query, (list = window.matchMedia(query)));
  return list.matches;
}

export function prefersReducedMotion() {
  return matches("(prefers-reduced-motion: reduce)");
}

/** A mouse or trackpad that can hover (not touch). */
export function hasFinePointer() {
  return matches("(hover: hover) and (pointer: fine)");
}
