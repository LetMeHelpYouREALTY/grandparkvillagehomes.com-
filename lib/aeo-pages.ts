/**
 * One direct answer and two follow-up questions for every public route.
 * Copy stays factual: who, where, and what the page is for.
 * No new prices, rates, or neighborhood characterizations.
 */

export type AeoFaq = {
  question: string;
  answer: string;
};

export type AeoPage = {
  question: string;
  answer: string;
  faqs: [AeoFaq, AeoFaq];
};

const PHONE = "(702) 222-1964";
const AGENT =
  "Dr. Jan Duffy, REALTOR, license S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties";
const OFFICE = "9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134";

function entry(
  question: string,
  answer: string,
  first: AeoFaq,
  second: AeoFaq,
): AeoPage {
  return { question, answer, faqs: [first, second] };
}

function place(name: string, where: string): AeoPage {
  return entry(
    `Who sells homes in ${name}?`,
    `${name} is ${where}. ${AGENT} shows current ${name} listings and can be reached at ${PHONE}. The office is ${OFFICE}.`,
    {
      question: `How do I see homes for sale in ${name}?`,
      answer: `Call or text ${PHONE}. Dr. Jan Duffy pulls the current ${name} listings rather than a saved brochure.`,
    },
    {
      question: `Where is Dr. Jan Duffy's office?`,
      answer: `Berkshire Hathaway HomeServices Nevada Properties, ${OFFICE}.`,
    },
  );
}

const PAGES: Record<string, AeoPage> = {
  "/about": entry(
    "Who is Dr. Jan Duffy?",
    `${AGENT}. She works with buyers and sellers across the Las Vegas Valley, including Grand Park Village in west Summerlin. Call or text ${PHONE}.`,
    {
      question: "What brokerage does Dr. Jan Duffy work for?",
      answer:
        "Berkshire Hathaway HomeServices Nevada Properties, at 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134.",
    },
    {
      question: "How do I reach Dr. Jan Duffy?",
      answer: `Call or text ${PHONE}, or use the contact form on this site.`,
    },
  ),
  "/contact": entry(
    "How do I contact Dr. Jan Duffy?",
    `Call or text Dr. Jan Duffy at ${PHONE}. ${AGENT}. The office is ${OFFICE}.`,
    {
      question: "What is the office address?",
      answer: OFFICE,
    },
    {
      question: "What phone number should I use?",
      answer: `${PHONE} is the number on this page's call button.`,
    },
  ),
  "/listings": entry(
    "Where are Las Vegas homes for sale listed here?",
    `This page is the listing search for ${AGENT}. Live results come from the RealScout feed tied to her account. Call or text ${PHONE} for a home that is not on the page.`,
    {
      question: "Are these listings updated from the MLS?",
      answer:
        "The search widget reads the RealScout feed for Dr. Jan Duffy. Confirm price and status on the listing itself.",
    },
    {
      question: "Can I ask for a private search?",
      answer: `Yes. Call or text ${PHONE} with the area, price range, and home type you want.`,
    },
  ),
  "/why-berkshire-hathaway": entry(
    "Why does Dr. Jan Duffy work at Berkshire Hathaway HomeServices?",
    `${AGENT}. This page explains the brokerage she works under and the office at ${OFFICE}.`,
    {
      question: "What is the brokerage name?",
      answer: "Berkshire Hathaway HomeServices Nevada Properties.",
    },
    {
      question: "How do I work with her?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/market-report": entry(
    "Where is the Las Vegas market report?",
    `This page is Dr. Jan Duffy's Las Vegas market report. Figures shown here are the ones published on this page. For a number on a specific home, call or text ${PHONE}.`,
    {
      question: "Who publishes this report?",
      answer: AGENT,
    },
    {
      question: "Can I get numbers for one neighborhood?",
      answer: `Yes. Call or text ${PHONE} and name the neighborhood.`,
    },
  ),
  "/market-update": entry(
    "Where is the latest Las Vegas market update?",
    `This page is the market update from ${AGENT}. It covers the Las Vegas Valley, including Summerlin and Henderson.`,
    {
      question: "How do I ask about a price change?",
      answer: `Call or text ${PHONE}.`,
    },
    {
      question: "Who is the agent on this update?",
      answer: "Dr. Jan Duffy, license S.0197614.LLC.",
    },
  ),
  "/market-insights": entry(
    "What market insights does this page cover?",
    `This page collects Las Vegas Valley market notes from ${AGENT}. It is background for a conversation, not a quote on a specific house.`,
    {
      question: "How do I get a number for my house?",
      answer: `Use the home valuation page or call or text ${PHONE}.`,
    },
    {
      question: "Which markets does she cover?",
      answer: "Las Vegas, Henderson, and Summerlin, including Grand Park Village.",
    },
  ),
  "/google-business": entry(
    "How do I find Dr. Jan Duffy on Google?",
    `This page matches the public business details for ${AGENT}. Office: ${OFFICE}. Phone on the call button: ${PHONE}.`,
    {
      question: "What name should match the Google listing?",
      answer:
        "Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    },
    {
      question: "What is the street address?",
      answer: OFFICE,
    },
  ),
  "/faq": entry(
    "Where are the Las Vegas real estate questions answered?",
    `This page lists questions ${AGENT} answers about buying and selling in the Las Vegas Valley. If your question is not here, call or text ${PHONE}.`,
    {
      question: "Who answers these questions?",
      answer: "Dr. Jan Duffy, license S.0197614.LLC.",
    },
    {
      question: "Can I ask about one address?",
      answer: `Yes. Call or text ${PHONE} with the address.`,
    },
  ),
  "/buyers": entry(
    "How does buying a Las Vegas home with Dr. Jan Duffy work?",
    `This page is the buyer guide from ${AGENT}. She searches Las Vegas, Henderson, and Summerlin, including new homes in Grand Park Village. Call or text ${PHONE}.`,
    {
      question: "Do I have to pay the buyer's agent?",
      answer:
        "Ask Dr. Jan Duffy how compensation works on the specific home before you write an offer. Call or text (702) 222-1964.",
    },
    {
      question: "Which areas does she search?",
      answer: "The Las Vegas Valley, including Henderson, Summerlin, and Grand Park Village.",
    },
  ),
  "/buyers/first-time-buyers": entry(
    "Where do first-time buyers start in Las Vegas?",
    `This page is the first-home guide from ${AGENT}. Start with a price range and the areas you want, then call or text ${PHONE}.`,
    {
      question: "Who helps first-time buyers?",
      answer: "Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    },
    {
      question: "How do I reach her?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/buyers/california-relocator": entry(
    "Who helps people moving from California to Las Vegas?",
    `This page is the relocation guide from ${AGENT} for buyers coming from California. She covers Las Vegas, Henderson, and Summerlin. Call or text ${PHONE}.`,
    {
      question: "Can I start before I arrive?",
      answer: `Yes. Call or text ${PHONE} and say which week you will be in Las Vegas.`,
    },
    {
      question: "Which office handles the move?",
      answer: `Berkshire Hathaway HomeServices Nevada Properties, ${OFFICE}.`,
    },
  ),
  "/buyers/luxury-homes-las-vegas": entry(
    "Who shows luxury homes in Las Vegas?",
    `This page covers higher-priced Las Vegas homes with ${AGENT}. Call or text ${PHONE} for a private tour.`,
    {
      question: "Which brokerage is this?",
      answer: "Berkshire Hathaway HomeServices Nevada Properties.",
    },
    {
      question: "How do I ask for a private showing?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/sellers": entry(
    "How do I sell a Las Vegas home with Dr. Jan Duffy?",
    `This page is the seller guide from ${AGENT}. She lists homes from the office at ${OFFICE}. Call or text ${PHONE} for a pricing conversation.`,
    {
      question: "How do I get a value for my home?",
      answer: `Use the home valuation page or call or text ${PHONE}.`,
    },
    {
      question: "What is her license number?",
      answer: "S.0197614.LLC.",
    },
  ),
  "/sellers/move-up": entry(
    "How does a move-up sale work in Las Vegas?",
    `This page explains selling one Las Vegas Valley home and buying the next with ${AGENT}. Call or text ${PHONE} so the sale and the purchase can be timed together.`,
    {
      question: "Who coordinates both sides?",
      answer: "Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties.",
    },
    {
      question: "How do I start?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/sellers/downsizing": entry(
    "Who helps Las Vegas owners downsize?",
    `This page is for owners selling a larger Las Vegas Valley home and buying a smaller one with ${AGENT}. Call or text ${PHONE}.`,
    {
      question: "Does this include 55+ communities?",
      answer:
        "Yes. She also covers 55+ communities such as Sun City Summerlin, Del Webb, Trilogy, and Heritage at Stonebridge.",
    },
    {
      question: "How do I reach her?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/sellers/divorce-probate": entry(
    "Who sells a Las Vegas home during divorce or probate?",
    `This page is for Las Vegas Valley sales that involve a divorce or a probate estate. ${AGENT} handles the listing. Call or text ${PHONE}.`,
    {
      question: "Where is the office?",
      answer: OFFICE,
    },
    {
      question: "What should I have ready?",
      answer:
        "The property address and the name of the estate or the parties on title. Dr. Jan Duffy will tell you what else the sale needs.",
    },
  ),
  "/sellers/relocation": entry(
    "Who sells a Las Vegas home when the owner is moving away?",
    `This page is for owners who need to sell in the Las Vegas Valley while they relocate. ${AGENT} runs the sale from ${OFFICE}. Call or text ${PHONE}.`,
    {
      question: "Can the owner be out of state?",
      answer: `Yes. Call or text ${PHONE} and say where you will be during the listing.`,
    },
    {
      question: "Which brokerage lists the home?",
      answer: "Berkshire Hathaway HomeServices Nevada Properties.",
    },
  ),
  "/luxury-homes": entry(
    "Where do I look at Las Vegas luxury homes?",
    `This page is the luxury-home overview from ${AGENT}. Call or text ${PHONE} to narrow it to a guard-gated community or a price band.`,
    {
      question: "Who is the agent?",
      answer: "Dr. Jan Duffy, license S.0197614.LLC.",
    },
    {
      question: "How do I book a tour?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/new-construction": entry(
    "Who helps buyers with new construction in Las Vegas?",
    `This page covers new construction with ${AGENT}, including Grand Park Village west of the 215 Beltway in Summerlin. Builder representation is arranged before you register at the model. Call or text ${PHONE}.`,
    {
      question: "Should I register at the model first?",
      answer:
        "Call Dr. Jan Duffy before you sign in at a sales office so she can represent you on that community.",
    },
    {
      question: "Where is Grand Park Village?",
      answer: "West Summerlin, west of the 215 Beltway.",
    },
  ),
  "/investment-properties": entry(
    "Who helps buy Las Vegas investment property?",
    `This page is the investment overview from ${AGENT}. She runs the numbers on a specific address rather than a citywide promise. Call or text ${PHONE}.`,
    {
      question: "What do I need to ask about a rental?",
      answer:
        "Price, rent for comparable homes, HOA dues, and whether the city allows the rental term you want.",
    },
    {
      question: "How do I start?",
      answer: `Call or text ${PHONE} with the zip code or the address.`,
    },
  ),
  "/relocation": entry(
    "Who helps people relocating to Las Vegas?",
    `This page is the relocation guide from ${AGENT}. She covers Las Vegas, Henderson, and Summerlin. Call or text ${PHONE} before you travel.`,
    {
      question: "Can the search start remotely?",
      answer: `Yes. Call or text ${PHONE}.`,
    },
    {
      question: "Where is the office if I visit?",
      answer: OFFICE,
    },
  ),
  "/home-valuation": entry(
    "How do I get a Las Vegas home valuation?",
    `This page is the home valuation request for ${AGENT}. She prices a specific address from comparable sales. Call or text ${PHONE}, or send the form.`,
    {
      question: "Is this an instant online estimate?",
      answer:
        "No. Dr. Jan Duffy reviews the address and the comparable sales, then follows up.",
    },
    {
      question: "What phone number do I use?",
      answer: PHONE,
    },
  ),
  "/services": entry(
    "What real estate services does Dr. Jan Duffy offer?",
    `${AGENT} helps people buy, sell, and compare homes in the Las Vegas Valley, including new construction and 55+ communities. Call or text ${PHONE}.`,
    {
      question: "Where is the office?",
      answer: OFFICE,
    },
    {
      question: "Does she cover Grand Park Village?",
      answer: "Yes. Grand Park Village is in west Summerlin, west of the 215 Beltway.",
    },
  ),
  "/55-plus-communities": entry(
    "Which 55+ communities does Dr. Jan Duffy cover?",
    `This page lists 55+ communities in the Las Vegas Valley that ${AGENT} sells, including Sun City Summerlin, Sun City Anthem, Del Webb, Trilogy, Heritage at Stonebridge, and Solera at Anthem. Call or text ${PHONE}.`,
    {
      question: "What is the age rule?",
      answer:
        "Housing for older persons generally requires that at least 80 percent of occupied units have one resident who is 55 or older. Confirm the rule for the community you are considering.",
    },
    {
      question: "How do I compare two communities?",
      answer: `Call or text ${PHONE} and name the two communities.`,
    },
  ),
  "/55-plus-communities/sun-city-summerlin": place(
    "Sun City Summerlin",
    "a 55+ community in Summerlin, Las Vegas",
  ),
  "/55-plus-communities/sun-city-anthem": place(
    "Sun City Anthem",
    "a 55+ community in Henderson",
  ),
  "/55-plus-communities/del-webb-lake-las-vegas": place(
    "Del Webb Lake Las Vegas",
    "a 55+ community at Lake Las Vegas in Henderson",
  ),
  "/55-plus-communities/sun-city-aliante": place(
    "Sun City Aliante",
    "a 55+ community in North Las Vegas",
  ),
  "/55-plus-communities/heritage-stonebridge": place(
    "Heritage at Stonebridge",
    "a 55+ community in Summerlin",
  ),
  "/55-plus-communities/trilogy-summerlin": place(
    "Trilogy at Summerlin",
    "a 55+ community in Summerlin",
  ),
  "/55-plus-communities/solera-anthem": place(
    "Solera at Anthem",
    "a 55+ community in Henderson",
  ),
  "/neighborhoods": entry(
    "Which Las Vegas neighborhoods does this site cover?",
    `This page links the neighborhood guides from ${AGENT}: Summerlin, Grand Park Village, Henderson, and the other valley areas listed here. Call or text ${PHONE}.`,
    {
      question: "Where is Grand Park Village?",
      answer: "West Summerlin, west of the 215 Beltway.",
    },
    {
      question: "How do I ask about a neighborhood that is not listed?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/neighborhoods/summerlin": place(
    "Summerlin",
    "a master-planned area in the west Las Vegas Valley",
  ),
  "/neighborhoods/grand-park": place(
    "Grand Park Village",
    "a newer Summerlin village west of the 215 Beltway, with single-family homes, paired homes, and townhomes",
  ),
  "/neighborhoods/grand-park/glenrock": place(
    "Glenrock at Grand Park",
    "a home collection inside Grand Park Village in west Summerlin",
  ),
  "/neighborhoods/grand-park/builders": entry(
    "Which builders are at Grand Park Village?",
    `This page names the builders selling new homes in Grand Park Village, west of the 215 Beltway in Summerlin. ${AGENT} can represent you before you register at a model. Call or text ${PHONE}.`,
    {
      question: "Should I visit the model first?",
      answer: `Call ${PHONE} before you sign in at the sales office.`,
    },
    {
      question: "Where is Grand Park Village?",
      answer: "West Summerlin, west of the 215 Beltway.",
    },
  ),
  "/neighborhoods/grand-park/park": entry(
    "What park is in Grand Park Village?",
    "Grand Park Village in west Summerlin is built around its central park, west of the 215 Beltway. Dr. Jan Duffy, license S.0197614.LLC, shows the homes beside that park. Call or text (702) 222-1964.",
    {
      question: "Who shows homes beside the park?",
      answer: AGENT,
    },
    {
      question: "How do I see what is for sale?",
      answer: `Call or text ${PHONE}.`,
    },
  ),
  "/neighborhoods/henderson": place(
    "Henderson",
    "the city southeast of Las Vegas",
  ),
  "/neighborhoods/green-valley": place(
    "Green Valley",
    "an area of Henderson",
  ),
  "/neighborhoods/the-ridges": place(
    "The Ridges",
    "a guard-gated community in Summerlin",
  ),
  "/neighborhoods/southern-highlands": place(
    "Southern Highlands",
    "a master-planned area in southwest Las Vegas",
  ),
  "/neighborhoods/north-las-vegas": place(
    "North Las Vegas",
    "the city north of Las Vegas",
  ),
  "/neighborhoods/skye-canyon": place(
    "Skye Canyon",
    "a master-planned community in northwest Las Vegas",
  ),
  "/neighborhoods/centennial-hills": place(
    "Centennial Hills",
    "a northwest Las Vegas area",
  ),
  "/neighborhoods/inspirada": place(
    "Inspirada",
    "a master-planned community in Henderson",
  ),
  "/neighborhoods/mountains-edge": place(
    "Mountain's Edge",
    "a master-planned community in southwest Las Vegas",
  ),
  "/security-policy": entry(
    "How do I report a security issue on this website?",
    "This page is the security policy for grandparkvillagehomes.com. Use the contact method on the page to report a vulnerability. It is not a page about homes for sale.",
    {
      question: "Who operates the site?",
      answer: AGENT,
    },
    {
      question: "Where do I send a housing question?",
      answer: `Call or text ${PHONE}. Use this page only for security reports.`,
    },
  ),
};

const LISTING_PAGE = entry(
  "Whose listing is this?",
  `This is a single Las Vegas Valley listing page from ${AGENT}. Price, status, and brokerage attribution are on the listing. Call or text ${PHONE} to ask about this address.`,
  {
    question: "How do I confirm the price?",
    answer: "Read the price on this listing, then call or text (702) 222-1964 if you need it checked.",
  },
  {
    question: "Who is the agent?",
    answer: "Dr. Jan Duffy, license S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.",
  },
);

export function getAeoPage(pathname: string): AeoPage | null {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (path === "/") return null;
  if (PAGES[path]) return PAGES[path];
  if (path.startsWith("/listings/")) return LISTING_PAGE;
  return null;
}

export function aeoPaths(): string[] {
  return Object.keys(PAGES);
}
