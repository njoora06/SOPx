"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { Dialog } from "radix-ui";

const loadPanel = () => import("./service-search-panel");
const ServiceSearchPanel = dynamic(loadPanel, { ssr: false });

/**
 * Header search: filters the services and glides to the chosen card. Opens
 * with ⌘K / Ctrl+K. Icon-only until there's room for the label (2xl).
 */
export function ServiceSearch() {
  const [open, setOpen] = useState(false);
  // The panel mounts on first open and then stays, so closing can animate.
  const [used, setUsed] = useState(false);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    setUsed(true);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // `key` is missing on the synthetic keydown Chrome fires when autofilling a form.
      if (e.key?.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        setUsed(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Search services"
          // Start fetching the panel as soon as the user heads for the button.
          onPointerEnter={loadPanel}
          onFocus={loadPanel}
          className="group inline-flex size-11 shrink-0 items-center justify-center gap-3 rounded-md border border-white/8 bg-obsidian-1 text-body-sm whitespace-nowrap text-silver transition-colors outline-none hover:border-white/20 hover:text-white focus-visible:shadow-glow-focus md:size-10 2xl:h-auto 2xl:w-auto 2xl:px-3.5 2xl:py-1.5"
        >
          <Search className="size-4" aria-hidden />
          <span aria-hidden className="hidden 2xl:inline">Quick Search Services...</span>
          <kbd className="pointer-events-none hidden h-5 items-center rounded border border-white/6 bg-white/8 px-1.5 font-mono text-[10px] font-medium text-silver 2xl:inline-flex [@media(pointer:coarse)]:hidden">
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>

      {used && <ServiceSearchPanel onClose={() => setOpen(false)} />}
    </Dialog.Root>
  );
}
