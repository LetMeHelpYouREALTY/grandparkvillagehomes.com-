"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AmenityMapFallback, { AmenityMapSkeleton } from "@/components/amenities/AmenityMapFallback";
import {
  AMENITY_CATEGORIES,
  CURATED_NEARBY_PLACES,
  GRAND_PARK_COMMUNITY,
  type AmenityCategoryId,
  type CuratedPlace,
} from "@/lib/grand-park-amenity-config";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";
import { placeDisplayName, placePosition, searchCategory } from "@/lib/grand-park-places-search";
import {
  buildCommunityInfoContent,
  buildPlaceInfoContent,
} from "@/lib/grand-park-map-info";

const MAP_HEIGHT_PX = 420;
const DEFAULT_CATEGORY: AmenityCategoryId = "parks";

function curatedForCategory(categoryId: AmenityCategoryId): CuratedPlace[] {
  return CURATED_NEARBY_PLACES.filter((p) => p.category === categoryId);
}

type CommunityAmenityMapProps = {
  showCuratedListOnFallback?: boolean;
};

export default function CommunityAmenityMap({
  showCuratedListOnFallback = true,
}: CommunityAmenityMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();

  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(DEFAULT_CATEGORY);
  const [mapReady, setMapReady] = useState(false);
  const [useFallback, setUseFallback] = useState(() => !apiKey || mapsAuthFailed);
  const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "error">("idle");
  const [showCuratedForCategory, setShowCuratedForCategory] = useState<CuratedPlace[]>([]);

  const enterFallback = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    infoWindowRef.current?.close();
    mapRef.current = null;
    setMapReady(false);
    setUseFallback(true);
  }, []);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  const showCommunityMarker = useCallback((map: google.maps.Map) => {
    if (communityMarkerRef.current) {
      communityMarkerRef.current.setMap(null);
    }
    const { center, name, address } = GRAND_PARK_COMMUNITY;
    const marker = new google.maps.Marker({
      map,
      position: center,
      title: name,
      label: { text: "★", color: "#ffffff" },
    });
    marker.addListener("click", () => {
      const iw = infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = iw;
      iw.setContent(buildCommunityInfoContent(name, address));
      iw.open({ map, anchor: marker });
    });
    communityMarkerRef.current = marker;
  }, []);

  const runCategorySearch = useCallback(
    async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      setSearchStatus("loading");
      setShowCuratedForCategory([]);
      clearMarkers();
      showCommunityMarker(map);

      try {
        const places = await searchCategory(GRAND_PARK_COMMUNITY.center, categoryId);
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(GRAND_PARK_COMMUNITY.center);

        places.forEach((place) => {
          const position = placePosition(place);
          const displayName = placeDisplayName(place);
          const address = place.formattedAddress ?? "";
          if (!position) return;

          bounds.extend(position);
          const marker = new google.maps.Marker({
            map,
            position,
            title: displayName,
          });
          marker.addListener("click", () => {
            const dest =
              address || place.googleMapsURI || `${position.lat},${position.lng}`;
            const iw = infoWindowRef.current ?? new google.maps.InfoWindow();
            infoWindowRef.current = iw;
            iw.setContent(buildPlaceInfoContent(displayName, address, dest));
            iw.open({ map, anchor: marker });
          });
          markersRef.current.push(marker);
        });

        if (places.length > 0) {
          map.fitBounds(bounds);
        } else {
          map.setCenter(GRAND_PARK_COMMUNITY.center);
          map.setZoom(13);
        }
        setSearchStatus("idle");
      } catch {
        setSearchStatus("error");
        setShowCuratedForCategory(curatedForCategory(categoryId));
        map.setCenter(GRAND_PARK_COMMUNITY.center);
        map.setZoom(13);
        showCommunityMarker(map);
      }
    },
    [clearMarkers, showCommunityMarker]
  );

  useEffect(() => {
    if (!apiKey || !inView || useFallback || mapReady || mapsAuthFailed) return;

    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !mapContainerRef.current) return;
        const map = new google.maps.Map(mapContainerRef.current, {
          center: GRAND_PARK_COMMUNITY.center,
          zoom: 13,
          ...(mapId ? { mapId } : {}),
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });
        mapRef.current = map;
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) enterFallback();
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, inView, useFallback, mapReady, mapId, enterFallback]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    void runCategorySearch(mapRef.current, activeCategory);
  }, [activeCategory, mapReady, runCategorySearch]);

  if (useFallback) {
    return (
      <AmenityMapFallback
        title="Nearby amenities map"
        showCuratedList={showCuratedListOnFallback}
      />
    );
  }

  return (
    <div ref={sectionRef} className="space-y-4">
      <div
        role="tablist"
        aria-label="Filter nearby amenities by category"
        className="flex flex-wrap gap-2"
      >
        {AMENITY_CATEGORIES.map((category) => {
          const selected = category.id === activeCategory;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={category.ariaLabel}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        {!mapReady ? <AmenityMapSkeleton /> : null}
        <div
          ref={mapContainerRef}
          className="w-full"
          style={{ height: MAP_HEIGHT_PX, display: mapReady ? "block" : "none" }}
          role="application"
          aria-label={`Interactive map of amenities near ${GRAND_PARK_COMMUNITY.name}`}
        />
        {searchStatus === "loading" ? (
          <p className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-1 text-xs text-slate-600 shadow">
            Updating places…
          </p>
        ) : null}
        {searchStatus === "error" ? (
          <p className="absolute bottom-3 left-3 rounded-md bg-amber-50 px-3 py-1 text-xs text-amber-900 shadow">
            Live results unavailable — featured places for this category are listed below.
          </p>
        ) : null}
      </div>

      {showCuratedForCategory.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Featured places ({AMENITY_CATEGORIES.find((c) => c.id === activeCategory)?.label})
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {showCuratedForCategory.map((place) => (
              <li
                key={`${place.name}-${place.address ?? place.sourceUrl}`}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm"
              >
                <p className="font-semibold text-slate-900">{place.name}</p>
                {place.address ? <p className="text-slate-600 mt-1">{place.address}</p> : null}
                {place.note ? <p className="text-slate-500 mt-2">{place.note}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="text-xs text-slate-500">
        ★ marks {GRAND_PARK_COMMUNITY.name}. Results from Google Places near{" "}
        {GRAND_PARK_COMMUNITY.regionLabel}.
      </p>
    </div>
  );
}
