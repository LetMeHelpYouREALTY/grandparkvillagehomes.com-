import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import { grandParkImages } from "@/lib/grand-park-media";
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Grand Park 90-Acre Central Park | West Summerlin",
  description:
    "Grand Park Village in West Summerlin is planned around a 90-plus-acre park with baseball and softball fields, basketball, pickleball, playgrounds, a splash pad, and fitness stations. Dr. Jan Duffy.",
  keywords: [
    "Grand Park central park Summerlin",
    "Grand Park pickleball",
    "West Summerlin park",
    "Grand Park Village amenities",
  ],
};

const amenities = [
  "Baseball and softball fields",
  "Basketball courts",
  "Pickleball courts",
  "Playgrounds",
  "Splash pad",
  "Fitness stations",
];

const faqs = [
  {
    question: "How big is the park in Grand Park Village?",
    answer:
      "The village is planned around a central park of more than 90 acres in West Summerlin, west of the 215 Beltway.",
  },
  {
    question: "What is in the Grand Park central park?",
    answer:
      "The plan includes baseball and softball fields, basketball courts, pickleball courts, playgrounds, a splash pad, and fitness stations.",
  },
  {
    question: "Which homes sit next to the park?",
    answer:
      "Single-family homes, paired homes, and townhomes from about 1,430 square feet to more than 4,500 square feet surround the park. Prices as of September 2026 run from the high $300,000s to over $1.6 million.",
  },
];

export default function GrandParkParkPage() {
  return (
    <>
      <SchemaScript
        schema={combineSchemas(
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Grand Park", url: "/neighborhoods/grand-park" },
            { name: "Central park", url: "/neighborhoods/grand-park/park" },
          ]),
          generateFAQSchema(faqs)
        )}
      />
      <Navbar />
      <main className="pb-16 pt-28">
        <div className="container mx-auto px-4">
          <header className="mx-auto mb-10 max-w-3xl">
            <p className="text-sm font-semibold text-blue-700">Grand Park Village Homes</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">The 90-acre park in Grand Park</h1>
            <p className="mt-4 text-xl text-slate-600">
              Grand Park Village in West Summerlin is built around a central park of more than 90 acres, along Sky Vista Drive and Far Hills Drive, west of the 215 Beltway.
            </p>
          </header>
          <div className="relative mx-auto mb-10 h-72 max-w-5xl overflow-hidden rounded-2xl md:h-96">
            <Image
              src={grandParkImages.park}
              alt="Grand Park central park in West Summerlin, Las Vegas, with fields and paths beside new homes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
          <section className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">What the park includes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {amenities.map((item) => (
                <li key={item} className="rounded-xl border border-slate-200 px-4 py-3 text-slate-800">{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-lg text-slate-700">
              Homes around the park include single-family houses, paired homes, and townhomes. For the builder list, see{" "}
              <Link href="/neighborhoods/grand-park/builders" className="font-medium text-blue-700 hover:underline">Grand Park builders</Link>.
              For the Toll Brothers pin, see{" "}
              <Link href="/neighborhoods/grand-park/glenrock" className="font-medium text-blue-700 hover:underline">Glenrock at 360 Talon Heights St</Link>.
            </p>
            <p className="mt-4 text-lg text-slate-700">
              Call or text Dr. Jan Duffy at <a href="tel:+17022221964" className="font-medium text-blue-700">(702) 222-1964</a>. Office: 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134.
            </p>
          </section>
          <section className="mx-auto mt-12 max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Park questions</h2>
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
