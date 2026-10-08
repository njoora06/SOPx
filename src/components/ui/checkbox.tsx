"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

// DESIGN.md › Components › Checkboxes & Radio Controls
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-slate-border bg-obsidian-0 transition-[background-color,border-color,box-shadow] outline-none focus-visible:shadow-glow-focus disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-vermilion data-[state=checked]:bg-vermilion data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-[0_0_0_3px_rgb(239_68_68/0.25)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <CheckIcon className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
