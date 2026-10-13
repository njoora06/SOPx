import { describe, expect, it } from "vitest";
import { footerServices, getService, services } from "./services";

describe("services", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("have a meta description that fits a search result", () => {
    for (const s of services) expect(s.metaDescription.length, s.slug).toBeLessThanOrEqual(165);
  });

  it("footer links point at existing services", () => {
    for (const { slug } of footerServices) expect(getService(slug), slug).toBeDefined();
  });
});
