import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Hashed build files under /_next/static/ stay crawlable so Google can render
 * pages, and they send X-Robots-Tag: noindex so they are not indexed as pages.
 * Blocking them in robots.txt keeps a previously crawled CSS URL stuck on
 * "Crawled - currently not indexed" because Google never sees the noindex tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image"],
        disallow: ["/api/", "/admin/", "/monitoring/"],
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot"],
        crawlDelay: 10,
      },
      {
        userAgent: "Bingbot",
        crawlDelay: 5,
      },
      {
        userAgent: ["GPTBot", "CCBot", "anthropic-ai", "Claude-Web"],
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/_next/image"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
