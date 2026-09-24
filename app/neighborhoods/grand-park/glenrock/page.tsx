import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";

const ADDRESS = "360 Talon Heights St, Las Vegas, NV 89138";
const MAP_QUERY = encodeURIComponent("Glenrock Grand Park Summerlin, 360 Talon Heights St, Las Vegas, NV 89138");

export const metadata: Metadata = {
  title: "Glenrock at Grand Park Village Homes | Toll Brothers Map",
  description:
    "Glenrock is the Toll Brothers neighborhood in Grand Park, West Summerlin. Sales gallery at 360 Talon Heights St, Las Vegas, NV 89138. Plans from 2,897 to 4,557 square feet, from about $1.6 million. Dr. Jan Duffy.",
  keywords: [
    "Glenrock Grand Park",
    "Toll Brothers Glenrock Summerlin",
    "360 Talon Heights St",
    "Grand Park Village Homes map",
  ],
};

const faqs = [
  {
    question: "Where is the Glenrock sales gallery?",
    answer:
      "The Glenrock sales gallery is at 360 Talon Heights St, Las Vegas, NV 89138, in Grand Park, West Summerlin, west of the 215 Beltway.",
  },
  {
    question: "Who builds Glenrock?",
    answer:
      "Toll Brothers builds Glenrock. Eight plans run from 2,897 to 4,557 square feet, priced from about $1.6 million as of September 2026.",
  },
  {
    question: "Is Glenrock the same as Grand Park?",
    answer:
      "Glenrock is one neighborhood inside Grand Park Village. Other collections in the village include Fairview, Iris Glen, Primrose Park, Aberdeen, and The Brantley.",
  },
];

export default function GlenrockPage() {
  return (
    <>
      <SchemaScript
        schema={combineSchemas(
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Neighborhoods", url: "/neighborhoods" },
            { name: "Grand Park", url: "/neighborhoods/grand-park" },
            { name: "Glenrock", url: "/neighborhoods/grand-park/glenrock" },
          ]),
          generateFAQSchema(faqs)
        )}
      />
      <Navbar />
      <main className="pb-16 pt-28">
        <div className="container mx-auto px-4">
          <nav className="mb-6 text-sm text-slate-500">
            <Link href="/neighborhoods/grand-park" className="hover:text-blue-600">Grand Park Village Homes</Link>
            {" / "}
            <span className="text-slate-900">Glenrock</span>
          </nav>
          <header className="mx-auto mb-10 max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Glenrock at Grand Park Village Homes</h1>
            <p className="mt-4 text-xl text-slate-600">
              Glenrock is the Toll Brothers neighborhood in Grand Park, West Summerlin. The sales gallery is at {ADDRESS}. Eight plans run from 2,897 to 4,557 square feet, priced from about $1.6 million as of September 2026.
            </p>
          </header>
          <section className="mx-auto mb-12 max-w-6xl" aria-labelledby="glenrock-map">
            <h2 id="glenrock-map" className="mb-4 text-3xl font-bold text-slate-900">Map of 360 Talon Heights Street</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`}
                title="Google Map of Glenrock at 360 Talon Heights Street, Las Vegas, NV 89138"
                className="h-[480px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="tel:+17022221964" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white">
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                Call (702) 222-1964
              </a>
              <a
                href={`https://www.google.com/maps/dir//${encodeURIComponent(ADDRESS)}`}
                className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-3 font-medium text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
                Directions
              </a>
            </div>
          </section>
          <section className="mx-auto max-w-3xl space-y-4 text-lg text-slate-700">
            <h2 className="text-3xl font-bold text-slate-900">What to know before you visit</h2>
            <p>
              Grand Park sits west of the 215 Beltway along Sky Vista Drive and Far Hills Drive, next to the Redpoint and Kestrel districts. Glenrock is the gated Toll Brothers collection inside that village.
            </p>
            <p>
              Buyer representation is free. The builder pays the commission. Call Dr. Jan Duffy before the sales gallery so the contract is written for you. License S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties, 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134.
            </p>
            <p>
              <Link href="/neighborhoods/grand-park/builders" className="font-medium text-blue-700 hover:underline">See the other Grand Park builders</Link>
              {" or "}
              <Link href="/neighborhoods/grand-park" className="font-medium text-blue-700 hover:underline">return to the Grand Park Village Homes guide</Link>.
            </p>
          </section>
          <section className="mx-auto mt-12 max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Glenrock questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-xl font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-slate-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
