export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "sopx-theme";
export const DEFAULT_THEME: Theme = "light";

/** How long colours ease between themes; matches `.theme-transition` in globals.css. */
const THEME_TRANSITION_MS = 350;

/**
 * Inline <head> script: applies the saved theme before first paint so a
 * reload never flashes the wrong one. Storage can throw (private mode).
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

let transitionTimer: ReturnType<typeof setTimeout> | undefined;

/** Switches theme with a brief colour transition and remembers the choice. */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = theme;
  clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => root.classList.remove("theme-transition"), THEME_TRANSITION_MS);
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
