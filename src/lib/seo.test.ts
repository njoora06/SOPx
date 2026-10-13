import { describe, expect, it } from "vitest";
import { isPlaceholderSocial } from "./seo";

describe("isPlaceholderSocial", () => {
  it("flags a platform's home page", () => {
    expect(isPlaceholderSocial("https://www.linkedin.com/")).toBe(true);
    expect(isPlaceholderSocial("https://x.com")).toBe(true);
  });

  it("passes a real profile URL", () => {
    expect(isPlaceholderSocial("https://www.linkedin.com/company/sopx-tech")).toBe(false);
  });
});
