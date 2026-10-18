import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { getCanonicalUrl, getPreferredOrigin } from "@/lib/canonical";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import GlobalHeroBanner from "@/components/layout/GlobalHeroBanner";
import AutoBreadcrumbSchema from "@/components/AutoBreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const pathname = headers().get("x-pathname") || "/";
  const config = getDomainConfig(domain);
  const canonical = getCanonicalUrl(domain, pathname);
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(getPreferredOrigin(domain)),
    title: {
      default: "Grand Park Village | Homes by Dr. Jan Duffy",
      template: "%s | Grand Park Village Homes",
    },
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    openGraph: {
      title: config.heroHeadline,
      description: config.description,
      type: "website",
      url: canonical,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Grand Park Village Homes by Dr. Jan Duffy, West Summerlin, (702) 500-1942",
        },
      ],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        {/* WidgetTracker */}
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        <AutoBreadcrumbSchema />
        <GlobalHeroBanner />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
