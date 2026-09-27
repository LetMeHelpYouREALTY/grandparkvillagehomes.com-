"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AmenityMapFallback, { AmenityMapSkeleton } from "@/components/amenities/AmenityMapFallback";
import {
  AMENITY_CATEGORIES,
  GRAND_PARK_COMMUNITY,
  type AmenityCategoryId,
  googleMapsDirectionsUrl,
} from "@/lib/grand-park-amenity-config";

const MAP_HEIGHT_PX = 420;
const DEFAULT_CATEGORY: AmenityCategoryId = "parks";

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.google?.maps) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-grand-park-maps="true"]'
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("maps script error")));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places&v=weekly&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.grandParkMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("maps script error"));
    document.head.appendChild(script);
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  const [loadFailed, setLoadFailed] = useState(false);
  const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "error">("idle");

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
      const iw =
        infoWindowRef.current ??
        new google.maps.InfoWindow({
          content: `<div style="max-width:240px;padding:4px 0">
            <strong>${escapeHtml(name)}</strong><br/>
            <span>${escapeHtml(address)}</span><br/>
            <a href="${googleMapsDirectionsUrl(address)}" target="_blank" rel="noopener noreferrer">Directions</a>
          </div>`,
        });
      infoWindowRef.current = iw;
      iw.open({ map, anchor: marker });
    });
    communityMarkerRef.current = marker;
  }, []);

  const searchCategory = useCallback(
    async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      setSearchStatus("loading");
      clearMarkers();
      showCommunityMarker(map);

      try {
        const placesLibrary = (await google.maps.importLibrary(
          "places"
        )) as google.maps.PlacesLibrary;
        const { Place } = placesLibrary;
        const { center, searchRadiusMeters } = GRAND_PARK_COMMUNITY;

        const { places } = await Place.searchNearby({
          fields: ["displayName", "formattedAddress", "rating", "location"],
          locationRestriction: {
            center,
            radius: searchRadiusMeters,
          },
          includedPrimaryTypes: category.placeTypes,
          maxResultCount: 15,
        });

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(center);

        places.forEach((place) => {
          const position = place.location;
          const displayName = place.displayName ?? "Place";
          const address = place.formattedAddress ?? "";
          if (!position) return;

          bounds.extend(position);
          const marker = new google.maps.Marker({
            map,
            position,
            title: displayName,
          });
          marker.addListener("click", () => {
            const rating =
              place.rating !== undefined ? `<br/>Rating: ${place.rating.toFixed(1)}` : "";
            const dest = address || `${position.lat},${position.lng}`;
            const iw =
              infoWindowRef.current ??
              new google.maps.InfoWindow();
            infoWindowRef.current = iw;
            iw.setContent(
              `<div style="max-width:260px;padding:4px 0">
                <strong>${escapeHtml(displayName)}</strong>${rating}<br/>
                ${address ? `<span>${escapeHtml(address)}</span><br/>` : ""}
                <a href="${googleMapsDirectionsUrl(dest)}" target="_blank" rel="noopener noreferrer">Directions</a>
              </div>`
            );
            iw.open({ map, anchor: marker });
          });
          markersRef.current.push(marker);
        });

        if (places.length > 0) {
          map.fitBounds(bounds);
        } else {
          map.setCenter(center);
          map.setZoom(13);
        }
        setSearchStatus("idle");
      } catch {
        setSearchStatus("error");
        map.setCenter(GRAND_PARK_COMMUNITY.center);
        map.setZoom(13);
        showCommunityMarker(map);
      }
    },
    [clearMarkers, showCommunityMarker]
  );

  useEffect(() => {
    if (!apiKey || !inView || loadFailed || mapReady) return;

    let cancelled = false;

    (async () => {
      try {
        await loadGoogleMapsScript(apiKey);
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
      } catch {
        if (!cancelled) setLoadFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiKey, inView, loadFailed, mapReady, mapId]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    void searchCategory(mapRef.current, activeCategory);
  }, [activeCategory, mapReady, searchCategory]);

  if (!apiKey || loadFailed) {
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
            Could not load places for this filter. Try another category.
          </p>
        ) : null}
      </div>
      <p className="text-xs text-slate-500">
        ★ marks {GRAND_PARK_COMMUNITY.name}. Results from Google Places near{" "}
        {GRAND_PARK_COMMUNITY.regionLabel}.
      </p>
    </div>
  );
}
