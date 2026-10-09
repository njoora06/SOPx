import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ScrollFade } from "@/components/animations/scroll-fade";
import { TiltCard } from "@/components/animations/tilt-card";
import { SectionLink } from "@/components/navigation/section-link";
import { company } from "@/data/company";
import { hero } from "@/data/home";
import { CONSULTATION_HREF, SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { HeroConsole } from "./hero-console";

// Both are variable fonts: without `weight`, each loads as one file covering every weight.
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

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

export function Hero() {
  return (
    <section className={cn(heroFonts, "grid-backdrop relative w-full overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32")}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-obsidian-0/60 to-obsidian-0" />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left column: positioning and accents */}
          <div className="z-10 flex flex-col gap-6 lg:col-span-6">
            <div className="hero-enter self-start">
            <ScrollFade>
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/9 bg-white/4 px-3.5 py-1.5 shadow-sm backdrop-blur-md transition-transform duration-300">
                <span aria-hidden className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-red" />
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

            <p style={{ "--enter-step": 2 } as React.CSSProperties} className="hero-enter max-w-xl text-base leading-relaxed font-normal text-silver sm:text-lg">{company.description}</p>

            <div style={{ "--enter-step": 3 } as React.CSSProperties} className="hero-enter flex flex-wrap items-center gap-4 pt-2">
              <SectionLink
                href={CONSULTATION_HREF}
                className="group relative inline-flex transform items-center gap-2.5 rounded-xl border border-primary-foreground/10 bg-linear-to-r from-brand-red via-brand-red-mid to-brand-red-deep px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_0_30px_rgba(245,12,12,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(245,12,12,0.65)] light:shadow-[0_10px_28px_-10px_rgba(220,38,38,0.6)] light:hover:shadow-[0_16px_36px_-12px_rgba(220,38,38,0.7)]"
              >
                <span>Get a Consultation</span>
                <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
              </SectionLink>
              <SectionLink
                href={`#${SECTIONS.services}`}
                className="inline-flex transform items-center gap-2 rounded-xl border border-white/9 bg-hud-2/70 px-6 py-3.5 text-sm font-medium tracking-wide text-slate-200 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-hud-3 hover:text-white light:bg-obsidian-1/80 light:hover:bg-obsidian-1 light:hover:shadow-md"
              >
                <span>Explore Services</span>
                <ChevronDown aria-hidden className="size-4.5 text-silver" />
              </SectionLink>
            </div>

            <div style={{ "--enter-step": 4 } as React.CSSProperties} className="hero-enter mt-3 grid grid-cols-3 gap-3 border-t border-white/7 pt-6">
              {hero.metrics.map((metric) => {
                const tone = metric.accent ? metricTone[metric.accent] : undefined;
                return (
                  <TiltCard
                    key={metric.label}
                    className="transform overflow-hidden rounded-xl border border-white/6 bg-hud-1/70 p-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 light:bg-obsidian-1/80 light:shadow-sm light:hover:shadow-md"
                  >
                    {tone && (
                      <div aria-hidden className={cn("pointer-events-none absolute top-0 right-0 size-12 rounded-bl-full", tone.corner)} />
                    )}
                    {/* One <dl> per card: TiltCard adds decorative <div>s, which a shared <dl> may not contain. */}
                    <dl>
                      <dt className="mb-1 font-mono text-[10px] tracking-widest text-slate uppercase">{metric.label}</dt>
                      <dd className={cn("text-sm font-semibold tracking-tight sm:text-base", tone ? tone.text : "text-white")}>
                        {metric.value}
                      </dd>
                      <dd className="mt-0.5 font-mono text-[10px] text-slate-400">{metric.meta}</dd>
                    </dl>
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Right column: interactive 3D neural AI brain and telemetry HUD */}
          <div className="hero-enter-visual lg:col-span-6">
            <HeroConsole />
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
          tone === "blue" ? "-rotate-1 bg-brand-blue/50 light:bg-brand-blue/12" : "rotate-1 bg-brand-red/40 light:bg-brand-red/12",
        )}
      />
    </span>
  );
}
