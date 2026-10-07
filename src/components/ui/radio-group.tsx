"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

// DESIGN.md › Components › Checkboxes & Radio Controls: square 16px, 2px radius
// (pill shapes are reserved for micro-status indicators).
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "grid size-4 shrink-0 place-content-center rounded-sm border border-slate-border bg-obsidian-0 transition-[background-color,border-color,box-shadow] outline-none focus-visible:shadow-glow-focus disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-vermilion data-[state=checked]:bg-vermilion data-[state=checked]:shadow-[0_0_0_3px_rgb(239_68_68/0.25)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="size-1.5 bg-white" />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
