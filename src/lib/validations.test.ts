import { describe, expect, it } from "vitest";
import { contactSchema, FOCUS_AREAS } from "./validations";
import { consultationForm } from "@/data/contact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "We need help modernising our stack.",
};

describe("contactSchema", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts optional fields left empty", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "", company: "" }).success).toBe(true);
  });

  it.each([
    ["short name", { name: "A" }],
    ["bad email", { email: "not-an-email" }],
    ["short message", { message: "hi" }],
    ["bad phone", { phone: "call me" }],
  ])("rejects a %s", (_, override) => {
    expect(contactSchema.safeParse({ ...valid, ...override }).success).toBe(false);
  });

  it("rejects line breaks in single-line fields", () => {
    expect(contactSchema.safeParse({ ...valid, name: "Ada\r\nBcc: x@y.z" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, company: "Acme\nCorp" }).success).toBe(false);
  });

  it("only accepts known focus areas", () => {
    expect(contactSchema.safeParse({ ...valid, focusAreas: ["Cybersecurity"] }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, focusAreas: ["Hacking"] }).success).toBe(false);
  });

  it("matches the focus areas offered by the form", () => {
    expect(consultationForm.focusAreas.map((f) => f.label)).toEqual([...FOCUS_AREAS]);
  });

  it("lets a filled honeypot through so the server can drop it silently", () => {
    expect(contactSchema.safeParse({ ...valid, website: "http://spam.example" }).success).toBe(true);
  });
});
