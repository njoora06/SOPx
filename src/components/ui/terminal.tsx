import * as React from "react"
import { cn } from "@/lib/utils"

// DESIGN.md › Components › Telemetry Streamers & Log Terminal Containers
function Terminal({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terminal"
      role="log"
      className={cn(
        "overflow-auto rounded-lg border border-carbon bg-void p-space-md text-code-badge shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]",
        className
      )}
      {...props}
    />
  )
}

const levelStyles = {
  normal: "text-telemetry-normal", // green — normal telemetry
  critical: "text-vermilion", // critical system alerts
  routine: "text-silver", // routine computational logs
} as const

function TerminalLine({
  className,
  level = "routine",
  ...props
}: React.ComponentProps<"div"> & { level?: keyof typeof levelStyles }) {
  return (
    <div
      data-slot="terminal-line"
      data-level={level}
      className={cn("whitespace-pre-wrap tabular", levelStyles[level], className)}
      {...props}
    />
  )
}

export { Terminal, TerminalLine }
