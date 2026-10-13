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
  images: [
    { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${company.name} — AI development and IT services company` },
  ],
} satisfies Metadata["openGraph"];

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending " | SOPX Tech" (for titles that already lead with the brand). */
  absoluteTitle?: boolean;
}

/** Builds consistent per-page metadata (title, description, canonical, Open Graph, Twitter). */
export function createMetadata({ title, description, path, absoluteTitle }: PageMetaOptions): Metadata {
  // Social cards don't get the title template, so add the brand there ourselves.
  const socialTitle = absoluteTitle ? title : `${title} | ${company.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, title: socialTitle, description, url: path },
    twitter: { card: "summary_large_image", title: socialTitle, description },
  };
}

/** A social link still pointing at the platform's home page rather than a real profile. */
export const isPlaceholderSocial = (href: string) => new URL(href).pathname === "/";

/** Absolute URL on the public site. */
export const absoluteUrl = (path: string) => new URL(path, company.url).toString();

/** Stable `@id`s so JSON-LD nodes on different pages refer to the same entities. */
export const ORGANIZATION_ID = absoluteUrl("/#organization");
export const WEBSITE_ID = absoluteUrl("/#website");
