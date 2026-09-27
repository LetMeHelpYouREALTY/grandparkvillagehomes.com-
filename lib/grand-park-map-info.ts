import { googleMapsDirectionsUrl } from "@/lib/grand-park-amenity-config";

export function buildPlaceInfoContent(
  displayName: string,
  address: string,
  directionsTarget: string
): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "260px";
  wrap.style.padding = "4px 0";

  const title = document.createElement("strong");
  title.textContent = displayName;
  wrap.appendChild(title);

  if (address) {
    wrap.appendChild(document.createElement("br"));
    const addr = document.createElement("span");
    addr.textContent = address;
    wrap.appendChild(addr);
  }

  wrap.appendChild(document.createElement("br"));
  const link = document.createElement("a");
  link.href = googleMapsDirectionsUrl(directionsTarget);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Directions";
  wrap.appendChild(link);

  return wrap;
}

export function buildCommunityInfoContent(
  name: string,
  address: string
): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "240px";
  wrap.style.padding = "4px 0";

  const title = document.createElement("strong");
  title.textContent = name;
  wrap.appendChild(title);

  wrap.appendChild(document.createElement("br"));
  const addr = document.createElement("span");
  addr.textContent = address;
  wrap.appendChild(addr);

  wrap.appendChild(document.createElement("br"));
  const link = document.createElement("a");
  link.href = googleMapsDirectionsUrl(address);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Directions";
  wrap.appendChild(link);

  return wrap;
}
