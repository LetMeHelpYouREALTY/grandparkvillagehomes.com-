/**
 * Site configuration for grandparkvillagehomes.com.
 * This repo serves one site; every hostname resolves to the Grand Park config.
 */

export interface DomainConfig {
  domain: string;
  neighborhood: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  keywords: string[];
  pageType: "community" | "search" | "lifestyle" | "investment" | "55plus" | "luxury";
  realscoutAgentId: string;
  ctaBadge: string;
  ctaHeadline: string;
  ctaSubheadline: string;
}

const REALSCOUT_AGENT_ID = "QWdlbnQtMjI1MDUw";

export const GRAND_PARK_CONFIG: DomainConfig = {
  domain: "grandparkvillagehomes.com",
  neighborhood: "Grand Park Village",
  tagline: "Grand Park Village Homes",
  description:
    "Grand Park Village new homes in West Summerlin, Las Vegas 89138. Buyer representation from Dr. Jan Duffy, licensed since 2008 · 35 years in Las Vegas.",
  heroHeadline: "Grand Park Village Homes",
  heroSubheadline:
    "One of Summerlin’s newest villages in Las Vegas. New homes from the $400,000s to nearly $2 million.",
  keywords: [
    "Grand Park Village Homes",
    "Grand Park Summerlin",
    "West Summerlin new construction",
    "Glenrock Summerlin",
  ],
  pageType: "community",
  realscoutAgentId: REALSCOUT_AGENT_ID,
  ctaBadge: "West Summerlin",
  ctaHeadline: "Find a Grand Park Village Home",
  ctaSubheadline: "Call Dr. Jan before you visit a builder's sales office.",
};

export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  "grandparkvillagehomes.com": GRAND_PARK_CONFIG,
};

export const DEFAULT_CONFIG: DomainConfig = GRAND_PARK_CONFIG;

export function getDomainConfig(_hostname: string): DomainConfig {
  return GRAND_PARK_CONFIG;
}
