import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// DESIGN.md › Components › Badges & Status Chips
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded border px-2 py-0.5 text-label-caps whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // Live state: subdued crimson fill, vermilion hairline and text, pulsing dot.
        live: "border-vermilion/30 bg-vermilion/12 text-vermilion",
        // Neutral telemetry chip.
        neutral: "border-carbon bg-obsidian-2 text-silver",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function Badge({
  className,
  variant = "neutral",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {variant === "live" && !asChild && (
        <span aria-hidden className="size-1.5 rounded-full bg-vermilion animate-status-pulse" />
      )}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
