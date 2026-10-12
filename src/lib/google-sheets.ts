import "server-only";
import { getServerEnv } from "@/lib/env";

/**
 * Sheets treats a cell starting with = + - @ (or a tab/CR) as a formula, so a
 * submitted value like `=IMPORTXML(...)` would run in the sheet. A leading
 * apostrophe forces plain text and is hidden in the cell.
 */
export function toSheetText(value: string) {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

/**
 * Appends one row to the Google Sheet through its Apps Script web app.
 * Sent as form-encoded fields so the script reads them from `e.parameter`;
 * each key must match a header in the sheet's first row.
 */
export async function appendToGoogleSheet(fields: Record<string, string>) {
  const { GOOGLE_SHEETS_WEB_APP_URL: url } = getServerEnv();
  if (!url) throw new Error("GOOGLE_SHEETS_WEB_APP_URL is not set");

  const safeFields = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, toSheetText(value)]));
  const res = await fetch(url, {
    method: "POST",
    body: new URLSearchParams(safeFields),
    cache: "no-store",
    // Apps Script cold starts regularly take 10s+; give it room so a slow but
    // successful write isn't reported as a failure (and then resubmitted).
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Google Sheets request failed: ${res.status}`);

  // Apps Script scripts commonly answer with JSON like { result: "success" | "error" }.
  const body = await res.text();
  try {
    const json = JSON.parse(body) as { result?: string; status?: string; error?: unknown };
    if (json.result === "error" || json.status === "error") {
      throw new Error(`Google Sheets script error: ${JSON.stringify(json.error ?? json)}`);
    }
  } catch (err) {
    if (!(err instanceof SyntaxError)) throw err; // non-JSON body after a 2xx is fine
  }
}
