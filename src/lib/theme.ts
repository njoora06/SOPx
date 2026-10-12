import { prefersReducedMotion } from "@/lib/motion";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "sopx-theme";
export const DEFAULT_THEME: Theme = "light";

/** On <html> while a theme switch animates; scopes the reveal rules in globals.css. */
const SWITCHING_CLASS = "theme-switching";
/** On <html> for the whole switch, so components' colour transitions don't all fire at once. */
const NO_TRANSITIONS_CLASS = "theme-no-transitions";

/** Browser UI colour (mobile address bar) per theme: --obsidian-0 in globals.css. */
export const THEME_COLORS: Record<Theme, string> = { light: "#f5f7fa", dark: "#0a0b0e" };

/**
 * Inline <head> script: applies the saved theme before first paint so a
 * reload never flashes the wrong one. Storage can throw (private mode).
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="light"?"${THEME_COLORS.light}":"${THEME_COLORS.dark}"}}catch(e){}`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

let latestSwitch = 0;

/** The reveal is deliberately unhurried; it runs on snapshots, so it never blocks the page. */
const REVEAL_MS = 700;
const REVEAL_EASING = "cubic-bezier(0.65, 0, 0.35, 1)"; // --ease-in-out

/** A point on screen, in viewport pixels, that the new theme grows out from. */
export type RevealOrigin = { x: number; y: number };

/**
 * Switches theme and remembers the choice. Where View Transitions are
 * supported, the new theme spreads over a snapshot of the old one in a circle
 * growing from `origin` (default: the middle of the screen), so the page
 * restyles once instead of easing colours on every element (which froze the
 * page for hundreds of milliseconds). Otherwise, with reduced motion, or in a
 * background tab, it switches instantly.
 */
export function setTheme(theme: Theme, origin?: RevealOrigin) {
  const root = document.documentElement;
  const apply = () => {
    root.classList.add(NO_TRANSITIONS_CLASS);
    root.dataset.theme = theme;
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  };
  const restoreTransitions = () => root.classList.remove(NO_TRANSITIONS_CLASS);

  const animate =
    theme !== getTheme() &&
    typeof document.startViewTransition === "function" &&
    document.visibilityState === "visible" &&
    !prefersReducedMotion();

  if (animate) {
    const id = ++latestSwitch;
    const isLatest = () => id === latestSwitch;
    root.classList.add(SWITCHING_CLASS);
    const transition = document.startViewTransition(apply);
    // Transitions stay off until the reveal ends: turning them back on
    // restyles every element, which would compete with the reveal. `finished`
    // also settles when a newer switch skips this one; that switch cleans up.
    transition.ready.then(
      () => {
        const { innerWidth: w, innerHeight: h } = window;
        const { x, y } = origin ?? { x: w / 2, y: h / 2 };
        // Far enough to reach the furthest corner.
        const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: REVEAL_MS, easing: REVEAL_EASING, fill: "both", pseudoElement: "::view-transition-new(root)" },
        );
      },
      () => {}, // rejects when a newer switch skips this one; nothing to do
    );
    transition.finished.finally(() => {
      if (!isLatest()) return;
      root.classList.remove(SWITCHING_CLASS);
      restoreTransitions();
    });
  } else {
    apply();
    void document.body.offsetWidth; // apply the new styles now, while transitions are off
    restoreTransitions();
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable: the theme still applies for this visit.
  }
}

/** Notifies on theme changes in this tab and follows changes made in other tabs. */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_STORAGE_KEY) return;
    const theme = e.newValue === "light" || e.newValue === "dark" ? e.newValue : DEFAULT_THEME;
    if (theme !== getTheme()) setTheme(theme);
  };
  window.addEventListener("storage", onStorage);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}
