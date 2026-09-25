import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { getCanonicalUrl, getPreferredOrigin } from "@/lib/canonical";
import { Analytics } from "@vercel/analytics/react";
import GlobalHeroBanner from "@/components/layout/GlobalHeroBanner";
import { DirectAnswer } from "@/components/seo/DirectAnswer";

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const pathname = headers().get("x-pathname") || "/";
  const config = getDomainConfig(domain);
  const canonical = getCanonicalUrl(domain, pathname);
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(getPreferredOrigin(domain)),
    title: `${config.neighborhood} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`,
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
          url: "/images/agent/dr-jan-duffy-grand-park-village-homes-badge.jpg",
          width: 1200,
          height: 1200,
          alt: "Dr. Jan Duffy, Las Vegas REALTOR, on a phone call. Grand Park Village Homes by Dr. Jan Duffy.",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname") || "/";

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <GlobalHeroBanner />
        <DirectAnswer pathname={pathname} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
