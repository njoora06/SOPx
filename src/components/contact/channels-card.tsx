import type { LucideIcon } from "lucide-react";
import { Building2, Clock, MailCheck, Phone, PhoneCall } from "lucide-react";
import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { contactChannels } from "@/data/contact";
import { cn } from "@/lib/utils";
import { InfoCard } from "./info-card";

interface ChannelRowProps {
  icon: LucideIcon;
  label: string;
  href: string;
  value: string;
  note: string;
  valueClassName?: string;
  /** Button on the right, e.g. call or copy. */
  action: React.ReactNode;
}

/** One way to reach the team: icon, label, link and a quick action. */
function ChannelRow({ icon: Icon, label, href, value, note, valueClassName, action }: ChannelRowProps) {
  return (
    <div className="group flex items-start justify-between gap-3 rounded-xl border border-white/6 bg-obsidian-2/70 p-3.5 transition-all hover:border-vermilion/30">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-obsidian-0 text-vermilion transition-colors group-hover:bg-vermilion/10">
          <Icon className="size-[18px]" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[10px] tracking-wider text-slate uppercase">{label}</div>
          <a href={href} className={cn("mt-0.5 block text-sm font-semibold text-white transition-colors group-hover:text-vermilion", valueClassName)}>
            {value}
          </a>
          <p className="mt-0.5 text-[11px] text-slate-400">{note}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

/** Phone, email and opening hours. */
export function ChannelsCard() {
  const { phone, email, hours } = contactChannels;

  return (
    <InfoCard className="p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg border border-vermilion/30 bg-vermilion/15 text-vermilion">
            <Building2 className="size-4" aria-hidden />
          </div>
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-wider uppercase">{contactChannels.title}</h2>
            <p className="text-[11px] text-slate">{contactChannels.description}</p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">{contactChannels.status}</span>
      </div>

      <div className="space-y-3.5">
        <ChannelRow
          icon={PhoneCall}
          label={phone.label}
          href={phone.href}
          value={phone.display}
          note={phone.note}
          valueClassName="tracking-wide"
          action={
            <a
              href={phone.href}
              title="Call directly"
              aria-label={`Call ${phone.display}`}
              className="flex shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/4 p-2 text-slate-400 transition-all outline-none hover:bg-vermilion hover:text-primary-foreground focus-visible:shadow-glow-focus"
            >
              <Phone className="size-4" aria-hidden />
            </a>
          }
        />
        <ChannelRow
          icon={MailCheck}
          label={email.label}
          href={`mailto:${email.address}`}
          value={email.address}
          note={email.note}
          valueClassName="font-mono break-all"
          action={<CopyEmailButton email={email.address} />}
        />

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
    </InfoCard>
  );
}
