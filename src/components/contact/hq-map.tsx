import { Compass, ExternalLink, MapPin } from "lucide-react";
import { headquarters } from "@/data/contact";

/** Stylised vector map of the Padrauna HQ area with a radar sweep. Stays dark in both themes. */
export function HqMap() {
  return (
    <div data-theme="dark" className="relative h-[260px] w-full overflow-hidden rounded-xl border border-white/10 bg-hud-0">
      <div aria-hidden className="tactical-grid pointer-events-none absolute inset-0 opacity-60" />
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full opacity-40" preserveAspectRatio="none" viewBox="0 0 460 260">
        <path d="M -20,180 Q 90,140 180,210 T 360,190 T 480,240" fill="none" className="stroke-blue-600" strokeDasharray="2 3" strokeWidth="2" />
        <path d="M -20,70 L 140,95 L 230,130 L 350,145 L 480,120" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
        <path d="M 120,-20 L 140,95 L 170,280" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <path d="M 230,-20 L 230,130 L 245,280" fill="none" stroke="rgba(239,68,68,0.4)" strokeDasharray="6 4" strokeWidth="2" />
        <path d="M 340,-20 L 350,145 L 390,280" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <rect fill="rgba(255,255,255,0.03)" height="35" stroke="rgba(255,255,255,0.08)" width="55" x="155" y="65" />
        <rect fill="rgba(255,255,255,0.03)" height="45" stroke="rgba(255,255,255,0.08)" width="70" x="250" y="70" />
        <rect fill="rgba(239,68,68,0.04)" height="50" stroke="rgba(239,68,68,0.2)" width="75" x="180" y="115" />
        <rect fill="rgba(255,255,255,0.02)" height="35" stroke="rgba(255,255,255,0.06)" width="60" x="110" y="130" />
        <circle cx="230" cy="130" fill="none" r="50" stroke="rgba(239,68,68,0.15)" strokeDasharray="3 3" />
        <circle cx="230" cy="130" fill="none" r="95" stroke="rgba(255,255,255,0.05)" />
      </svg>

      {/* Radar sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[190px] -translate-x-1/2 -translate-y-1/2 animate-radar-sweep rounded-full opacity-30"
        style={{ background: "conic-gradient(from 0deg, rgba(239,68,68,0.4) 0deg, transparent 65deg, transparent 360deg)" }}
      />

      {/* HQ pin */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div aria-hidden className="relative flex items-center justify-center">
          <span className="absolute inline-flex size-14 animate-ping-radar rounded-full bg-vermilion opacity-40" />
          <span className="absolute inline-flex size-8 rounded-full bg-vermilion/30 blur-sm" />
          <div className="relative flex size-8 items-center justify-center rounded-full border border-red-200 bg-linear-to-br from-red-500 to-vermilion text-white shadow-[0_0_20px_rgba(239,68,68,1)]">
            <MapPin className="size-[18px]" />
          </div>
        </div>
        <div className="pointer-events-auto mt-2 rounded-lg border border-red-500/30 bg-obsidian-0/95 px-3 py-1.5 text-center shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] font-bold text-white">
            <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-vermilion" />
            <span>{headquarters.marker.title}</span>
          </div>
          <div className="font-mono text-[9px] text-slate-400">{headquarters.marker.subtitle}</div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-obsidian-0/90 px-2.5 py-1 font-mono text-[10px] text-slate-300 backdrop-blur-md">
          <Compass className="size-3.5 text-vermilion" aria-hidden />
          <span>{headquarters.coordinates}</span>
        </div>
        <div className="hidden items-center gap-1 rounded-md border border-white/10 bg-obsidian-0/90 px-2 py-1 font-mono text-[10px] text-emerald-400 sm:flex">
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
          <span>{headquarters.area}</span>
        </div>
      </div>

      {/* Zoom controls, as drawn in the design (the view is fixed). */}
      <div aria-hidden className="absolute top-3 right-3 z-30 flex flex-col gap-1">
        {["+", "-"].map((s) => (
          <span key={s} className="flex size-6 items-center justify-center rounded border border-white/10 bg-obsidian-0/85 text-xs text-slate-300">
            {s}
          </span>
        ))}
      </div>

      {/* Bottom HUD */}
      <div className="absolute inset-x-3 bottom-3 z-30 flex items-center justify-between gap-2">
        <span className="rounded border border-white/8 bg-obsidian-0/90 px-2 py-1 font-mono text-[10px] text-slate-400">{headquarters.mapPin}</span>
        <a
          href={headquarters.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-lg bg-vermilion px-3 py-1.5 font-mono text-[11px] font-semibold text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all outline-none hover:bg-red-500 focus-visible:shadow-glow-focus"
        >
          <span>{headquarters.mapsLabel}</span>
          <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
