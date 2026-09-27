import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import AmenityMapSection from "@/components/amenities/AmenityMapSection";
import { DrJanPortrait } from "@/components/brand/DrJanPortrait";
import { Phone } from "lucide-react";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { getCanonicalUrl } from "@/lib/canonical";
import {
  AMENITIES_PAGE_FAQS,
  CURATED_NEARBY_PLACES,
  GRAND_PARK_COMMUNITY,
} from "@/lib/grand-park-amenity-config";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateRealEstateAgentSchema,
} from "@/lib/schema";

const pageTitle = `Nearby Amenities in ${GRAND_PARK_COMMUNITY.name}, Las Vegas`;
const pageDescription =
  "Interactive map and local guide to dining, parks, golf, healthcare, shopping, and schools near Grand Park Village in West Summerlin. Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = getCanonicalUrl(headers().get("host"), "/amenities");
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Nearby Amenities", url: "/amenities" },
];

function generateFeaturedPlacesItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Featured places near ${GRAND_PARK_COMMUNITY.name}`,
    itemListElement: CURATED_NEARBY_PLACES.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": place.schemaType,
        name: place.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: place.address,
          addressLocality: GRAND_PARK_COMMUNITY.city,
          addressRegion: GRAND_PARK_COMMUNITY.state,
          addressCountry: "US",
        },
      },
    })),
  };
}

function generateCommunityPlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: GRAND_PARK_COMMUNITY.name,
    description:
      "Grand Park Village is Summerlin’s active new-home village west of the 215 Beltway, planned around a 90-plus-acre central park.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "360 Talon Heights St",
      addressLocality: GRAND_PARK_COMMUNITY.city,
      addressRegion: GRAND_PARK_COMMUNITY.state,
      postalCode: "89138",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GRAND_PARK_COMMUNITY.center.lat,
      longitude: GRAND_PARK_COMMUNITY.center.lng,
    },
    containedInPlace: {
      "@type": "Place",
      name: "Summerlin, Las Vegas, Nevada",
    },
  };
}

const agentWithAreaServed = {
  ...generateRealEstateAgentSchema(),
  areaServed: [
    {
      "@type": "Place",
      name: GRAND_PARK_COMMUNITY.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: GRAND_PARK_COMMUNITY.center.lat,
        longitude: GRAND_PARK_COMMUNITY.center.lng,
      },
    },
    {
      "@type": "Place",
      name: "Summerlin",
      containedInPlace: {
        "@type": "City",
        name: "Las Vegas",
      },
    },
  ],
};

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateFAQSchema(AMENITIES_PAGE_FAQS),
  generateFeaturedPlacesItemList() as Record<string, unknown>,
  generateCommunityPlaceSchema() as Record<string, unknown>,
  agentWithAreaServed as Record<string, unknown>
);

const categorySections = [
  {
    id: "dining",
    title: "Dining & cafes",
    body:
      "Most Grand Park buyers head to Downtown Summerlin at Festival Plaza for sit-down restaurants, fast casual, and coffee. Additional options line Charleston Boulevard and the 215 retail corridors as you move east into established Summerlin.",
  },
  {
    id: "parks",
    title: "Parks & recreation",
    body:
      "Inside the village, the 90-plus-acre Grand Park central park is planned with baseball and softball fields, basketball and pickleball courts, playgrounds, a splash pad, and fitness stations. Red Rock Canyon National Conservation Area and Las Vegas Ballpark are short drives west and east.",
  },
  {
    id: "golf",
    title: "Golf",
    body:
      "TPC Summerlin hosts PGA Tour events and offers public tee times in the heart of Summerlin. Bears Best, Siena Golf Club, and Angel Park are also within a typical 15–25 minute drive from Grand Park (approximate).",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    body:
      "Summerlin Hospital Medical Center on Town Center Drive is the primary full-service hospital for west Summerlin. Urgent care and medical offices cluster along Town Center, Charleston, and the Downtown Summerlin area.",
  },
  {
    id: "shopping",
    title: "Shopping & errands",
    body:
      "Downtown Summerlin is the main retail hub — apparel, home goods, services, and grocery in one walkable district. Builder sections in Grand Park also sit near daily errands along Charleston and the 215 frontage roads.",
  },
  {
    id: "schools",
    title: "Schools",
    body:
      "Clark County School District serves Grand Park. Ernest Becker Middle School and Palo Verde High School are established campuses in west Summerlin; exact attendance zones depend on your lot and CCSD boundaries — verify before you buy.",
  },
  {
    id: "commute",
    title: "Commute & key destinations",
    body:
      "The Las Vegas Strip is roughly 20–25 miles east (about 30–40 minutes in typical traffic, approximate). Downtown Summerlin is about 10–15 minutes east. Harry Reid International Airport is commonly 25–35 minutes via the 215 and I-15 (approximate).",
  },
];

export default function AmenitiesPage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} />
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-4 max-w-4xl mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Nearby Amenities in {GRAND_PARK_COMMUNITY.name}, Las Vegas
          </h1>
          <p className="text-lg text-slate-600">
            Grand Park Village sits in {GRAND_PARK_COMMUNITY.regionLabel}, west of the 215 Beltway.
            Use the map to explore places buyers ask about most — then read the hyperlocal notes
            below (all server-rendered for search and AI answers).
          </p>
        </div>

        <AmenityMapSection
          title="Interactive amenity map"
          subtitle={`Centered on ${GRAND_PARK_COMMUNITY.address}. Filter by category or open the fallback map if the API key is not set.`}
          showFullLink={false}
          id="amenities-map"
        />

        <section className="py-16 bg-white" aria-labelledby="local-guide-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="local-guide-heading" className="text-3xl font-bold text-slate-900 mb-8">
              Local guide by category
            </h2>
            <div className="space-y-10">
              {categorySections.map((section) => (
                <article key={section.id} id={section.id}>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{section.title}</h3>
                  <p className="text-slate-700 leading-relaxed">{section.body}</p>
                </article>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-12 mb-4">
              Featured nearby places
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {CURATED_NEARBY_PLACES.map((place) => (
                <li
                  key={place.name}
                  className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700"
                >
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  <p className="mt-1">{place.address}</p>
                  {place.note ? <p className="mt-2 text-slate-600">{place.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 bg-slate-50" aria-labelledby="amenities-faq-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="amenities-faq-heading" className="text-3xl font-bold text-slate-900 mb-8">
              Grand Park amenities FAQ
            </h2>
            <dl className="space-y-6">
              {AMENITIES_PAGE_FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 text-slate-700">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="mx-auto mb-6 max-w-xs">
              <DrJanPortrait variant="feature" pathname="/amenities" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Your Grand Park Village real estate advisor
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Dr. Jan Duffy knows builder incentives, lot premiums, and how west Summerlin fits your
              commute. Buyer representation for new construction is free when you register before
              your first builder visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                Call {agentInfo.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Contact Dr. Jan
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              {agentInfo.name} | License {agentInfo.license} | {agentInfo.brokerage}
            </p>
            <p className="mt-2 text-blue-200 text-sm">
              <Link href="/neighborhoods/grand-park" className="underline hover:text-white">
                Grand Park neighborhood guide
              </Link>
              {" · "}
              <Link href="/listings" className="underline hover:text-white">
                Search homes
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
