import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { appendToGoogleSheet, toSheetText } from "./google-sheets";

describe("toSheetText", () => {
  it.each(["=SUM(A1)", "+91 98765", "-2+3", "@corp", "\tx", "\rx"])("forces %j to plain text", (value) => {
    expect(toSheetText(value)).toBe(`'${value}`);
  });

  it.each(["Ada", "ada@example.com", "2026-10-09T06:39:54.157Z", ""])("leaves %j unchanged", (value) => {
    expect(toSheetText(value)).toBe(value);
  });
});

describe("appendToGoogleSheet", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("GOOGLE_SHEETS_WEB_APP_URL", "https://script.example.com/exec");
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("posts the escaped fields as a form body", async () => {
    fetchMock.mockResolvedValue(new Response('{"result":"success"}'));
    await appendToGoogleSheet({ name: "=HYPERLINK(\"http://evil\")", email: "a@example.com" });

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://script.example.com/exec");
    const body = new URLSearchParams(init.body as URLSearchParams);
    expect(body.get("name")).toBe("'=HYPERLINK(\"http://evil\")");
    expect(body.get("email")).toBe("a@example.com");
  });

  it("throws when the URL is not configured", async () => {
    vi.stubEnv("GOOGLE_SHEETS_WEB_APP_URL", "");
    await expect(appendToGoogleSheet({})).rejects.toThrow("not set");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("throws on an HTTP error", async () => {
    fetchMock.mockResolvedValue(new Response("nope", { status: 500 }));
    await expect(appendToGoogleSheet({})).rejects.toThrow("500");
  });

  it("throws when the script reports an error", async () => {
    fetchMock.mockResolvedValue(new Response('{"result":"error","error":"bad header"}'));
    await expect(appendToGoogleSheet({})).rejects.toThrow("bad header");
  });

  it("accepts a non-JSON success body", async () => {
    fetchMock.mockResolvedValue(new Response("OK"));
    await expect(appendToGoogleSheet({})).resolves.toBeUndefined();
  });
});
