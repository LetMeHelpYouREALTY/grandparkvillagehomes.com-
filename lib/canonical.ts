import { siteConfig } from "@/lib/site-config";

const CANONICAL_HOST = "www.grandparkvillagehomes.com";

/**
 * Preferred origin for the URL Google should index.
 * Apex and localhost fall back to the production www host.
 */
export function getPreferredOrigin(hostHeader: string | null): string {
  const host = (hostHeader || "")
    .split(",")[0]
    .trim()
    .replace(/:\d+$/, "")
    .toLowerCase();

  if (!host || host === "localhost" || host.startsWith("127.")) {
    return siteConfig.url;
  }

  if (host === "grandparkvillagehomes.com" || host === CANONICAL_HOST) {
    return `https://${CANONICAL_HOST}`;
  }

  if (host === "heyberkshire.com") {
    return "https://www.heyberkshire.com";
  }

  return `https://${host}`;
}

export function getCanonicalUrl(hostHeader: string | null, pathname: string | null): string {
  const origin = getPreferredOrigin(hostHeader);
  const raw = (pathname || "/").split("?")[0].split("#")[0];
  const path = raw === "/" ? "/" : raw.replace(/\/+$/, "") || "/";
  return path === "/" ? `${origin}/` : `${origin}${path}`;
}
