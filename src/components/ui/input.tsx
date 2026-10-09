import * as React from "react"
import { cn } from "@/lib/utils"

// Design system input field (tokens in app/globals.css).
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded border border-carbon bg-obsidian-0 px-3 text-body-md text-white transition-[border-color,box-shadow] outline-none placeholder:text-slate disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-vermilion focus-visible:shadow-glow-focus",
        "aria-invalid:border-vermilion",
        className
      )}
      {...props}
    />
  )
}

export { Input }
