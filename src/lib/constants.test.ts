import { describe, expect, it } from "vitest";
import { activeNavHref, MAIN_NAV, ROUTES, SECTIONS } from "./constants";

describe("activeNavHref", () => {
  it("highlights the route itself on standalone pages", () => {
    expect(activeNavHref("/about", SECTIONS.services)).toBe("/about");
  });

  it("highlights the homepage section in view", () => {
    expect(activeNavHref("/", SECTIONS.industries)).toBe(`/#${SECTIONS.industries}`);
  });

  it("maps the top of the homepage to Home", () => {
    expect(activeNavHref("/", null)).toBe("/");
  });
});

describe("navigation", () => {
  it("only links to routes that exist (or homepage sections)", () => {
    const routes = new Set<string>(Object.values(ROUTES));
    for (const { href } of MAIN_NAV) {
      expect(href.startsWith("/#") || routes.has(href), href).toBe(true);
    }
  });
});
