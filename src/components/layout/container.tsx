import { cn } from "@/lib/utils";

/** Page-width column: 1440px max with DESIGN.md responsive margins. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-10", className)} {...props} />;
}
