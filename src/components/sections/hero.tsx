import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight, ChevronDown, Share2, SlidersHorizontal, Zap } from "lucide-react";
import { ScrollFade } from "@/components/animations/scroll-fade";
import { TiltCard } from "@/components/animations/tilt-card";
import { SectionLink } from "@/components/navigation/section-link";
import { company } from "@/data/company";
import { hero } from "@/data/home";
import { CONSULTATION_HREF, SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { HeroNeuralScene } from "./hero-neural-scene";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** The hero uses its own typefaces; remap the site font variables within it. */
const heroFonts = cn(
  jakarta.variable,
  jetbrainsMono.variable,
  "font-sans [--font-geist:var(--font-jakarta)] [--font-sora:var(--font-jakarta)] [--font-geist-mono:var(--font-jetbrains)]",
);

const metricTone = {
  blue: { text: "text-blue-400", corner: "bg-blue-500/10" },
  red: { text: "text-red-400", corner: "bg-red-500/10" },
} as const;

const pill =
  "inline-flex items-center gap-2 rounded-md border border-white/12 bg-[#0b0e14]/90 px-2.5 py-1 font-mono text-[10px] text-slate-300 shadow-lg backdrop-blur-md";

export function Hero() {
  return (
    <section className={cn(heroFonts, "grid-backdrop relative w-full overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32")}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-[#08090d]/60 to-[#08090d]" />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left column: positioning and accents */}
          <div className="z-10 flex flex-col gap-6 lg:col-span-6">
            <div className="hero-enter self-start">
            <ScrollFade>
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/9 bg-white/4 px-3.5 py-1.5 shadow-sm backdrop-blur-md transition-transform duration-300">
                <span aria-hidden className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#f50c0c] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#f50c0c]" />
                </span>
                <span className="font-mono text-[11px] font-medium tracking-wider text-slate-300 uppercase">{hero.badge}</span>
                <span aria-hidden className="text-white/20">|</span>
                <span className="font-mono text-[11px] tracking-wider text-blue-400">{hero.badgeMeta}</span>
              </div>
            </ScrollFade>
            </div>

            <h1 style={{ "--enter-step": 1 } as React.CSSProperties} className="hero-enter text-4xl leading-[1.12] font-extrabold tracking-[-0.035em] text-white sm:text-5xl lg:text-[54px]">
              {hero.titleStart}{" "}
              <Highlight tone="blue">{hero.highlightA}</Highlight>,{" "}
              <Highlight tone="red">{hero.highlightB}</Highlight>, {hero.titleEnd}
            </h1>

            <p style={{ "--enter-step": 2 } as React.CSSProperties} className="hero-enter max-w-xl text-base leading-relaxed font-normal text-[#94a3b8] sm:text-lg">{company.description}</p>

            <div style={{ "--enter-step": 3 } as React.CSSProperties} className="hero-enter flex flex-wrap items-center gap-4 pt-2">
              <SectionLink
                href={CONSULTATION_HREF}
                className="group relative inline-flex transform items-center gap-2.5 rounded-xl border border-white/10 bg-linear-to-r from-[#f50c0c] via-[#e30b0b] to-[#c70909] px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_30px_rgba(245,12,12,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(245,12,12,0.65)]"
              >
                <span>Get a Consultation</span>
                <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
              </SectionLink>
              <SectionLink
                href={`#${SECTIONS.services}`}
                className="inline-flex transform items-center gap-2 rounded-xl border border-white/9 bg-[#0f141f]/70 px-6 py-3.5 text-sm font-medium tracking-wide text-slate-200 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#151c2c] hover:text-white"
              >
                <span>Explore Services</span>
                <ChevronDown aria-hidden className="size-4.5 text-[#94a3b8]" />
              </SectionLink>
            </div>

            <dl style={{ "--enter-step": 4 } as React.CSSProperties} className="hero-enter mt-3 grid grid-cols-3 gap-3 border-t border-white/7 pt-6">
              {hero.metrics.map((metric) => {
                const tone = metric.accent ? metricTone[metric.accent] : undefined;
                return (
                  <TiltCard
                    key={metric.label}
                    className="transform overflow-hidden rounded-xl border border-white/6 bg-[#0e121a]/70 p-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    {tone && (
                      <div aria-hidden className={cn("pointer-events-none absolute top-0 right-0 size-12 rounded-bl-full", tone.corner)} />
                    )}
                    <dt className="mb-1 font-mono text-[10px] tracking-widest text-[#64748b] uppercase">{metric.label}</dt>
                    <dd className={cn("text-sm font-semibold tracking-tight sm:text-base", tone ? tone.text : "text-white")}>
                      {metric.value}
                    </dd>
                    <dd className="mt-0.5 font-mono text-[10px] text-slate-400">{metric.meta}</dd>
                  </TiltCard>
                );
              })}
            </dl>
          </div>

          {/* Right column: interactive 3D neural AI brain and telemetry HUD */}
          <div className="hero-enter-visual lg:col-span-6">
            <ScrollFade className="relative">
              <div aria-hidden className="absolute -inset-1 rounded-3xl bg-linear-to-tr from-[#0b2fa3]/35 via-transparent to-[#f50c0c]/30 opacity-75 blur-2xl" />

              <TiltCard className="group overflow-hidden rounded-2xl border border-white/12 bg-[#0c1017]/90 p-5 shadow-2xl backdrop-blur-2xl sm:p-6">
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
                        SOPX Neural AI &amp; Robotics Core
                      </span>
                      <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-red-400 uppercase">
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] text-blue-400 shadow-[0_0_12px_rgba(11,47,163,0.35)]">
                      <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-blue-400" />
                      Synaptic Mesh
                    </span>
                  </div>
                </div>

                {/* Visual centrepiece: interactive 3D WebGL neural scene */}
                <div className="relative my-4 flex h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#05070c] transition-colors group-hover:border-blue-500/30 sm:h-[450px]">
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
                    <div aria-hidden className="pointer-events-none absolute inset-x-4 h-[2px] animate-scan-line bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]" />
                  </div>

                  {/* Layered HUD overlay diagnostics */}
                  <div className="pointer-events-none absolute top-3 left-3 z-20 flex flex-col gap-2">
                    <div className={pill}>
                      <span aria-hidden className="size-2 animate-ping rounded-full bg-emerald-400" />
                      <span>
                        Cognitive Core: <strong className="font-semibold text-white">Online v4.8</strong>
                      </span>
                    </div>
                    <div className={pill}>
                      <Zap aria-hidden className="size-[13px] text-blue-400" />
                      <span>
                        Synaptic Latency: <strong className="font-semibold text-blue-300">1.2ms</strong>
                      </span>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute top-3 right-3 z-20 hidden flex-col items-end gap-2 sm:flex">
                    <div className={pill}>
                      <Share2 aria-hidden className="size-[13px] text-red-400" />
                      <span>
                        Synaptic Mesh: <strong className="font-semibold text-red-400">99.98% Active</strong>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-black/75 px-2.5 py-0.5 font-mono text-[9px] text-slate-300">
                      <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
                      <span>NEURAL AI &amp; ROBOTICS CORE Telemetry</span>
                    </div>
                  </div>

                  {/* Bottom hemisphere telemetry readouts */}
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-red-500/35 bg-[#0c1017]/95 px-2.5 py-1 font-mono text-[10px] text-red-300 shadow-md backdrop-blur-md">
                      <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-[#f50c0c]" />
                      <span>Left Lobe: Logic &amp; Execution</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-blue-500/35 bg-[#0c1017]/95 px-2.5 py-1 font-mono text-[10px] text-blue-300 shadow-md backdrop-blur-md">
                      <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-blue-500" />
                      <span>Right Lobe: Infrastructure &amp; Defense</span>
                    </div>
                  </div>
                </div>

                {/* Lower real-time diagnostic bar */}
                <div className="relative z-20 space-y-2.5 pt-1">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-[#94a3b8]">
                      <SlidersHorizontal aria-hidden className="size-4 text-blue-400" />
                      Integrated Engineering Capacity
                    </span>
                    <span className="font-mono text-xs font-semibold text-white">Comprehensive Lifecycle</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/8 p-0.5">
                    <div className="h-full w-full rounded-full bg-linear-to-r from-[#0b2fa3] via-indigo-500 to-[#f50c0c]" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 font-mono text-[11px] text-[#64748b]">
                    <span>Protocol: Tailored Architectures</span>
                    <span className="text-emerald-400">Aligned with Verified Objectives</span>
                  </div>
                </div>
              </TiltCard>
            </ScrollFade>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlight({ tone, children }: { tone: "blue" | "red"; children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-1">
      <span
        className={cn(
          "relative z-10 bg-clip-text text-transparent",
          tone === "blue" ? "bg-linear-to-r from-blue-300 via-indigo-200 to-white" : "bg-linear-to-r from-red-400 via-rose-300 to-amber-200",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-1.5 z-0 h-2.5 rounded",
          tone === "blue" ? "-rotate-1 bg-[#0b2fa3]/50" : "rotate-1 bg-[#f50c0c]/40",
        )}
      />
    </span>
  );
}
