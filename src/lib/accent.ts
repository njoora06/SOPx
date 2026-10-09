import type { Accent } from "@/types";

/** Class sets for the two accents used across content cards. */
export const accentStyles: Record<
  Accent,
  { text: string; tile: string; dot: string; chip: string }
> = {
  vermilion: {
    text: "text-vermilion",
    tile: "border-vermilion/20 bg-vermilion/10 text-vermilion",
    dot: "bg-vermilion",
    chip: "border-vermilion/30 bg-vermilion/12 text-vermilion",
  },
  silver: {
    text: "text-silver",
    tile: "border-silver/20 bg-silver/10 text-silver",
    dot: "bg-silver",
    chip: "border-carbon bg-obsidian-2 text-silver",
  },
};

/**
 * Elevation: Layer-1 surface whose hover lifts to the Layer-2
 * interactive state (vermilion edge at 40% with a crimson edge glow).
 */
export const interactiveCard =
  "rounded-lg border border-carbon bg-obsidian-1 hover:border-vermilion/40 hover:shadow-glow-hover";
