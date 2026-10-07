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

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
