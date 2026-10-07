import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the DESIGN.md type scale so e.g. `text-title-md` is
// treated as a font size and not dropped next to a `text-white` colour.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-hero",
            "headline-lg",
            "headline-md",
            "headline-sm",
            "title-md",
            "body-lg",
            "body-md",
            "body-sm",
            "code-badge",
            "label-caps",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string, base: string) {
  return new URL(path, base).toString();
}
