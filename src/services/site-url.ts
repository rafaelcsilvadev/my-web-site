const FALLBACK_SITE_URL = "http://localhost:3000";

function invalidSiteUrl(raw: string): Error {
  return new Error(
    `Invalid NEXT_PUBLIC_SITE_URL: "${raw}" must be an absolute http(s) URL.`,
  );
}

export function normalizeSiteUrl(raw: string | undefined): string {
  const value = raw?.trim() ?? "";
  if (value === "") return FALLBACK_SITE_URL;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw invalidSiteUrl(value);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw invalidSiteUrl(value);
  }

  return value.replace(/\/+$/, "");
}
