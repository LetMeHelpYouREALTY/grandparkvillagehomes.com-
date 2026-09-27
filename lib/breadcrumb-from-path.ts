import { getCanonicalUrl, getPreferredOrigin } from "@/lib/canonical";

const SEGMENT_LABELS: Record<string, string> = {
  "55-plus-communities": "55+ Communities",
  buyers: "Buyers",
  sellers: "Sellers",
  neighborhoods: "Neighborhoods",
  "grand-park": "Grand Park",
  glenrock: "Glenrock",
  park: "Central Park",
  builders: "Builders",
  "first-time-buyers": "First-Time Buyers",
  "luxury-homes-las-vegas": "Luxury Homes",
  "california-relocator": "California Relocator",
  "home-valuation": "Home Valuation",
  "market-update": "Market Update",
  "market-insights": "Market Insights",
  "market-report": "Market Report",
  "google-business": "Google Business",
  "why-berkshire-hathaway": "Why Berkshire Hathaway",
  "security-policy": "Security Policy",
  "investment-properties": "Investment Properties",
  "new-construction": "New Construction",
  "luxury-homes": "Luxury Homes",
  listings: "Listings",
  contact: "Contact",
  services: "Services",
  about: "About",
  faq: "FAQ",
  relocation: "Relocation",
  "divorce-probate": "Divorce & Probate",
  downsizing: "Downsizing",
  "move-up": "Move-Up",
};

function labelForSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) {
    return SEGMENT_LABELS[segment];
  }
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type BreadcrumbTrailItem = { name: string; url: string };

/**
 * Build Home > … > Page breadcrumb items from a URL pathname (inner pages only).
 */
export function breadcrumbItemsFromPathname(
  hostHeader: string | null,
  pathname: string | null
): BreadcrumbTrailItem[] | null {
  const raw = (pathname || "/").split("?")[0].split("#")[0];
  const normalized = raw === "/" ? "/" : raw.replace(/\/+$/, "") || "/";
  if (normalized === "/") {
    return null;
  }

  const origin = getPreferredOrigin(hostHeader);
  const segments = normalized.split("/").filter(Boolean);
  const items: BreadcrumbTrailItem[] = [
    { name: "Home", url: `${origin}/` },
  ];

  let pathSoFar = "";
  for (const segment of segments) {
    pathSoFar += `/${segment}`;
    items.push({
      name: labelForSegment(segment),
      url: getCanonicalUrl(hostHeader, pathSoFar),
    });
  }

  return items;
}
