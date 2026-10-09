import { DraftingCompass, ShieldCheck } from "lucide-react";
import { Enter } from "@/components/animations/enter";
import { Reveal } from "@/components/animations/reveal";
import { ChannelsCard } from "@/components/contact/channels-card";
import { HeadquartersCard } from "@/components/contact/headquarters-card";
import { InfoCard } from "@/components/contact/info-card";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { Container } from "@/components/layout/container";
import { consultationForm, contactIntro, triageNote } from "@/data/contact";
import { SECTIONS } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id={SECTIONS.contact} className="relative w-full scroll-mt-20 border-t border-white/8 pt-20 pb-24">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 pb-12 text-center sm:pb-16">
          <Enter>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-surface-dim px-3.5 py-1.5 shadow-sm">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-vermilion opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-vermilion" />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-silver uppercase">{contactIntro.eyebrow}</span>
            </div>
          </Enter>
          <Enter index={1}>
            <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight sm:text-5xl">
              {contactIntro.titleStart} <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-red-400 via-rose-200 to-indigo-300 bg-clip-text text-transparent">{contactIntro.titleHighlight}</span>
            </h1>
          </Enter>
          <Enter index={2}>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-silver sm:text-base">{contactIntro.description}</p>
          </Enter>
          <Enter index={3}>
            <ul className="flex flex-wrap items-center justify-center gap-6 pt-3 font-mono text-xs text-slate-300">
              {contactIntro.badges.map(({ label, icon: Icon, className }) => (
                <li key={label} className="flex items-center gap-1.5 rounded-lg border border-white/6 bg-obsidian-2/80 px-3 py-1.5">
                  <Icon className={`size-4 ${className}`} aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Enter>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Consultation form */}
          <Enter index={4} className="lg:col-span-7">
            <InfoCard className="p-6 shadow-2xl sm:p-9">
              <div className="mb-6 flex items-center justify-between border-b border-white/6 pb-5">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
                    <span>{consultationForm.title}</span>
                    <span className="rounded border border-vermilion/20 bg-vermilion/10 px-2 py-0.5 font-mono text-xs text-vermilion">{consultationForm.tag}</span>
                  </h2>
                  <p className="mt-1 text-xs text-silver sm:text-sm">{consultationForm.description}</p>
                </div>
                <DraftingCompass className="hidden size-6 shrink-0 text-slate sm:block" aria-hidden />
              </div>
              <ConsultationForm />
            </InfoCard>
          </Enter>

          {/* Corporate information */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal index={1}>
              <ChannelsCard />
            </Reveal>

            <Reveal index={2}>
              <HeadquartersCard />
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
