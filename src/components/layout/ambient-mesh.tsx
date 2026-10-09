/**
 * Slow-drifting ambient light behind the page. Tinted with the cool
 * secondary palette; vermilion is kept out of ambient washes.
 *
 * The softness comes from radial gradients rather than `filter: blur()`:
 * a 130px+ blur re-computed every frame was the page's largest rendering
 * cost, while gradients look the same and move on the compositor for free.
 * The layers hold still on small screens, where three animated layers this
 * size cost a lot of GPU memory on high-density displays.
 */
export function AmbientMesh() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-80 left-[5%] h-[70rem] w-[75rem] animate-mesh-1 max-md:animate-none bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--secondary-container)_30%,transparent),color-mix(in_oklab,var(--secondary-container)_10%,transparent)_55%,transparent)] opacity-75" />
      <div className="absolute top-[25%] -right-80 h-[65rem] w-[70rem] animate-mesh-2 max-md:animate-none bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--surface-bright)_25%,transparent),color-mix(in_oklab,var(--surface-bright)_8%,transparent)_55%,transparent)] opacity-65" />
      <div className="absolute top-[55%] -left-72 h-[68rem] w-[72rem] animate-mesh-3 max-md:animate-none bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--secondary-container)_25%,transparent),color-mix(in_oklab,var(--secondary-container)_8%,transparent)_55%,transparent)] opacity-55" />
    </div>
  );
}
