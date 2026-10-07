import * as React from "react"
import { cn } from "@/lib/utils"

// DESIGN.md › Components › Modular Infrastructure Cards
function Card({
  className,
  beam = false,
  ...props
}: React.ComponentProps<"div"> & {
  /** Optional 1px gradient beam on the top edge (component health / activity tier). */
  beam?: boolean
}) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative flex flex-col gap-space-md rounded-lg border border-carbon bg-obsidian-1 p-space-lg text-card-foreground",
        beam &&
          "before:absolute before:inset-x-0 before:-top-px before:h-px before:rounded-t-lg before:bg-linear-to-r before:from-vermilion before:to-transparent",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-space-xs has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-headline-sm text-white", className)}
      {...props}
    />
  )
}

/** Geist monospace metadata subheading. */
function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-code-badge text-silver", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
