import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { ROUTES, serviceHref } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";

/** Bump when page content changes; Google only trusts `lastModified` while it stays accurate. */
const CONTENT_UPDATED = new Date("2026-10-13");

const PRIORITY: Record<string, number> = { [ROUTES.home]: 1, [ROUTES.services]: 0.9 };

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.values(ROUTES), ...services.map((s) => serviceHref(s.slug))];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: PRIORITY[path] ?? (path.startsWith(`${ROUTES.services}/`) ? 0.8 : 0.7),
  }));
}
