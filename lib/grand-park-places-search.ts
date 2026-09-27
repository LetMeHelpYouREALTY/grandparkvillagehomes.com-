import type { AmenityCategoryId } from "@/lib/grand-park-amenity-config";
import { AMENITY_CATEGORIES, GRAND_PARK_COMMUNITY } from "@/lib/grand-park-amenity-config";

const cache = new Map<string, Promise<google.maps.places.Place[]>>();

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId
): Promise<google.maps.places.Place[]> {
  const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) {
    return Promise.resolve([]);
  }

  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI"],
        locationRestriction: {
          center,
          radius: GRAND_PARK_COMMUNITY.searchRadiusMeters,
        },
        includedPrimaryTypes: category.placeTypes,
        maxResultCount: 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rankPreference: "POPULARITY" as any,
      });
      return places;
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}

export function placeDisplayName(place: google.maps.places.Place): string {
  const name = place.displayName;
  if (typeof name === "string") return name;
  if (name && typeof name === "object" && "text" in name) {
    return String((name as { text?: string }).text ?? "Place");
  }
  return "Place";
}

export function placePosition(place: google.maps.places.Place): google.maps.LatLngLiteral | null {
  const loc = place.location;
  if (!loc) return null;
  return { lat: loc.lat(), lng: loc.lng() };
}
