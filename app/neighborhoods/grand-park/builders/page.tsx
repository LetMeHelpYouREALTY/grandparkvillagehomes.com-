import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import { realscoutRange } from "@/lib/realscout-ranges";
import PageIllustration from "@/components/PageIllustration";
import SchemaScript from "@/components/SchemaScript";
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import { grandParkMarket } from "@/lib/grand-park-market";

export const metadata: Metadata = {
  title: "Grand Park Village Builders | Lennar, Toll Brothers, Pulte",
  description:
    "Builders in Grand Park Village, West Summerlin: Lennar at Fairview, Richmond American at Iris Glen and Primrose Park, Tri Pointe at Aberdeen, Pulte at The Brantley, and Toll Brothers at Glenrock. Dr. Jan Duffy.",
  keywords: [
    "Grand Park builders",
    "Lennar Fairview Summerlin",
    "Pulte The Brantley",
    "Richmond American Grand Park",
  ],
};

const builders = grandParkMarket.collections.map((c) => ({
  name: c.builder,
  place: c.name,
  detail: `${c.homeType}, ${c.sqftLow.toLocaleString()}–${c.sqftHigh.toLocaleString()} square feet, ${c.priceNote} (${c.source}).`,
}));

const faqs = [
  {
    question: "Which builders are in Grand Park Village?",
    answer:
      "As of October 2026, KB Home, Richmond American, Tri Pointe Homes, Pulte Homes, Taylor Morrison, Toll Brothers, SHAWOOD, and Lennar sell new homes in Grand Park.",
  },
  {
    question: "What is the price range across those builders?",
    answer:
      "As of October 2026, builder prices run from the high $300,000s at Caldwell Park to about $1.9 million and up at Fairview.",
  },
  {
    question: "Do I need my own agent at a builder sales office?",
    answer:
      "Yes, if you want someone whose job is your side of the contract. Buyer representation is free. Register with Dr. Jan Duffy before the first visit.",
  },
];

export default function GrandParkBuildersPage() {
  return (
    <>
      <SchemaScript
        schema={combineSchemas(
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Grand Park", url: "/neighborhoods/grand-park" },
            { name: "Builders", url: "/neighborhoods/grand-park/builders" },
          ]),
          generateFAQSchema(faqs)
        )}
      />
      <Navbar />
      <main className="pb-16 pt-28">
        <div className="container mx-auto px-4">
          <PageIllustration scene="new-build" label="Illustration of new home framing under construction" />
          <header className="mx-auto mb-10 max-w-3xl">
            <p className="text-sm font-semibold text-blue-700">Grand Park Village Homes</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">Builders in Grand Park, West Summerlin</h1>
            <p className="mt-4 text-xl text-slate-600">
              Nine builders sell new homes across Grand Park's 11 neighborhoods. Floor plans run from 1,430 to 4,731 square feet. As of October 2026, prices start in the high $300,000s and reach about $2 million.
            </p>
          </header>
          <RealScoutListings compact {...realscoutRange("/neighborhoods/grand-park/builders")} />
          <section className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {builders.map((builder) => (
              <article key={builder.place} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-900">{builder.name}</h2>
                <p className="mt-1 text-sm font-medium text-blue-700">{builder.place}</p>
                <p className="mt-3 text-slate-700">{builder.detail}</p>
              </article>
            ))}
          </section>
          <section className="mx-auto mt-12 max-w-3xl space-y-4 text-lg text-slate-700">
            <p>
              Home types include single-family detached homes, paired homes, and attached townhomes, in one-story and two-story layouts.
            </p>
            <p>
              <Link href="/neighborhoods/grand-park/glenrock" className="font-medium text-blue-700 hover:underline">Open the Glenrock map</Link>
              {" · "}
              <Link href="/neighborhoods/grand-park/park" className="font-medium text-blue-700 hover:underline">See the 90-acre park</Link>
              {" · "}
              <Link href="/new-construction" className="font-medium text-blue-700 hover:underline">All new construction</Link>
            </p>
            <p>
              Call or text Dr. Jan Duffy at <a href="tel:+17025001942" className="font-medium text-blue-700">(702) 500-1942</a> before you walk into a model. Office: 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134. <Link href="/neighborhoods/grand-park/market-report" className="font-medium text-blue-700 hover:underline">See every collection's price</Link>.
            </p>
          </section>
          <section className="mx-auto mt-12 max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Builder questions</h2>
            {faqs.map((faq) => (
              <div key={faq.question} className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-slate-700">{faq.answer}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
