import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  appendToGoogleSheet: vi.fn(),
  sendNotificationEmail: vi.fn(),
  rateLimit: vi.fn(),
  ip: "203.0.113.7",
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": `${mocks.ip}, 10.0.0.1` }),
}));
vi.mock("@/lib/google-sheets", () => ({ appendToGoogleSheet: mocks.appendToGoogleSheet }));
vi.mock("@/lib/email", () => ({ sendNotificationEmail: mocks.sendNotificationEmail }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));

const { submitContact } = await import("./enquiry");

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "We need help modernising our stack.",
  focusAreas: ["Cloud & DevOps" as const],
  nda: true,
};

describe("submitContact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockResolvedValue(true);
    mocks.appendToGoogleSheet.mockResolvedValue(undefined);
    mocks.sendNotificationEmail.mockResolvedValue({ skipped: false });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("saves the enquiry and sends the notification", async () => {
    await expect(submitContact(valid)).resolves.toEqual({ ok: true });
    expect(mocks.appendToGoogleSheet).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Ada Lovelace", email: "ada@example.com", focusAreas: "Cloud & DevOps", nda: "Yes" }),
    );
    expect(mocks.sendNotificationEmail).toHaveBeenCalledWith(expect.objectContaining({ replyTo: "ada@example.com" }));
  });

  it("rate-limits by the first forwarded IP", async () => {
    await submitContact(valid);
    expect(mocks.rateLimit).toHaveBeenCalledWith(`contact:${mocks.ip}`, expect.any(Object));
  });

  it("refuses when the client is over the limit", async () => {
    mocks.rateLimit.mockResolvedValue(false);
    const result = await submitContact(valid);
    expect(result.ok).toBe(false);
    expect(mocks.appendToGoogleSheet).not.toHaveBeenCalled();
  });

  it("rejects invalid input without saving", async () => {
    const result = await submitContact({ ...valid, email: "nope" });
    expect(result.ok).toBe(false);
    expect(mocks.appendToGoogleSheet).not.toHaveBeenCalled();
  });

  it("silently accepts a filled honeypot without saving", async () => {
    await expect(submitContact({ ...valid, website: "http://spam.example" })).resolves.toEqual({ ok: true });
    expect(mocks.appendToGoogleSheet).not.toHaveBeenCalled();
    expect(mocks.sendNotificationEmail).not.toHaveBeenCalled();
  });

  it("reports a failure when the sheet write fails", async () => {
    mocks.appendToGoogleSheet.mockRejectedValue(new Error("sheet down"));
    const result = await submitContact(valid);
    expect(result.ok).toBe(false);
    expect(mocks.sendNotificationEmail).not.toHaveBeenCalled();
  });

  it("still succeeds when only the email fails, since the enquiry is saved", async () => {
    mocks.sendNotificationEmail.mockRejectedValue(new Error("resend down"));
    await expect(submitContact(valid)).resolves.toEqual({ ok: true });
  });
});
