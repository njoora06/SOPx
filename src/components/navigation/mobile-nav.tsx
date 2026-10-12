"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useActiveNavHref } from "@/hooks/use-active-section";
import { useScrollAfterClose } from "@/hooks/use-scroll-after-close";
import { MAIN_NAV } from "@/lib/constants";

/** Below 1280px (the `xl` breakpoint) the navigation collapses into an overlay drawer. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const activeHref = useActiveNavHref();
  const { scrollAfterClose, onCloseAutoFocus } = useScrollAfterClose();

  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    scrollAfterClose(href);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs p-space-lg pt-16" onCloseAutoFocus={onCloseAutoFocus}>
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => navigate(e, item.href)}
              aria-current={item.href === activeHref ? "true" : undefined}
              className="rounded px-3 py-2.5 text-title-md text-silver transition-colors outline-none hover:bg-white/4 hover:text-white focus-visible:shadow-glow-focus aria-[current=true]:bg-white/10 aria-[current=true]:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
