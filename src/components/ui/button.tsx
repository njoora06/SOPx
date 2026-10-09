import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Design system buttons (tokens in app/globals.css).
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded text-title-md whitespace-nowrap transition-all outline-none focus-visible:shadow-glow-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Solid vermilion → deep crimson on hover, white text, ambient vermilion halo.
        primary: "bg-vermilion text-primary-foreground shadow-glow-primary hover:bg-crimson",
        // Carbon surface with slate border; hover shifts edge to silver and text to white.
        secondary:
          "border border-slate-border bg-obsidian-2 text-snow hover:border-silver hover:text-white",
        // Transparent, muted silver text; hover adds a faint white fill.
        ghost: "bg-transparent text-silver hover:bg-white/4",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
