/**
 * Grand Park Village (West Summerlin) — map center, categories, and verified nearby places.
 * Center: Toll Brothers Glenrock sales gallery (documented village anchor).
 * Coordinates via OpenStreetMap/Nominatim for 360 Talon Heights St, Las Vegas, NV 89138.
 */

import type { DomainConfig } from "@/lib/domain-config";

export const GRAND_PARK_COMMUNITY = {
  name: "Grand Park Village",
  shortName: "Grand Park",
  city: "Las Vegas",
  state: "NV",
  regionLabel: "West Summerlin",
  /** Documented Glenrock sales gallery — village map anchor */
  address: "360 Talon Heights St, Las Vegas, NV 89138",
  center: {
    lat: 36.1875808,
    lng: -115.3680718,
  },
  searchRadiusMeters: 5000,
} as const;

export type AmenityCategoryId =
  | "parks"
  | "grocery"
  | "restaurants"
  | "schools"
  | "healthcare"
  | "fitness"
  | "golf"
  | "shopping"
  | "cafes"
  | "pharmacies"
  | "parking";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places (New) primary types for searchNearby */
  placeTypes: string[];
  ariaLabel: string;
};

export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "parks",
    label: "Parks",
    placeTypes: ["park", "national_park"],
    ariaLabel: "Show parks and recreation near Grand Park Village",
  },
  {
    id: "grocery",
    label: "Grocery",
    placeTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Grand Park Village",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    placeTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Grand Park Village",
  },
  {
    id: "schools",
    label: "Schools",
    placeTypes: ["school", "primary_school", "secondary_school"],
    ariaLabel: "Show schools near Grand Park Village",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    placeTypes: ["hospital", "doctor"],
    ariaLabel: "Show healthcare near Grand Park Village",
  },
  {
    id: "fitness",
    label: "Fitness",
    placeTypes: ["gym"],
    ariaLabel: "Show fitness centers near Grand Park Village",
  },
  {
    id: "golf",
    label: "Golf",
    placeTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Grand Park Village",
  },
  {
    id: "shopping",
    label: "Shopping",
    placeTypes: ["shopping_mall", "department_store"],
    ariaLabel: "Show shopping near Grand Park Village",
  },
  {
    id: "cafes",
    label: "Cafes",
    placeTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes near Grand Park Village",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    placeTypes: ["pharmacy", "drugstore"],
    ariaLabel: "Show pharmacies near Grand Park Village",
  },
  {
    id: "parking",
    label: "Parking",
    placeTypes: ["parking"],
    ariaLabel: "Show parking near Grand Park Village",
  },
];

export type CuratedPlace = {
  name: string;
  /** Verified street line; omit from JSON-LD when undefined */
  address?: string;
  sourceUrl: string;
  category: AmenityCategoryId;
  schemaType:
    | "Place"
    | "Restaurant"
    | "Park"
    | "Hospital"
    | "GolfCourse"
    | "School"
    | "Store"
    | "Pharmacy";
  note?: string;
};

/** Verified names and addresses — fallback list, copy, and ItemList schema. */
export const CURATED_NEARBY_PLACES: CuratedPlace[] = [
  {
    name: "Grand Park (Council Park, phase one)",
    address: "1001 Kettle Ridge Dr, Las Vegas, NV 89138",
    sourceUrl:
      "https://www.reviewjournal.com/local/summerlin/part-of-90-acre-park-opens-in-summerlin-photos-3731306/",
    category: "parks",
    schemaType: "Park",
    note:
      "Summerlin’s largest planned park (about 90 acres total); the first phase opened with fields, courts, splash pad, and playgrounds.",
  },
  {
    name: "Downtown Summerlin",
    address: "1980 Festival Plaza Dr, Las Vegas, NV 89135",
    sourceUrl: "https://summerlin.com/downtown-summerlin/",
    category: "shopping",
    schemaType: "Store",
    note: "Open-air shopping, dining, and services at the heart of Summerlin.",
  },
  {
    name: "Las Vegas Ballpark",
    address: "1650 S Pavilion Center Dr, Las Vegas, NV 89135",
    sourceUrl: "https://www.thelvballpark.com/contact",
    category: "parks",
    schemaType: "Place",
    note: "Triple-A baseball and events next to Downtown Summerlin.",
  },
  {
    name: "TPC Las Vegas",
    address: "9851 Canyon Run Dr, Las Vegas, NV 89144",
    sourceUrl: "https://tpc.com/lasvegas/contact-directions/",
    category: "golf",
    schemaType: "GolfCourse",
    note: "Public PGA TOUR golf course in Summerlin.",
  },
  {
    name: "Angel Park Golf Club",
    address: "100 S Rampart Blvd, Las Vegas, NV 89145",
    sourceUrl: "https://www.angelpark.com/",
    category: "golf",
    schemaType: "GolfCourse",
    note: "Municipal golf complex with multiple courses in west Las Vegas.",
  },
  {
    name: "Bear's Best Las Vegas",
    address: "11111 W Flamingo Rd, Las Vegas, NV 89135",
    sourceUrl: "https://www.bearsbestlv.com/",
    category: "golf",
    schemaType: "GolfCourse",
    note: "Jack Nicklaus-designed course with 18 holes pulled from other Bear’s Best venues.",
  },
  {
    name: "Summerlin Hospital Medical Center",
    address: "657 N Town Center Dr, Las Vegas, NV 89144",
    sourceUrl: "https://www.summerlinhospital.com/about/contact-us",
    category: "healthcare",
    schemaType: "Hospital",
    note: "Full-service hospital serving Summerlin and west Las Vegas.",
  },
  {
    name: "Red Rock Canyon National Conservation Area Visitor Center",
    address: "1000 Scenic Loop Dr, Las Vegas, NV 89161",
    sourceUrl: "https://www.blm.gov/visit/red-rock-canyon-national-conservation-area",
    category: "parks",
    schemaType: "Park",
    note: "Scenic loop, trails, and visitor center west of Summerlin.",
  },
  {
    name: "Whole Foods Market (Summerlin)",
    address: "2475 S Town Center Dr, Las Vegas, NV 89135",
    sourceUrl: "https://www.wholefoodsmarket.com/stores/summerlin",
    category: "grocery",
    schemaType: "Store",
  },
  {
    name: "Smith's Food and Drug",
    address: "9851 W Charleston Blvd, Las Vegas, NV 89117",
    sourceUrl: "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/charleston/70500221",
    category: "grocery",
    schemaType: "Store",
  },
  {
    name: "Ernest A. Becker Middle School",
    address: "9151 Pinewood Hills Dr, Las Vegas, NV 89134",
    sourceUrl: "https://www.beckerms.org/",
    category: "schools",
    schemaType: "School",
  },
  {
    name: "Palo Verde High School",
    address: "333 Pavilion Center Dr, Las Vegas, NV 89144",
    sourceUrl: "https://www.paloverde.org/contact-us/contact",
    category: "schools",
    schemaType: "School",
  },
];

export const AMENITIES_PAGE_FAQS = [
  {
    question: "What grocery stores are near Grand Park Village?",
    answer:
      "Downtown Summerlin, Whole Foods on Town Center Drive, and Smith’s on West Charleston Boulevard are common options for Grand Park buyers; exact stores depend on your builder section west of the 215 Beltway.",
  },
  {
    question: "How far is Grand Park Village from the Las Vegas Strip?",
    answer:
      "Grand Park in West Summerlin is roughly 20–25 miles from the central Las Vegas Strip, or about 30–40 minutes by car in typical traffic (approximate).",
  },
  {
    question: "Are there hospitals near Grand Park Village?",
    answer:
      "Yes — Summerlin Hospital Medical Center on Town Center Drive is the primary full-service hospital serving west Summerlin and Grand Park residents.",
  },
  {
    question: "What recreation is inside Grand Park Village?",
    answer:
      "The village is planned around a 90-plus-acre central park with baseball and softball fields, basketball and pickleball courts, playgrounds, a splash pad, and fitness stations.",
  },
  {
    question: "Where do Grand Park residents shop and dine?",
    answer:
      "Most residents use Downtown Summerlin for dining, retail, and services, with additional options along Charleston Boulevard and in nearby Summerlin villages.",
  },
  {
    question: "How long is the drive from Grand Park to Harry Reid International Airport?",
    answer:
      "Harry Reid International Airport is typically about 25–35 minutes from Grand Park Village via the 215 Beltway and I-15, depending on traffic (approximate).",
  },
  {
    question: "What golf is close to Grand Park in Summerlin?",
    answer:
      "TPC Las Vegas, Angel Park, and Bear’s Best are within a typical 15–25 minute drive from Grand Park (approximate).",
  },
];

export function isGrandParkCommunitySite(config: DomainConfig): boolean {
  return (
    config.domain === "grandparkvillagehomes.com" ||
    config.domain === "heyberkshire.com" ||
    config.domain === "default" ||
    config.neighborhood === "Grand Park" ||
    config.keywords.some((k) => k.toLowerCase().includes("grand park"))
  );
}

export function googleMapsEmbedUrl(lat: number, lng: number, zoom = 14): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function googleMapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
