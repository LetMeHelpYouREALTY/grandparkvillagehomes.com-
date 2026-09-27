import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { GRAND_PARK_COMMUNITY } from "@/lib/grand-park-amenity-config";
import { AmenityMapSkeleton } from "@/components/amenities/AmenityMapFallback";

const CommunityAmenityMap = dynamic(
  () => import("@/components/amenities/CommunityAmenityMap"),
  {
    ssr: false,
    loading: () => <AmenityMapSkeleton />,
  }
);

type AmenityMapSectionProps = {
  title?: string;
  subtitle?: string;
  showFullLink?: boolean;
  id?: string;
};

export default function AmenityMapSection({
  title = `Life Near ${GRAND_PARK_COMMUNITY.name}`,
  subtitle = `Explore dining, parks, schools, healthcare, and shopping around ${GRAND_PARK_COMMUNITY.regionLabel} — centered on ${GRAND_PARK_COMMUNITY.shortName} in Las Vegas.`,
  showFullLink = true,
  id = "whats-nearby",
}: AmenityMapSectionProps) {
  return (
    <section id={id} className="py-16 md:py-20 bg-slate-50" aria-labelledby={`${id}-heading`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              What&apos;s Nearby
            </div>
            <h2 id={`${id}-heading`} className="text-3xl md:text-4xl font-bold text-slate-900">
              {title}
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-3xl">{subtitle}</p>
          </div>
          {showFullLink ? (
            <Link
              href="/amenities"
              className="inline-flex shrink-0 items-center justify-center rounded-md border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Full amenities guide
            </Link>
          ) : null}
        </div>
        <CommunityAmenityMap showCuratedListOnFallback={false} />
      </div>
    </section>
  );
}
