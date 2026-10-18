/**
 * Compact global hero banner config — shown on every page via root layout.
 * Distinct from full-bleed PageHero (homepage / page-level heroes).
 */

export type GlobalHeroConfig = {
  src: string;
  alt: string;
  tagline: string;
  phoneDisplay?: string;
  phoneTel?: string;
};

export const GLOBAL_HERO: GlobalHeroConfig = {
  src: "/images/global-hero/grand-park-village-homes-las-vegas.jpg",
  alt: "Illustration of the Las Vegas skyline and rooftops at dusk",
  tagline: "Grand Park Village Homes — By Dr. Jan Duffy",
  phoneDisplay: "(702) 500-1942",
  phoneTel: "tel:+17025001942",
};
