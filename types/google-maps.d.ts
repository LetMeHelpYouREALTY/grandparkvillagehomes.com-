/** Minimal typings for Maps JavaScript API + Places (New) used by CommunityAmenityMap. */

declare namespace google.maps {
  class Map {
    constructor(el: HTMLElement, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    fitBounds(bounds: LatLngBounds): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    addListener(event: string, handler: () => void): void;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(opts: { map: Map; anchor?: Marker }): void;
    close(): void;
    setContent(content: string): void;
  }

  class LatLngBounds {
    extend(point: LatLng | LatLngLiteral): void;
  }

  interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    mapId?: string;
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    streetViewControl?: boolean;
    mapTypeControl?: boolean;
    fullscreenControl?: boolean;
  }

  interface MarkerOptions {
    map?: Map;
    position?: LatLngLiteral;
    title?: string;
    label?: string | { text: string; color?: string };
  }

  interface InfoWindowOptions {
    content?: string;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  function importLibrary(name: "maps" | "places"): Promise<PlacesLibrary | unknown>;

  interface PlacesLibrary {
    Place: typeof places.Place;
  }
}

declare namespace google.maps.places {
  class Place {
    static searchNearby(request: SearchNearbyRequest): Promise<{ places: Place[] }>;
    displayName?: string;
    formattedAddress?: string;
    rating?: number;
    location?: google.maps.LatLngLiteral;
  }

  interface SearchNearbyRequest {
    fields: string[];
    locationRestriction: {
      center: google.maps.LatLngLiteral;
      radius: number;
    };
    includedPrimaryTypes?: string[];
    maxResultCount?: number;
  }
}

interface Window {
  google?: typeof google;
}

declare const google: {
  maps: typeof google.maps;
};
