import { MapPin } from "lucide-react";
import { headquarters } from "@/data/contact";
import { HqMap } from "./hq-map";
import { InfoCard } from "./info-card";

/** Registered address and the HQ map. */
export function HeadquartersCard() {
  return (
    <InfoCard className="p-6 shadow-xl">
      <div className="mb-3 flex items-start justify-between border-b border-white/6 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="size-[18px] text-vermilion" aria-hidden />
            <h2 className="font-mono text-xs font-semibold tracking-wider uppercase">{headquarters.title}</h2>
          </div>
          <address className="mt-1 text-xs leading-relaxed font-medium text-slate-300 not-italic">{headquarters.address}</address>
        </div>
        <span className="ml-2 shrink-0 rounded border border-white/8 bg-obsidian-2 px-2 py-0.5 font-mono text-[10px] text-slate">{headquarters.pin}</span>
      </div>
      <HqMap />
    </InfoCard>
  );
}
