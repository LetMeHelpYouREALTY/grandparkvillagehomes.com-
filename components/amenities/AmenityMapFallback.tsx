import {
  CURATED_NEARBY_PLACES,
  GRAND_PARK_COMMUNITY,
  googleMapsDirectionsUrl,
  googleMapsEmbedUrl,
} from "@/lib/grand-park-amenity-config";

const MAP_HEIGHT_PX = 420;

type AmenityMapFallbackProps = {
  title?: string;
  showCuratedList?: boolean;
};

export default function AmenityMapFallback({
  title = "Map preview",
  showCuratedList = true,
}: AmenityMapFallbackProps) {
  const { center, address, name } = GRAND_PARK_COMMUNITY;
  const embedSrc = googleMapsEmbedUrl(center.lat, center.lng);

  return (
    <div className="space-y-6">
      <div
        className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm"
        style={{ minHeight: MAP_HEIGHT_PX }}
      >
        <iframe
          title={`${title} — ${name} area map`}
          src={embedSrc}
          className="h-[420px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-slate-600">
        Map centered on{" "}
        <span className="font-medium text-slate-800">{address}</span>
        {" · "}
        <a
          href={googleMapsDirectionsUrl(address)}
          className="text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Directions to Grand Park Village
        </a>
      </p>

      {showCuratedList ? (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Featured nearby places</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CURATED_NEARBY_PLACES.map((place) => (
              <li
                key={`${place.name}-${place.address}`}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm"
              >
                <p className="font-semibold text-slate-900">{place.name}</p>
                <p className="text-slate-600 mt-1">{place.address}</p>
                {place.note ? <p className="text-slate-500 mt-2">{place.note}</p> : null}
                {place.address ? (
                  <a
                    href={googleMapsDirectionsUrl(place.address)}
                    className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Directions
                  </a>
                ) : (
                  <a
                    href={place.sourceUrl}
                    className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Official site
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function AmenityMapSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
      style={{ height: MAP_HEIGHT_PX }}
      role="status"
      aria-label="Loading interactive map"
    />
  );
}
