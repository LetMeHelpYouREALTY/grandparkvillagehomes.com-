/**
 * Grand Park Village Homes media.
 * Files in public/images are the git backup.
 * The same objects are stored in Cloudflare R2 bucket `grandparkvillagehomes-images`.
 */

export const GRAND_PARK_R2_BUCKET = "grandparkvillagehomes-images";

export const grandParkImages = {
  hero: "/images/neighborhoods/grand-park-village-hero.png",
  park: "/images/neighborhoods/grand-park-central-park.png",
  singleFamily: "/images/neighborhoods/grand-park-single-family.png",
  townhomes: "/images/neighborhoods/grand-park-townhomes.png",
  mark: "/images/logos/grand-park-village-mark.png",
  logo: "/images/logos/grand-park-village-homes.svg",
} as const;

export const grandParkR2Keys = {
  hero: "grand-park/grand-park-village-hero.png",
  park: "grand-park/grand-park-central-park.png",
  singleFamily: "grand-park/grand-park-single-family.png",
  townhomes: "grand-park/grand-park-townhomes.png",
  mark: "grand-park/grand-park-village-mark.png",
  logo: "grand-park/grand-park-village-homes.svg",
} as const;
