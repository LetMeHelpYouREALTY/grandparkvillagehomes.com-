/**
 * Dr. Jan Duffy portraits.
 * The nav mark is a tight circle crop. The homepage hero uses a wider
 * circular photo so her shoulders and the gold ring are not clipped.
 * Alt text and captions change with the page so search and answer engines
 * can tie her to that page's place and topic.
 */

export const AGENT_IMAGES = {
  circle: "/images/agent/dr-jan-duffy-grand-park-circle.png",
  phoneCircle: "/images/agent/dr-jan-duffy-calling-circle.jpg",
  portrait: "/images/agent/dr-jan-duffy-west-summerlin-realtor.jpg",
  badge: "/images/agent/dr-jan-duffy-grand-park-village-homes-badge.jpg",
} as const;

export type AgentPortraitCopy = {
  topic: string;
  place: string;
  alt: string;
  caption: string;
};

type PageFacts = {
  topic: string;
  place: string;
  detail: string;
};

const PAGES: Record<string, PageFacts> = {
  "/": {
    topic: "Grand Park Village Homes",
    place: "West Summerlin, Las Vegas, Nevada",
    detail: "new homes in Grand Park, from the high $300,000s to over $1.6 million",
  },
  "/about": {
    topic: "her Las Vegas real estate practice",
    place: "Las Vegas, Nevada",
    detail: "buying and selling homes across Las Vegas, Henderson, and Summerlin since 2008",
  },
  "/contact": {
    topic: "a Las Vegas home search",
    place: "Las Vegas, Nevada",
    detail: "scheduling a call or a visit at 9406 W Lake Mead Blvd, Suite 100",
  },
  "/neighborhoods": {
    topic: "Las Vegas Valley neighborhoods",
    place: "Las Vegas, Nevada",
    detail: "Summerlin, Henderson, Grand Park, and the rest of the Las Vegas Valley",
  },
  "/neighborhoods/grand-park": {
    topic: "Grand Park Village and Glenrock",
    place: "West Summerlin, Las Vegas, Nevada",
    detail: "Glenrock at 360 Talon Heights St and the other Grand Park collections",
  },
  "/neighborhoods/summerlin": {
    topic: "Summerlin homes",
    place: "Summerlin, Las Vegas, Nevada",
    detail: "Summerlin villages, including Grand Park west of the 215 Beltway",
  },
  "/neighborhoods/henderson": {
    topic: "Henderson homes",
    place: "Henderson, Nevada",
    detail: "Henderson neighborhoods from Green Valley to Inspirada",
  },
  "/neighborhoods/green-valley": {
    topic: "Green Valley homes",
    place: "Henderson, Nevada",
    detail: "resale and new homes in Green Valley",
  },
  "/neighborhoods/inspirada": {
    topic: "Inspirada homes",
    place: "Henderson, Nevada",
    detail: "Inspirada's trails, parks, and home collections",
  },
  "/neighborhoods/southern-highlands": {
    topic: "Southern Highlands homes",
    place: "Las Vegas, Nevada",
    detail: "Southern Highlands listings and golf-course homes",
  },
  "/neighborhoods/the-ridges": {
    topic: "The Ridges",
    place: "Summerlin, Las Vegas, Nevada",
    detail: "guard-gated homes in The Ridges",
  },
  "/neighborhoods/skye-canyon": {
    topic: "Skye Canyon homes",
    place: "Northwest Las Vegas, Nevada",
    detail: "Skye Canyon new construction and resale homes",
  },
  "/neighborhoods/centennial-hills": {
    topic: "Centennial Hills homes",
    place: "Northwest Las Vegas, Nevada",
    detail: "Centennial Hills listings and mountain-view lots",
  },
  "/neighborhoods/north-las-vegas": {
    topic: "North Las Vegas homes",
    place: "North Las Vegas, Nevada",
    detail: "North Las Vegas neighborhoods and new construction",
  },
  "/neighborhoods/mountains-edge": {
    topic: "Mountain's Edge homes",
    place: "Southwest Las Vegas, Nevada",
    detail: "Mountain's Edge parks, trails, and home listings",
  },
  "/new-construction": {
    topic: "Las Vegas new construction",
    place: "Las Vegas, Nevada",
    detail: "builder neighborhoods in Grand Park, Summerlin, and Henderson",
  },
  "/buyers": {
    topic: "buying a Las Vegas home",
    place: "Las Vegas, Nevada",
    detail: "a home search across the Las Vegas Valley",
  },
  "/buyers/first-time-buyers": {
    topic: "a first Las Vegas home purchase",
    place: "Las Vegas, Nevada",
    detail: "the first-home buying process in Las Vegas",
  },
  "/buyers/luxury-homes-las-vegas": {
    topic: "luxury homes in Las Vegas",
    place: "Las Vegas, Nevada",
    detail: "luxury listings in Summerlin, Henderson, and Southern Highlands",
  },
  "/buyers/california-relocator": {
    topic: "a move from California to Las Vegas",
    place: "Las Vegas, Nevada",
    detail: "relocating from California to a Las Vegas Valley home",
  },
  "/sellers": {
    topic: "selling a Las Vegas home",
    place: "Las Vegas, Nevada",
    detail: "pricing and selling a Las Vegas Valley home",
  },
  "/sellers/relocation": {
    topic: "selling before a move",
    place: "Las Vegas, Nevada",
    detail: "selling a Las Vegas home before relocating",
  },
  "/sellers/downsizing": {
    topic: "downsizing a Las Vegas home",
    place: "Las Vegas, Nevada",
    detail: "selling a larger home and choosing the next one",
  },
  "/sellers/move-up": {
    topic: "a move-up home sale",
    place: "Las Vegas, Nevada",
    detail: "selling one Las Vegas home to buy the next",
  },
  "/sellers/divorce-probate": {
    topic: "a divorce or probate sale",
    place: "Las Vegas, Nevada",
    detail: "selling a Las Vegas home during divorce or probate",
  },
  "/luxury-homes": {
    topic: "luxury Las Vegas homes",
    place: "Las Vegas, Nevada",
    detail: "luxury property in The Ridges, MacDonald Highlands, and Southern Highlands",
  },
  "/55-plus-communities": {
    topic: "55+ communities in Las Vegas",
    place: "Las Vegas, Nevada",
    detail: "age-restricted communities including Sun City Summerlin and Sun City Anthem",
  },
  "/55-plus-communities/sun-city-summerlin": {
    topic: "Sun City Summerlin",
    place: "Summerlin, Las Vegas, Nevada",
    detail: "Sun City Summerlin homes and amenities",
  },
  "/55-plus-communities/sun-city-anthem": {
    topic: "Sun City Anthem",
    place: "Henderson, Nevada",
    detail: "Sun City Anthem homes in Henderson",
  },
  "/55-plus-communities/sun-city-aliante": {
    topic: "Sun City Aliante",
    place: "North Las Vegas, Nevada",
    detail: "Sun City Aliante homes",
  },
  "/55-plus-communities/del-webb-lake-las-vegas": {
    topic: "Del Webb Lake Las Vegas",
    place: "Henderson, Nevada",
    detail: "Del Webb at Lake Las Vegas",
  },
  "/55-plus-communities/trilogy-summerlin": {
    topic: "Trilogy Summerlin",
    place: "Summerlin, Las Vegas, Nevada",
    detail: "Trilogy at Summerlin homes",
  },
  "/55-plus-communities/heritage-stonebridge": {
    topic: "Heritage at Stonebridge",
    place: "Summerlin, Las Vegas, Nevada",
    detail: "Heritage at Stonebridge homes",
  },
  "/55-plus-communities/solera-anthem": {
    topic: "Solera at Anthem",
    place: "Henderson, Nevada",
    detail: "Solera at Anthem homes",
  },
  "/market-report": {
    topic: "the Las Vegas housing market",
    place: "Las Vegas, Nevada",
    detail: "current Las Vegas prices, days on market, and inventory",
  },
  "/market-insights": {
    topic: "Las Vegas market insight",
    place: "Las Vegas, Nevada",
    detail: "what changed in the Las Vegas housing market",
  },
  "/market-update": {
    topic: "this week's Las Vegas market update",
    place: "Las Vegas, Nevada",
    detail: "the latest Las Vegas listing and price activity",
  },
  "/home-valuation": {
    topic: "a Las Vegas home value",
    place: "Las Vegas, Nevada",
    detail: "what a specific Las Vegas home is worth",
  },
  "/investment-properties": {
    topic: "Las Vegas investment property",
    place: "Las Vegas, Nevada",
    detail: "rental and investment homes in the Las Vegas Valley",
  },
  "/relocation": {
    topic: "relocating to Las Vegas",
    place: "Las Vegas, Nevada",
    detail: "a move into the Las Vegas Valley",
  },
  "/services": {
    topic: "Las Vegas real estate services",
    place: "Las Vegas, Nevada",
    detail: "buying, selling, new construction, and relocation help",
  },
  "/listings": {
    topic: "Las Vegas homes for sale",
    place: "Las Vegas, Nevada",
    detail: "current listings across the Las Vegas Valley",
  },
  "/faq": {
    topic: "Las Vegas real estate questions",
    place: "Las Vegas, Nevada",
    detail: "common questions about buying and selling in Las Vegas",
  },
  "/google-business": {
    topic: "her Las Vegas real estate office",
    place: "Las Vegas, Nevada",
    detail: "the Berkshire Hathaway HomeServices office at 9406 W Lake Mead Blvd",
  },
  "/why-berkshire-hathaway": {
    topic: "Berkshire Hathaway HomeServices Nevada Properties",
    place: "Las Vegas, Nevada",
    detail: "why she works under Berkshire Hathaway HomeServices",
  },
  "/security-policy": {
    topic: "this website's security policy",
    place: "Las Vegas, Nevada",
    detail: "how to report a security issue on this site",
  },
};

function humanize(pathname: string): string {
  const slug = pathname.split("/").filter(Boolean).pop() ?? "las-vegas-homes";
  return slug.replace(/-/g, " ");
}

const SLOT_NOTE = {
  nav: "Shown in the Grand Park Village Homes logo.",
  hero: "Shown at the top of the page.",
  footer: "Shown in the footer logo.",
  card: "Shown with her note at the end of the page.",
  feature: "Shown as the main portrait on the page.",
} as const;

export type PortraitSlot = keyof typeof SLOT_NOTE;

export function getAgentPortraitCopy(pathname: string, slot: PortraitSlot = "card"): AgentPortraitCopy {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const known = PAGES[path];
  const listingDetail = path.startsWith("/listings/")
    ? {
        topic: "a Las Vegas Valley listing",
        place: "Las Vegas, Nevada",
        detail: "this home for sale in the Las Vegas Valley",
      }
    : null;
  const facts = known ?? listingDetail ?? {
    topic: humanize(path),
    place: "Las Vegas, Nevada",
    detail: `${humanize(path)} in the Las Vegas Valley`,
  };

  return {
    topic: facts.topic,
    place: facts.place,
    alt: `Dr. Jan Duffy, Las Vegas REALTOR, smiling on a phone call in a royal blue blazer, photographed for ${facts.topic} in ${facts.place}. ${SLOT_NOTE[slot]}`,
    caption: `Dr. Jan Duffy of Grand Park Village Homes can walk you through ${facts.detail}. Berkshire Hathaway HomeServices Nevada Properties. Call or text (702) 222-1964.`,
  };
}
