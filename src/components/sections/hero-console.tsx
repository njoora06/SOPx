import { Share2, SlidersHorizontal, Zap } from "lucide-react";
import { ScrollFade } from "@/components/animations/scroll-fade";
import { TiltCard } from "@/components/animations/tilt-card";
import { heroConsole } from "@/data/home";
import { HeroNeuralScene } from "./hero-neural-scene";

const pill =
  "inline-flex items-center gap-2 rounded-md border border-white/12 bg-hud-1/90 px-2.5 py-1 font-mono text-[10px] text-slate-300 shadow-lg";

/** The hero's right column: a decorative "instrument console" around the 3D neural scene. */
export function HeroConsole() {
  const { core, latency, mesh } = heroConsole.readouts;
  const { capacity } = heroConsole;

  return (
    <ScrollFade className="relative">
      <div aria-hidden className="absolute -inset-1 rounded-3xl bg-linear-to-tr from-brand-blue/35 via-transparent to-brand-red/30 opacity-75 blur-2xl light:opacity-35" />

      <TiltCard className="group overflow-hidden rounded-2xl border border-white/12 bg-hud-1/90 p-5 shadow-2xl backdrop-blur-2xl sm:p-6 light:bg-obsidian-1/90 light:shadow-xl">
        {/* HUD header and active chips */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-4">
          <div className="flex items-center gap-3">
            <div aria-hidden className="flex shrink-0 gap-1.5">
              <span className="size-2.5 animate-pulse rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
              <span className="size-2.5 rounded-full bg-yellow-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[12px] font-bold tracking-wider text-white uppercase drop-shadow-[0_0_12px_rgba(245,12,12,0.4)]">
                {heroConsole.title}
              </span>
              <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-red-400 uppercase">
                {heroConsole.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] text-blue-400 shadow-[0_0_12px_rgba(11,47,163,0.35)]">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-blue-400" />
              {heroConsole.chip}
            </span>
          </div>
        </div>

        {/* Visual centrepiece: interactive 3D WebGL neural scene */}
        {/* A dark "instrument screen" in both themes: the glow effects need a dark field. */}
        <div data-theme="dark" className="relative my-4 flex h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-hud-0 transition-colors group-hover:border-blue-500/30 sm:h-[450px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-12 -left-12 size-64 animate-pulse-slow rounded-full bg-red-600/25 blur-[80px]" />
            <div className="absolute -right-12 -bottom-14 size-72 animate-pulse-slow rounded-full bg-blue-600/30 blur-[90px]" />
            <div className="absolute top-1/2 left-1/2 size-80 -translate-1/2 rounded-full bg-indigo-500/15 blur-[100px]" />
          </div>
          <div aria-hidden className="dot-matrix pointer-events-none absolute inset-0 opacity-60" />
          <div aria-hidden className="pointer-events-none absolute size-[360px] animate-spin-slow rounded-full border border-dashed border-blue-400/15 sm:size-[410px]" />
          <div aria-hidden className="pointer-events-none absolute size-[290px] animate-spin-reverse rounded-full border border-red-500/20 border-y-transparent sm:size-[330px]" />

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <HeroNeuralScene />
            <div aria-hidden className="pointer-events-none absolute inset-0 animate-scan-line">
              <div className="mx-4 h-[2px] bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_var(--color-cyan-400)]" />
            </div>
          </div>

          {/* Layered HUD overlay diagnostics (decorative, hidden from screen readers) */}
          <div aria-hidden className="pointer-events-none absolute top-3 left-3 z-20 flex flex-col gap-2">
            <div className={pill}>
              <span aria-hidden className="size-2 animate-ping rounded-full bg-emerald-400" />
              <span>
                {core.label}: <strong className="font-semibold text-white">{core.value}</strong>
              </span>
            </div>
            <div className={pill}>
              <Zap aria-hidden className="size-[13px] text-blue-400" />
              <span>
                {latency.label}: <strong className="font-semibold text-blue-300">{latency.value}</strong>
              </span>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute top-3 right-3 z-20 hidden flex-col items-end gap-2 sm:flex">
            <div className={pill}>
              <Share2 aria-hidden className="size-[13px] text-red-400" />
              <span>
                {mesh.label}: <strong className="font-semibold text-red-400">{mesh.value}</strong>
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-black/75 px-2.5 py-0.5 font-mono text-[9px] text-slate-300">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
              <span>{heroConsole.telemetryTag}</span>
            </div>
          </div>

          {/* Bottom hemisphere telemetry readouts */}
          <div aria-hidden className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-red-500/35 bg-hud-1/95 px-2.5 py-1 font-mono text-[10px] text-red-300 shadow-md">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-brand-red" />
              <span>{heroConsole.lobes.left}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-blue-500/35 bg-hud-1/95 px-2.5 py-1 font-mono text-[10px] text-blue-300 shadow-md">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-blue-500" />
              <span>{heroConsole.lobes.right}</span>
            </div>
          </div>
        </div>

        {/* Lower real-time diagnostic bar */}
        <div className="relative z-20 space-y-2.5 pt-1">
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-silver">
              <SlidersHorizontal aria-hidden className="size-4 text-blue-400" />
              {capacity.label}
            </span>
            <span className="font-mono text-xs font-semibold text-white">{capacity.value}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/8 p-0.5">
            <div className="h-full w-full rounded-full bg-linear-to-r from-brand-blue via-indigo-500 to-brand-red" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 font-mono text-[11px] text-slate">
            <span>{capacity.protocol}</span>
            <span className="text-emerald-400">{capacity.status}</span>
          </div>
        </div>
      </TiltCard>
    </ScrollFade>
  );
}
