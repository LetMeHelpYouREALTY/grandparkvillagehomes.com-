import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, TreePine, Home as HomeIcon, Building2, Star } from "lucide-react";
import { grandParkImages } from "@/lib/grand-park-media";
import { DrJanPortrait } from "@/components/brand/DrJanPortrait";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  combineSchemas,
} from "@/lib/schema";
import { generateLocalBusinessSchema } from "@/lib/gbp-schema";

const GLENROCK_ADDRESS = "360 Talon Heights St, Las Vegas, NV 89138";
const GLENROCK_MAP_QUERY = encodeURIComponent(
  "Glenrock Grand Park Summerlin, 360 Talon Heights St, Las Vegas, NV 89138"
);
const OFFICE_ADDRESS = "9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134";

export const metadata: Metadata = {
  title: "Grand Park Village Homes in West Summerlin | Glenrock Map",
  description:
    "Grand Park Village Homes in West Summerlin, Las Vegas. New construction from the high $300,000s to over $1.6 million. Glenrock map at 360 Talon Heights St. Dr. Jan Duffy, Berkshire Hathaway HomeServices. Call (702) 500-1942.",
  keywords: [
    "Grand Park Summerlin",
    "Glenrock Toll Brothers",
    "Grand Park at Summerlin map",
    "West Summerlin new construction",
    "Summerlin homes for sale",
  ],
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Neighborhoods", url: "/neighborhoods" },
  { name: "Summerlin", url: "/neighborhoods/summerlin" },
  { name: "Grand Park", url: "/neighborhoods/grand-park" },
];

const grandParkFaqs = [
  {
    question: "Where is Grand Park in Summerlin?",
    answer:
      "Grand Park is in West Summerlin, west of the 215 Beltway along Sky Vista Drive and Far Hills Drive, next to the Redpoint and Kestrel districts. The Glenrock sales gallery is at 360 Talon Heights St, Las Vegas, NV 89138.",
  },
  {
    question: "What do homes in Grand Park cost?",
    answer:
      "As of September 2026, new construction in Grand Park runs from the high $300,000s to over $1.6 million. The village median sits around $900,000 and moves with the neighborhood and collection.",
  },
  {
    question: "What home types are available in Grand Park?",
    answer:
      "Grand Park offers single-family detached homes, paired homes, and attached townhomes. Floor plans run from 1,430 square feet to more than 4,500 square feet, in one-story and two-story layouts.",
  },
  {
    question: "Which builders are selling in Grand Park?",
    answer:
      "Active builders include Lennar at Fairview, Richmond American Homes at Iris Glen and Primrose Park, Tri Pointe Homes at Aberdeen, Pulte Homes at The Brantley, and Toll Brothers at Glenrock. KB Home and Taylor Morrison are also building in the village.",
  },
  {
    question: "What amenities does Grand Park include?",
    answer:
      "The village is planned around a 90-plus-acre central park with baseball fields, basketball and pickleball courts, playgrounds, a splash pad, and fitness stations.",
  },
];

const builders = [
  {
    name: "Toll Brothers",
    neighborhood: "Glenrock",
    detail:
      "Gated single-family homes at 360 Talon Heights St. Eight plans from 2,897 to 4,557 square feet, priced from about $1.6 million. This is the pin on the map.",
  },
  {
    name: "Lennar",
    neighborhood: "Fairview",
    detail:
      "Gated luxury single-story homes with Next Gen suites, about 3,793 to 3,972 square feet.",
  },
  {
    name: "Richmond American Homes",
    neighborhood: "Iris Glen & Primrose Park",
    detail:
      "Open-concept paired homes and single-family homes with modern designer finishes.",
  },
  {
    name: "Tri Pointe Homes",
    neighborhood: "Aberdeen",
    detail:
      "Gated two-story collection focused on indoor-outdoor living, 1,869 to 2,687 square feet.",
  },
  {
    name: "Pulte Homes",
    neighborhood: "The Brantley",
    detail:
      "Single- and two-story layouts from 2,194 to 4,731 square feet, starting in the mid-$800,000s.",
  },
  {
    name: "KB Home & Taylor Morrison",
    neighborhood: "Grand Park village",
    detail:
      "Both builders are active in Grand Park alongside Toll Brothers, with plans across the village price range.",
  },
];

const pageSchemas = combineSchemas(
  generateLocalBusinessSchema() as Record<string, unknown>,
  generateBreadcrumbSchema(breadcrumbs),
  generateNeighborhoodSchema({
    name: "Grand Park at Summerlin",
    slug: "grand-park",
    description:
      "Summerlin’s newest active village in West Las Vegas. New construction from the high $300,000s to over $1.6 million, planned around a 90-plus-acre park. Glenrock by Toll Brothers is at 360 Talon Heights St, Las Vegas, NV 89138.",
    containedIn: "Las Vegas",
  }),
  generateFAQSchema(grandParkFaqs)
);

export default function GrandParkPage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="grand-park-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-6">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/neighborhoods" className="hover:text-blue-600">
                Neighborhoods
              </Link>
              {" / "}
              <Link href="/neighborhoods/summerlin" className="hover:text-blue-600">
                Summerlin
              </Link>
              {" / "}
              <span className="text-slate-900">Grand Park</span>
            </nav>
          </div>

          <header className="max-w-4xl mx-auto text-center mb-8">
            <div className="mb-6 flex justify-center">
              <img
                src={grandParkImages.logo}
                alt="Grand Park Village Homes"
                width={440}
                height={88}
                className="h-16 w-auto md:h-20"
              />
            </div>
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Grand Park Village Homes in West Summerlin
            </h1>
            <p className="text-xl text-slate-600">
              Grand Park is Summerlin’s newest active village in Las Vegas. New homes run from the high $300,000s to over $1.6 million.
            </p>
            <div className="mx-auto mt-8 max-w-sm text-left">
              <DrJanPortrait variant="feature" pathname="/neighborhoods/grand-park" />
            </div>
            <nav className="mt-8 flex flex-wrap justify-center gap-3 text-sm" aria-label="Grand Park guides">
              <Link href="/neighborhoods/grand-park/glenrock" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700">
                Glenrock map
              </Link>
              <Link href="/neighborhoods/grand-park/builders" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700">
                Builders
              </Link>
              <Link href="/neighborhoods/grand-park/park" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700">
                90-acre park
              </Link>
            </nav>
          </header>

          <section className="max-w-6xl mx-auto mb-12" aria-labelledby="village-photo-heading">
            <h2 id="village-photo-heading" className="text-3xl font-bold text-slate-900 mb-4">
              The Village
            </h2>
            <div className="relative h-64 md:h-[420px] overflow-hidden rounded-2xl">
              <Image
                src={grandParkImages.hero}
                alt="Grand Park Village Homes in West Summerlin, with new construction around the central park and Red Rock mountains"
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </section>

          <section className="max-w-6xl mx-auto mb-12" aria-labelledby="glenrock-map-heading">
            <h2 id="glenrock-map-heading" className="text-3xl font-bold text-slate-900 mb-4">
              Glenrock Map
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
              <iframe
                src={`https://maps.google.com/maps?q=${GLENROCK_MAP_QUERY}&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="560"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of Glenrock at Grand Park, 360 Talon Heights Street, Las Vegas, NV 89138"
                className="w-full h-[70vh] min-h-[420px] max-h-[640px]"
              />
            </div>
            <p className="mt-3 text-sm text-slate-600 text-center">
              Map pin: Toll Brothers Glenrock sales gallery, {GLENROCK_ADDRESS}. West Summerlin, west of the 215 Beltway.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                Call (702) 500-1942
              </a>
              <a
                href={`https://www.google.com/maps/dir//${encodeURIComponent(GLENROCK_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                Directions
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${GLENROCK_MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                View on Google Maps
              </a>
              <a
                href="https://g.page/r/heyberkshire/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <Star className="h-4 w-4 mr-2" aria-hidden="true" />
                View Google Reviews
              </a>
            </div>
          </section>

          <section className="max-w-6xl mx-auto mb-16" aria-labelledby="visit-heading">
            <h2 id="visit-heading" className="text-3xl font-bold text-slate-900 mb-6">Visit with Dr. Jan Duffy</h2>
            <div className="grid md:grid-cols-2 gap-6">
            <address className="not-italic bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-3">Berkshire Hathaway HomeServices Nevada Properties</h3>
              <p className="text-slate-700">
                Berkshire Hathaway HomeServices Nevada Properties
                <br />
                {OFFICE_ADDRESS}
              </p>
              <p className="mt-3">
                <a href="tel:+17025001942" className="text-blue-700 font-semibold hover:text-blue-800">
                  (702) 500-1942
                </a>
              </p>
              <p className="text-sm text-slate-500 mt-2">License S.0197614.LLC</p>
            </address>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-3">Office Hours</h3>
              <p className="text-slate-700">
                Monday – Friday: 9:00 AM – 6:00 PM
                <br />
                Saturday: 10:00 AM – 4:00 PM
                <br />
                Sunday: By appointment
              </p>
              <p className="text-sm text-slate-500 mt-3">
                Glenrock model hours are set by Toll Brothers. Call Dr. Jan before your first visit so she is registered as your agent.
              </p>
            </div>
            </div>
          </section>

          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Price Range | September 2026</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">High $300s</div>
                <div className="text-slate-300 text-sm">Starting prices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">~$900,000</div>
                <div className="text-slate-300 text-sm">Village median</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">$1.6M+</div>
                <div className="text-slate-300 text-sm">Upper range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">1,430–4,500+</div>
                <div className="text-slate-300 text-sm">Square feet</div>
              </div>
            </div>
          </section>

          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview of Grand Park Village</h2>
            <p className="text-lg text-slate-700 mb-8">
              Grand Park sits in West Summerlin, west of the 215 Beltway along Sky Vista Drive and Far Hills Drive, beside Redpoint and Kestrel. Homes are single-family, paired, and attached townhomes.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-blue-600 mr-3" aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-lg">Location</h3>
                </div>
                <p className="text-slate-600">
                  West Summerlin, west of the 215. Sky Vista Drive and Far Hills Drive frame the village. Glenrock’s gallery is at {GLENROCK_ADDRESS}.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <HomeIcon className="h-8 w-8 text-blue-600 mr-3" aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-lg">Home Types</h3>
                </div>
                <p className="text-slate-600">
                  Detached single-family homes, paired homes, and attached townhomes. Plans span 1,430 square feet to more than 4,500 square feet, one story or two.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl md:col-span-2">
                <div className="flex items-center mb-4">
                  <TreePine className="h-8 w-8 text-blue-600 mr-3" aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-lg">90+ Acre Park</h3>
                </div>
                <div className="relative mb-4 h-56 overflow-hidden rounded-xl">
                  <Image
                    src={grandParkImages.park}
                    alt="Grand Park central park in Summerlin with baseball fields, courts, a playground, and a splash pad"
                    fill
                    sizes="(max-width: 768px) 100vw, 960px"
                    className="object-cover"
                  />
                </div>
                <p className="text-slate-600">
                  The village is built around a central park of more than 90 acres: baseball fields, basketball and pickleball courts, playgrounds, a splash pad, and fitness stations.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Building2 className="h-8 w-8 text-blue-600 mr-3" aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-lg">Price Range</h3>
                </div>
                <p className="text-slate-600">
                  High $300,000s to over $1.6 million. The median hovers around $900,000, depending on the neighborhood and collection.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Notable Builders and Neighborhoods</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="relative h-56 overflow-hidden rounded-xl">
                <Image
                  src={grandParkImages.singleFamily}
                  alt="Single-story Grand Park Village home in West Summerlin"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-xl">
                <Image
                  src={grandParkImages.townhomes}
                  alt="Attached townhomes at Grand Park Village in West Summerlin"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {builders.map((builder) => (
                <article key={builder.neighborhood} className="border border-slate-200 rounded-xl p-5 bg-white">
                  <h3 className="font-bold text-slate-900">{builder.neighborhood}</h3>
                  <p className="text-sm text-blue-700 font-medium mb-2">{builder.name}</p>
                  <p className="text-slate-600 text-sm">{builder.detail}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-slate-600">
              Current listings are on this site through Dr. Jan Duffy’s search, not a third-party agent site.{" "}
              <Link href="/listings" className="text-blue-700 font-medium hover:text-blue-800">
                Browse Las Vegas listings
              </Link>{" "}
              or{" "}
              <Link href="/new-construction" className="text-blue-700 font-medium hover:text-blue-800">
                new construction representation
              </Link>
              .
            </p>
          </section>

          <section className="mb-16 max-w-4xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Narrow Your Home Search</h2>
            <p className="text-slate-700 mb-4">
              Tell Dr. Jan three things and she will match a Grand Park collection.
            </p>
            <ul className="text-slate-700 space-y-2 mb-6 list-disc pl-5">
              <li>Your target price range</li>
              <li>Single-family home, or a townhome or paired home</li>
              <li>One story or two stories</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                Call (702) 500-1942
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-lg font-semibold"
              >
                Send your criteria
              </Link>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Questions About Grand Park Village Homes</h2>
            <div className="space-y-4">
              {grandParkFaqs.map((faq) => (
                <div key={faq.question} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-center text-sm text-slate-500">Last updated: September 24, 2026</p>
        </div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
