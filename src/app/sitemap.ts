import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { ROUTES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((path) => ({
    url: new URL(path, company.url).toString(),
    changeFrequency: "monthly",
    priority: path === ROUTES.home ? 1 : 0.7,
  }));
}
