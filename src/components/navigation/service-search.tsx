"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { Dialog } from "radix-ui";
import { SHOW_ALL_SERVICES_EVENT, serviceElementId } from "@/components/services/services-explorer";
import { serviceFilters, services } from "@/data/services";
import { useScrollAfterClose } from "@/hooks/use-scroll-after-close";
import { accentStyles } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

const categoryLabel = Object.fromEntries(serviceFilters.map((f) => [f.value, f.label]));

/** Every word of the query must appear somewhere in the service's text. */
function matches(service: Service, words: string[]) {
  const haystack = [service.title, service.summary, service.tag, categoryLabel[service.category], ...service.capabilities]
    .join(" ")
    .toLowerCase();
  return words.every((w) => haystack.includes(w));
}

/** Header search: filters the services and glides to the chosen card. Opens with ⌘K / Ctrl+K. */
export function ServiceSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  // The chosen card may be hidden by the category filter, so show all first.
  const { scrollAfterClose, onCloseAutoFocus } = useScrollAfterClose(() => window.dispatchEvent(new Event(SHOW_ALL_SERVICES_EVENT)));

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length ? services.filter((s) => matches(s, words)) : services;
  const active = Math.min(selected, results.length - 1);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setQuery("");
      setSelected(0);
    }
  };

  const choose = (service: Service) => {
    scrollAfterClose(`/#${serviceElementId(service.number)}`);
    setOpen(false);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setSelected((active + step + results.length) % results.length);
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="group hidden items-center gap-3 rounded-md border border-white/8 bg-obsidian-1 px-3.5 py-1.5 text-body-sm text-silver transition-colors outline-none hover:border-white/20 hover:text-white focus-visible:shadow-glow-focus md:inline-flex"
        >
          <Search className="size-4" aria-hidden />
          <span>Quick Search Services...</span>
          <kbd className="pointer-events-none inline-flex h-5 items-center rounded border border-white/6 bg-white/8 px-1.5 font-mono text-[10px] font-medium text-silver">
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-obsidian-0/70 backdrop-blur-sm light:bg-slate-900/25 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          onCloseAutoFocus={onCloseAutoFocus}
          className="fixed top-[12vh] left-1/2 z-50 flex max-h-[70vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-md border border-slate-border bg-obsidian-2 text-snow shadow-2xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">Search services</Dialog.Title>
          <Dialog.Description className="sr-only">Type to filter services, then press Enter to jump to one.</Dialog.Description>

          <div className="flex items-center gap-3 border-b border-white/8 px-4">
            <Search className="size-4 shrink-0 text-silver" aria-hidden />
            <input
              type="text"
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
              aria-autocomplete="list"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search services, e.g. cloud, security, AI…"
              className="h-14 w-full bg-transparent text-body-md text-white outline-none placeholder:text-slate"
            />
            <kbd className="pointer-events-none hidden h-5 items-center rounded border border-white/6 bg-white/8 px-1.5 font-mono text-[10px] font-medium text-silver sm:inline-flex">
              ESC
            </kbd>
          </div>

          {results.length ? (
            <ul ref={listRef} id={listId} role="listbox" aria-label="Services" className="overflow-y-auto p-2">
              {results.map((service, i) => {
                const { number, title, summary, icon: Icon, accent } = service;
                return (
                  <li
                    key={number}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => i !== active && setSelected(i)}
                    onClick={() => choose(service)}
                    className="group flex cursor-pointer items-center gap-3 rounded px-3 py-2.5 text-silver aria-selected:bg-white/8 aria-selected:text-white"
                  >
                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded border", accentStyles[accent].tile)}>
                      <Icon aria-hidden className="size-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body-md font-medium">{title}</span>
                      <span className="block truncate text-body-sm text-slate">{summary}</span>
                    </span>
                    <CornerDownLeft aria-hidden className="size-4 shrink-0 opacity-0 group-aria-selected:opacity-100" />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-10 text-center text-body-md text-silver">No services match “{query.trim()}”.</p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
