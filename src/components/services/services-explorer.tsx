"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Reveal } from "@/components/animations/reveal";
import { serviceFilters, services } from "@/data/services";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/types";
import { ServiceCard } from "./service-card";

/** Element id of a service's card in the grid, used as a scroll target. */
export const serviceElementId = (number: string) => `service-${number}`;

/** Dispatched on `window` to clear the category filter so every card is in the DOM. */
export const SHOW_ALL_SERVICES_EVENT = "sopx:show-all-services";

/** Category tab strip + the services grid it filters. */
export function ServicesExplorer() {
  const [active, setActive] = useState<ServiceCategory | "all">("all");

  useEffect(() => {
    // Synchronous so the dispatcher can scroll to the card right after.
    const showAll = () => flushSync(() => setActive("all"));
    window.addEventListener(SHOW_ALL_SERVICES_EVENT, showAll);
    return () => window.removeEventListener(SHOW_ALL_SERVICES_EVENT, showAll);
  }, []);
  const visible = active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <>
      <Reveal>
        <div role="tablist" aria-label="Service categories" className="scrollbar-none mb-8 flex items-center gap-2 overflow-x-auto border-b border-white/6 pb-4">
          {serviceFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={active === f.value}
              aria-controls="services-grid"
              onClick={() => setActive(f.value)}
              className={cn(
                "rounded px-4 py-2 text-body-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:shadow-glow-focus",
                active === f.value
                  ? "border border-white/15 bg-white/10 font-semibold text-white"
                  : "border border-transparent text-silver hover:bg-white/4 hover:text-white",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div id="services-grid" role="tabpanel" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((service, i) => (
          <Reveal key={service.number} id={serviceElementId(service.number)} index={i % 3} variant="scale" className={cn("h-full", service.wide && active === "all" && "md:col-span-2")}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
