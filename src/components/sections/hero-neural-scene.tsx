"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Lazy host for the hero's 3D neural brain (neural-brain-scene.ts). The scene
 * and three.js are loaded only once the container nears the viewport and the
 * browser is idle, so they stay off the critical path (on phones the scene
 * sits below the fold).
 */
export function HeroNeuralScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let unmount = () => {};
    const reducedMotion = prefersReducedMotion();

    const init = () =>
      void import("./neural-brain-scene").then(({ mountNeuralBrainScene }) => {
        if (!disposed) unmount = mountNeuralBrainScene(container, { reducedMotion });
      });

    // Safari has no requestIdleCallback.
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    let idleHandle: number | undefined;
    const startObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        startObserver.disconnect();
        idleHandle = hasIdleCallback ? window.requestIdleCallback(init, { timeout: 1500 }) : window.setTimeout(init, 200);
      },
      { rootMargin: "200px" },
    );
    startObserver.observe(container);

    return () => {
      disposed = true;
      startObserver.disconnect();
      if (idleHandle !== undefined) {
        if (hasIdleCallback) window.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
      unmount();
    };
  }, []);

  return (
    <div className="h-full w-full bg-transparent">
      <div ref={containerRef} className="size-full" />
    </div>
  );
}
