/**
 * Grand Park village — monthly market data.
 * Update this one file each month; the market report and Grand Park pages read from it.
 * Builder prices are "from" base prices before lot premiums and options.
 */

export type Collection = {
  name: string;
  builder: string;
  homeType: string;
  sqftLow: number;
  sqftHigh: number;
  priceFrom: number;
  priceNote: string;
  source: string;
};

export const grandParkMarket = {
  month: "October 2026",
  updated: "2026-10-17",
  nextUpdate: "November 2026",
  zip: "89138",
  neighborhoods: 11,
  floorplans: "70+",
  sqftRange: "1,430–4,731",

  collections: [
    { name: "The Groves at Caldwell Park", builder: "KB Home", homeType: "Townhomes", sqftLow: 1430, sqftHigh: 1947, priceFrom: 380000, priceNote: "high $300,000s to mid-$400,000s", source: "summerlin.com, Sept 14, 2026" },
    { name: "The Landings at Caldwell Park", builder: "KB Home", homeType: "Single-family", sqftLow: 1832, sqftHigh: 2466, priceFrom: 550000, priceNote: "mid- to high $500,000s", source: "summerlin.com, Oct 13, 2026" },
    { name: "Iris Glen", builder: "Richmond American", homeType: "Paired homes", sqftLow: 2040, sqftHigh: 2450, priceFrom: 580000, priceNote: "from the high $500,000s", source: "summerlin.com, July 20, 2026" },
    { name: "Alton", builder: "KB Home", homeType: "Single-family", sqftLow: 1634, sqftHigh: 3063, priceFrom: 600000, priceNote: "$600,000s to mid-$800,000s", source: "summerlin.com, Sept 14, 2026" },
    { name: "Aberdeen", builder: "Tri Pointe Homes", homeType: "Single-family", sqftLow: 1869, sqftHigh: 2687, priceFrom: 680000, priceNote: "from the high $600,000s", source: "summerlin.com, July 20, 2026" },
    { name: "Brantley", builder: "Pulte Homes", homeType: "Single-family", sqftLow: 2194, sqftHigh: 4731, priceFrom: 900000, priceNote: "about $900,000 to over $1.5 million", source: "summerlin.com, July 20, 2026" },
    { name: "Edgewood", builder: "Tri Pointe Homes", homeType: "Single-family", sqftLow: 1995, sqftHigh: 2516, priceFrom: 900000, priceNote: "from the $900,000s (final homes)", source: "summerlin.com, Sept 14, 2026" },
    { name: "Ashland", builder: "Taylor Morrison", homeType: "Single-story", sqftLow: 2450, sqftHigh: 3306, priceFrom: 1000000, priceNote: "from just over $1 million", source: "summerlin.com, Oct 13, 2026" },
    { name: "Primrose Park", builder: "Richmond American", homeType: "Single-family", sqftLow: 3410, sqftHigh: 3690, priceFrom: 1100000, priceNote: "from about $1.1 million", source: "summerlin.com, July 20, 2026" },
    { name: "Glenrock", builder: "Toll Brothers", homeType: "Gated single-family", sqftLow: 2897, sqftHigh: 4557, priceFrom: 1398995, priceNote: "$1,398,995 to nearly $1.9 million", source: "tollbrothers.com, Oct 12, 2026" },
    { name: "Carlisle Peak & Ridge", builder: "Tri Pointe Homes", homeType: "Single-family", sqftLow: 3234, sqftHigh: 4283, priceFrom: 1400000, priceNote: "about $1.4 million to $1.6 million", source: "summerlin.com, July 20, 2026" },
    { name: "Arcadia", builder: "SHAWOOD", homeType: "Gated single-family", sqftLow: 3176, sqftHigh: 3399, priceFrom: 1584990, priceNote: "from $1,584,990", source: "shawood.com, Oct 17, 2026" },
    { name: "Fairview", builder: "Lennar", homeType: "Single-story", sqftLow: 3793, sqftHigh: 3972, priceFrom: 1900000, priceNote: "about $1.9 million to over $2 million", source: "summerlin.com, July 20, 2026" },
  ] satisfies Collection[],

  /** A finished home a builder is selling now. */
  quickMoveIn: { label: "Glenrock Rosendale, 253 Talon Heights St", sqft: 3956, beds: 5, price: 1700000, source: "tollbrothers.com, Oct 12, 2026" },

  /** MLS context for ZIP 89138 (the whole ZIP, not Grand Park alone). */
  mls: {
    village29Listed: 31,
    village29Low: 409750,
    village29High: 2085961,
    village29AsOf: "2026-09-29",
    zipMedianList: 827000,
    zipMedianDom: 39,
    zipAsOf: "2026-10-17",
  },

  sources: [
    { label: "Summerlin — Grand Park village new home options (Oct 13, 2026)", url: "https://summerlin.com/summerlins-grand-park-village-teeming-with-new-home-options/", checked: "2026-10-17" },
    { label: "Summerlin — new Grand Park neighborhoods (July 20, 2026)", url: "https://summerlin.com/new-summerlin-neighborhoods-offer-homes-in-all-sizes-prices-for-every-stage-of-life/", checked: "2026-10-17" },
    { label: "Summerlin — neighborhoods reaching final inventory (Sept 14, 2026)", url: "https://summerlin.com/ten-summerlin-neighborhoods-reaching-final-inventory/", checked: "2026-10-17" },
    { label: "Toll Brothers — Glenrock", url: "https://www.tollbrothers.com/luxury-homes-for-sale/Nevada/Glenrock", checked: "2026-10-17" },
    { label: "SHAWOOD — Arcadia", url: "https://shawood.com/community/arcadia/", checked: "2026-10-17" },
    { label: "Nevada Real Estate Group — Grand Park / ZIP 89138 MLS figures", url: "https://www.nevadarealestategroup.com/las-vegas/summerlin-grand-park/", checked: "2026-10-17" },
  ],
};
