import { Building2, Clock, Compass, DraftingCompass, ExternalLink, MailCheck, MapPin, Phone, PhoneCall, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { Container } from "@/components/layout/container";
import { consultationForm, contactChannels, contactIntro, headquarters, triageNote } from "@/data/contact";
import { SECTIONS } from "@/lib/constants";
import { CopyEmailButton } from "./copy-email-button";

const card = "relative overflow-hidden rounded-2xl border border-white/8 bg-surface-dim/95 backdrop-blur-xl";

/** 2.5px vermilion hairline across the top edge of each card. */
function AccentLine() {
  return <div aria-hidden className="absolute inset-x-0 top-0 h-[2.5px] bg-linear-to-r from-transparent via-vermilion to-transparent" />;
}

/** Stylised vector map of the Padrauna HQ area with a radar sweep. */
function HqMap() {
  return (
    <div className="relative h-[260px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090e]">
      <div aria-hidden className="tactical-grid pointer-events-none absolute inset-0 opacity-60" />
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full opacity-40" preserveAspectRatio="none" viewBox="0 0 460 260">
        <path d="M -20,180 Q 90,140 180,210 T 360,190 T 480,240" fill="none" stroke="#2563eb" strokeDasharray="2 3" strokeWidth="2" />
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

export function ContactSection() {
  const { phone, email, hours } = contactChannels;

  return (
    <section id={SECTIONS.contact} className="relative w-full scroll-mt-20 border-t border-white/8 pt-20 pb-24">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 pb-12 text-center sm:pb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-surface-dim px-3.5 py-1.5 shadow-sm">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-vermilion opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-vermilion" />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-silver uppercase">{contactIntro.eyebrow}</span>
            </div>
          </Reveal>
          <Reveal index={1}>
            <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight sm:text-5xl">
              {contactIntro.titleStart} <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-red-400 via-rose-200 to-indigo-300 bg-clip-text text-transparent">{contactIntro.titleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-silver sm:text-base">{contactIntro.description}</p>
          </Reveal>
          <Reveal index={3}>
            <ul className="flex flex-wrap items-center justify-center gap-6 pt-3 font-mono text-xs text-slate-300">
              {contactIntro.badges.map(({ label, icon: Icon, className }) => (
                <li key={label} className="flex items-center gap-1.5 rounded-lg border border-white/6 bg-obsidian-2/80 px-3 py-1.5">
                  <Icon className={`size-4 ${className}`} aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Consultation form */}
          <Reveal className="lg:col-span-7">
            <div className={`${card} p-6 shadow-2xl sm:p-9`}>
              <AccentLine />
              <div className="mb-6 flex items-center justify-between border-b border-white/6 pb-5">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
                    <span>{consultationForm.title}</span>
                    <span className="rounded border border-vermilion/20 bg-vermilion/10 px-2 py-0.5 font-mono text-xs text-vermilion">{consultationForm.tag}</span>
                  </h3>
                  <p className="mt-1 text-xs text-silver sm:text-sm">{consultationForm.description}</p>
                </div>
                <DraftingCompass className="hidden size-6 shrink-0 text-slate sm:block" aria-hidden />
              </div>
              <ConsultationForm />
            </div>
          </Reveal>

          {/* Corporate information */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal index={1}>
              <div className={`${card} p-6 shadow-xl`}>
                <AccentLine />
                <div className="mb-4 flex items-center justify-between border-b border-white/6 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-lg border border-vermilion/30 bg-vermilion/15 text-vermilion">
                      <Building2 className="size-4" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-semibold tracking-wider uppercase">{contactChannels.title}</h3>
                      <p className="text-[11px] text-slate">{contactChannels.description}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">{contactChannels.status}</span>
                </div>

                <div className="space-y-3.5">
                  <div className="group flex items-start justify-between gap-3 rounded-xl border border-white/6 bg-obsidian-2/70 p-3.5 transition-all hover:border-vermilion/30">
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-obsidian-0 text-vermilion transition-colors group-hover:bg-vermilion/10">
                        <PhoneCall className="size-[18px]" aria-hidden />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] tracking-wider text-slate uppercase">{phone.label}</div>
                        <a href={phone.href} className="mt-0.5 block text-sm font-semibold tracking-wide text-white transition-colors group-hover:text-vermilion">
                          {phone.display}
                        </a>
                        <p className="mt-0.5 text-[11px] text-slate-400">{phone.note}</p>
                      </div>
                    </div>
                    <a
                      href={phone.href}
                      title="Call directly"
                      aria-label={`Call ${phone.display}`}
                      className="flex shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/4 p-2 text-slate-400 transition-all outline-none hover:bg-vermilion hover:text-white focus-visible:shadow-glow-focus"
                    >
                      <Phone className="size-4" aria-hidden />
                    </a>
                  </div>

                  <div className="group flex items-start justify-between gap-3 rounded-xl border border-white/6 bg-obsidian-2/70 p-3.5 transition-all hover:border-vermilion/30">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-obsidian-0 text-vermilion transition-colors group-hover:bg-vermilion/10">
                        <MailCheck className="size-[18px]" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] tracking-wider text-slate uppercase">{email.label}</div>
                        <a href={`mailto:${email.address}`} className="mt-0.5 block font-mono text-sm font-semibold break-all text-white transition-colors group-hover:text-vermilion">
                          {email.address}
                        </a>
                        <p className="mt-0.5 text-[11px] text-slate-400">{email.note}</p>
                      </div>
                    </div>
                    <CopyEmailButton email={email.address} />
                  </div>

                  <div className="flex items-center justify-between gap-2 rounded-xl border border-white/6 bg-obsidian-2/40 p-3 text-xs">
                    <div className="flex items-center gap-2 text-silver">
                      <Clock className="size-4 shrink-0 text-slate-400" aria-hidden />
                      <span>
                        {hours.label} <strong className="text-white">{hours.value}</strong>
                      </span>
                    </div>
                    <span className="shrink-0 rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">{hours.tag}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal index={2}>
              <div className={`${card} p-6 shadow-xl`}>
                <AccentLine />
                <div className="mb-3 flex items-start justify-between border-b border-white/6 pb-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-[18px] text-vermilion" aria-hidden />
                      <h3 className="font-mono text-xs font-semibold tracking-wider uppercase">{headquarters.title}</h3>
                    </div>
                    <address className="mt-1 text-xs leading-relaxed font-medium text-slate-300 not-italic">{headquarters.address}</address>
                  </div>
                  <span className="ml-2 shrink-0 rounded border border-white/8 bg-obsidian-2 px-2 py-0.5 font-mono text-[10px] text-slate">{headquarters.pin}</span>
                </div>
                <HqMap />
              </div>
            </Reveal>

            <Reveal index={3}>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-obsidian-2/40 p-4 font-mono text-xs text-slate">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-[18px] shrink-0 text-emerald-400" aria-hidden />
                  <span>{triageNote.label}</span>
                </div>
                <span className="text-right text-slate-400">{triageNote.meta}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
