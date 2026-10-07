import type { Metadata } from "next";
import { company } from "@/data/company";

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
    openGraph: { title, description: desc, url: path },
    twitter: { title, description: desc },
  };
}
