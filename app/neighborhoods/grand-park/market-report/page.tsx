import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import { realscoutRange } from "@/lib/realscout-ranges";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig, agentInfo } from "@/lib/site-config";
import { selfCanonicalMetadata } from "@/lib/page-metadata";
import AgentPhoto from "@/components/AgentPhoto";
import PageIllustration from "@/components/PageIllustration";
import { grandParkMarket as m } from "@/lib/grand-park-market";
import { usd, perSqft } from "@/lib/format";

const path = "/neighborhoods/grand-park/market-report";
const canonicalUrl = `${siteConfig.url}${path}`;
const title = `Grand Park Market Report ${m.month}`;
const lowest = m.collections[0];
const highest = m.collections[m.collections.length - 1];
const description = `Grand Park village, ${m.month}: ${m.collections.length} builder collections from ${usd(
  lowest.priceFrom,
)} to ${usd(highest.priceFrom)}+, price per square foot by neighborhood. Updated monthly by Dr. Jan Duffy.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Grand Park Summerlin market report", "Grand Park village prices", "89138 new homes", "Glenrock prices", "Summerlin new construction prices"],
  ...selfCanonicalMetadata,
};

const reportSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${canonicalUrl}#webpage`,
  name: title,
  url: canonicalUrl,
  description,
  dateModified: m.updated,
  author: { "@type": "Person", name: "Dr. Jan Duffy" },
  about: { "@id": `${siteConfig.url}/neighborhoods/grand-park#place` },
};

const rows = m.collections.map((c) => ({ ...c, psf: perSqft(c.priceFrom, c.sqftHigh) }));
const qmi = m.quickMoveIn;

export default function GrandParkMarketReportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }} />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-6">
            <nav className="text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              {" / "}
              <Link href="/neighborhoods/grand-park" className="hover:text-blue-600">Grand Park</Link>
              {" / "}
              <span className="text-slate-900">Market Report</span>
            </nav>
          </div>

          <PageIllustration scene="market" label="Illustration of a skyline with rising price bars" />
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Updated {m.month}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Grand Park Village Market Report — {m.month}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {m.neighborhoods} neighborhoods, {m.floorplans} floor plans, and homes from {m.sqftRange} square feet in
              West Summerlin ({m.zip}). Builder prices start near {usd(lowest.priceFrom)} and top out above{" "}
              {usd(highest.priceFrom)}.
            </p>
          </div>
          <RealScoutListings compact {...realscoutRange(path)} />

          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Grand Park by the Numbers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: usd(lowest.priceFrom), label: "Lowest builder price", note: lowest.name },
                { value: usd(highest.priceFrom), label: "Top collection, from", note: highest.name },
                { value: String(m.mls.village29Listed), label: "Homes on the MLS", note: `${usd(m.mls.village29Low)}–${usd(m.mls.village29High)}, ${m.mls.village29AsOf}` },
                { value: `${m.mls.zipMedianDom} days`, label: "Median days on market", note: `ZIP ${m.zip}, ${m.mls.zipAsOf}` },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                  <p className="mt-1 font-semibold text-slate-700">{s.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Every Grand Park Collection</h2>
            <p className="text-slate-600 mb-6">
              Builder &quot;from&quot; prices, lowest to highest. Price per square foot uses the starting price and the largest plan.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Neighborhood</th>
                    <th className="px-4 py-3">Builder</th>
                    <th className="px-4 py-3">Home type</th>
                    <th className="px-4 py-3">Size (sq ft)</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">From $/sq ft</th>
                    <th className="px-4 py-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rows.map((r) => (
                    <tr key={r.name}>
                      <td className="px-4 py-3 font-semibold text-slate-900">{r.name}</td>
                      <td className="px-4 py-3">{r.builder}</td>
                      <td className="px-4 py-3">{r.homeType}</td>
                      <td className="px-4 py-3">{r.sqftLow.toLocaleString()}–{r.sqftHigh.toLocaleString()}</td>
                      <td className="px-4 py-3">{r.priceNote}</td>
                      <td className="px-4 py-3">${r.psf}</td>
                      <td className="px-4 py-3 text-slate-500">{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What the Numbers Mean</h2>
            <div className="flex gap-4 items-start">
              <AgentPhoto size={64} className="mt-1 ring-2 ring-amber-400" />
              <div className="space-y-4 text-lg text-slate-700">
                <p>
                  <strong>Grand Park covers almost every budget.</strong> Townhomes at Caldwell Park start in the high
                  $300,000s. Lennar&apos;s Fairview single-story homes run about $1.9 million and up.
                </p>
                <p>
                  <strong>Base price is not the final price.</strong> At Arcadia, a finished Pinyon on Homesite 37
                  lists at {usd(1990887)}, about 19% above the plan&apos;s {usd(1674990)} base. Glenrock has a finished
                  home too: {qmi.label}, {qmi.sqft.toLocaleString()} square feet, at {usd(qmi.price)}. Budget for lot
                  premiums and options before you visit a sales office.
                </p>
                <p>
                  <strong>Grand Park sits around its ZIP&apos;s middle.</strong> The median list price across ZIP {m.zip} is{" "}
                  {usd(m.mls.zipMedianList)}. Homes there take a median {m.mls.zipMedianDom} days to sell.
                </p>
                <p>
                  <strong>Neighborhoods are selling out.</strong> Summerlin lists Edgewood, Alton, Caldwell Park, and Arcadia
                  among neighborhoods reaching their final homes.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sources</h2>
            <ul className="space-y-2 text-slate-600">
              {m.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} className="text-blue-600 hover:underline" rel="noopener" target="_blank">
                    {s.label}
                  </a>{" "}
                  — checked {s.checked}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              Builder prices change without notice. ZIP {m.zip} figures cover the whole ZIP, not Grand Park alone. Next
              update: {m.nextUpdate}.
            </p>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Explore More</h2>
            <ul className="flex flex-wrap gap-4 text-blue-600">
              <li><Link href="/neighborhoods/grand-park" className="hover:underline">Grand Park village guide</Link></li>
              <li><Link href="/neighborhoods/grand-park/builders" className="hover:underline">Grand Park builders</Link></li>
              <li><Link href="/neighborhoods/grand-park/glenrock" className="hover:underline">Glenrock</Link></li>
              <li><Link href="/market-report" className="hover:underline">Las Vegas market report</Link></li>
            </ul>
          </section>

          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comparing Grand Park Builders?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get current lot premiums and incentives before your first visit to a sales office.
            </p>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50"
            >
              <Phone className="h-5 w-5" />
              Call or text {agentInfo.phone}
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
