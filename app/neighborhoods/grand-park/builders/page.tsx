import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";

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

const builders = [
  {
    name: "Lennar",
    place: "Fairview",
    detail: "Gated single-story homes with Next Gen suites, about 3,793 to 3,972 square feet.",
  },
  {
    name: "Richmond American Homes",
    place: "Iris Glen and Primrose Park",
    detail: "Open-concept paired homes and single-family homes with designer finishes.",
  },
  {
    name: "Tri Pointe Homes",
    place: "Aberdeen",
    detail: "Gated two-story collections, about 1,869 to 2,687 square feet, built for indoor-outdoor rooms.",
  },
  {
    name: "Pulte Homes",
    place: "The Brantley",
    detail: "Single-story and two-story plans from 2,194 to 4,731 square feet, starting in the mid-$800,000s.",
  },
  {
    name: "Toll Brothers",
    place: "Glenrock",
    detail: "Gated homes at 360 Talon Heights St. Eight plans from 2,897 to 4,557 square feet, from about $1.6 million.",
  },
  {
    name: "KB Home and Taylor Morrison",
    place: "Grand Park",
    detail: "Both are also building in the village. Ask for the current collection before you tour.",
  },
];

const faqs = [
  {
    question: "Which builders are in Grand Park Village?",
    answer:
      "As of September 2026, Lennar, Richmond American Homes, Tri Pointe Homes, Pulte Homes, Toll Brothers, KB Home, and Taylor Morrison are active in Grand Park.",
  },
  {
    question: "What is the price range across those builders?",
    answer:
      "New homes in the village run from the high $300,000s to over $1.6 million. The village median sits around $900,000 and changes with the collection.",
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
          <header className="mx-auto mb-10 max-w-3xl">
            <p className="text-sm font-semibold text-blue-700">Grand Park Village Homes</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">Builders in Grand Park, West Summerlin</h1>
            <p className="mt-4 text-xl text-slate-600">
              Seven builders are selling new homes in Grand Park. Floor plans run from 1,430 square feet to more than 4,500 square feet. Prices, as of September 2026, start in the high $300,000s and pass $1.6 million.
            </p>
          </header>
          <section className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {builders.map((builder) => (
              <article key={builder.name} className="rounded-2xl border border-slate-200 bg-white p-6">
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
              Call or text Dr. Jan Duffy at <a href="tel:+17022221964" className="font-medium text-blue-700">(702) 222-1964</a> before you walk into a model. Berkshire Hathaway HomeServices Nevada Properties, 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134.
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
