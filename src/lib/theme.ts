import { prefersReducedMotion } from "@/lib/motion";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "sopx-theme";
export const DEFAULT_THEME: Theme = "light";

/** On <html> while a theme switch animates; scopes the crossfade rules in globals.css. */
const SWITCHING_CLASS = "theme-switching";
/** On <html> for the restyle itself, so components' colour transitions don't all fire at once. */
const NO_TRANSITIONS_CLASS = "theme-no-transitions";

/**
 * Inline <head> script: applies the saved theme before first paint so a
 * reload never flashes the wrong one. Storage can throw (private mode).
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

let latestSwitch = 0;

/**
 * Switches theme and remembers the choice. Where View Transitions are
 * supported, the browser crossfades a snapshot of the old theme into the new
 * one on the compositor, so the page restyles once instead of easing colours
 * on every element (which froze the page for hundreds of milliseconds).
 * Otherwise, with reduced motion, or in a background tab, it switches instantly.
 */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  const apply = () => {
    root.classList.add(NO_TRANSITIONS_CLASS);
    root.dataset.theme = theme;
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
    // `ready` resolves once the new theme has been styled and captured, so
    // transitions can come back. It rejects when a newer switch skips this one.
    transition.ready.then(
      () => isLatest() && restoreTransitions(),
      () => isLatest() && restoreTransitions(),
    );
    transition.finished.finally(() => isLatest() && root.classList.remove(SWITCHING_CLASS));
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
