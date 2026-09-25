"use client";

import { Button } from "@/components/ui/button";
import { SectionAnswer } from "@/components/seo/SectionAnswer";

export default function RealScoutListings() {
  const realScoutAgentEncodedId =
    process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID?.trim() || "QWdlbnQtMjI1MDUw";
  const realScoutHomeSearchUrl =
    process.env.NEXT_PUBLIC_REALSCOUT_URL?.trim() ||
    "https://drjanduffy.realscout.com/";

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-slate-600 text-lg">
              Discover exceptional homes in Las Vegas and Henderson
            </p>
            <SectionAnswer>
              The homes below come from the live RealScout feed for Dr. Jan
              Duffy. Confirm the price and status on each listing.
            </SectionAnswer>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a
              href={realScoutHomeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 no-underline"
            >
              View All Properties
            </a>
          </Button>
        </div>

        {/* RealScout Widget - using dangerouslySetInnerHTML per rules */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings 
              agent-encoded-id="${realScoutAgentEncodedId}" 
              sort-order="NEWEST" 
              listing-status="For Sale" 
              property-types=",SFR,MF,TC" 
              price-min="500000" 
              price-max="800000"
            ></realscout-office-listings>`,
          }}
        />
      </div>
    </section>
  );
}
