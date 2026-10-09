import type { Metadata } from "next";
import { company } from "@/data/company";

/**
 * Open Graph fields every page shares. Next replaces a parent's `openGraph`
 * object instead of merging it, so pages that set their own must repeat these.
 */
export const sharedOpenGraph = {
  type: "website",
  siteName: company.name,
  locale: "en_IN",
  images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${company.name} logo` }],
} satisfies Metadata["openGraph"];

interface PageMetaOptions {
  title: string;
  description?: string;
  path?: string;
}

/** Builds consistent per-page metadata (title, canonical, Open Graph). */
export function createMetadata({ title, description, path = "/" }: PageMetaOptions): Metadata {
  const desc = description ?? company.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, title, description: desc, url: path },
    twitter: { card: "summary_large_image", title, description: desc },
  };
}
