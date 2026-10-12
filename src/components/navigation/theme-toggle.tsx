"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_THEME, getTheme, setTheme, subscribeTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const icon = "absolute size-[18px] transition-[rotate,scale,opacity] duration-300 ease-out";

/** Light / dark switch. The icon is picked in CSS, so it is right on first paint. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => DEFAULT_THEME);
  const next = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} theme`;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={(e) => {
        // The new theme grows out of the button (also for keyboard presses).
        const r = e.currentTarget.getBoundingClientRect();
        setTheme(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className="relative overflow-hidden hover:text-white active:scale-95"
    >
      {/* Dark theme shows the sun (go light); light theme shows the moon. */}
      <Sun aria-hidden data-theme-icon className={cn(icon, "light:scale-50 light:-rotate-90 light:opacity-0")} />
      <Moon aria-hidden data-theme-icon className={cn(icon, "scale-50 rotate-90 opacity-0 light:scale-100 light:rotate-0 light:opacity-100")} />
    </Button>
  );
}
