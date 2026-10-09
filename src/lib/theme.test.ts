import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/** Just enough of the DOM for lib/theme.ts. Each test gets a fresh module. */
function setup({ viewTransitions = true, reducedMotion = false, visible = true } = {}) {
  const classes = new Set<string>();
  const root = {
    dataset: { theme: "light" } as Record<string, string>,
    classList: { add: (c: string) => classes.add(c), remove: (c: string) => classes.delete(c) },
  };
  const finishes: Array<() => void> = [];
  let skipPrevious: (() => void) | undefined;
  const startViewTransition = vi.fn((update: () => void) => {
    skipPrevious?.(); // like the browser, a new transition skips the running one
    update(); // the browser runs the update once the old snapshot is taken
    let reject!: (e: Error) => void;
    const ready = new Promise<void>((resolve, rej) => {
      reject = rej;
      setTimeout(resolve, 5); // new state captured
    });
    skipPrevious = () => reject(new Error("AbortError: Transition was skipped"));
    return { ready, finished: new Promise<void>((resolve) => finishes.push(resolve)) };
  });
  const storage = new Map<string, string>();

  vi.stubGlobal("document", {
    documentElement: root,
    body: { offsetWidth: 0 },
    visibilityState: visible ? "visible" : "hidden",
    ...(viewTransitions ? { startViewTransition } : {}),
  });
  vi.stubGlobal("window", { matchMedia: (q: string) => ({ matches: q.includes("reduce") && reducedMotion }) });
  vi.stubGlobal("localStorage", { setItem: (k: string, v: string) => storage.set(k, v) });

  return { root, classes, startViewTransition, finishes, storage };
}

const flush = () => new Promise((r) => setTimeout(r, 10));

describe("setTheme", () => {
  beforeEach(() => vi.resetModules());
  afterEach(() => vi.unstubAllGlobals());

  it("crossfades with a View Transition and cleans up afterwards", async () => {
    const env = setup();
    const { setTheme, THEME_STORAGE_KEY } = await import("./theme");

    setTheme("dark");
    expect(env.startViewTransition).toHaveBeenCalledOnce();
    expect(env.root.dataset.theme).toBe("dark");
    expect(env.classes.has("theme-switching")).toBe(true);
    expect(env.classes.has("theme-no-transitions")).toBe(true); // while the new theme is styled
    expect(env.storage.get(THEME_STORAGE_KEY)).toBe("dark");

    await flush(); // ready: new theme captured
    expect(env.classes.has("theme-no-transitions")).toBe(false);
    expect(env.classes.has("theme-switching")).toBe(true); // crossfade still running

    env.finishes[0]!();
    await flush();
    expect(env.classes.has("theme-switching")).toBe(false);
  });

  it("keeps the class until the latest of several rapid switches finishes", async () => {
    const env = setup();
    const { setTheme } = await import("./theme");

    setTheme("dark");
    setTheme("light");
    env.finishes[0]!(); // the first (skipped) transition settles
    await flush();
    expect(env.classes.has("theme-switching")).toBe(true);

    env.finishes[1]!();
    await flush();
    expect(env.classes.size).toBe(0);
    expect(env.root.dataset.theme).toBe("light");
  });

  it.each([
    ["View Transitions are unsupported", { viewTransitions: false }],
    ["the user prefers reduced motion", { reducedMotion: true }],
    ["the tab is in the background", { visible: false }],
  ])("switches instantly when %s", async (_, options) => {
    const env = setup(options);
    const { setTheme } = await import("./theme");

    setTheme("dark");
    expect(env.root.dataset.theme).toBe("dark");
    expect(env.startViewTransition).not.toHaveBeenCalled();
    expect(env.classes.size).toBe(0); // transitions were suppressed for the restyle, then restored
  });

  it("does not animate when the theme is unchanged", async () => {
    const env = setup();
    const { setTheme } = await import("./theme");

    setTheme("light");
    expect(env.startViewTransition).not.toHaveBeenCalled();
  });
});
