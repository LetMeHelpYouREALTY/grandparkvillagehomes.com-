import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.grandparkvillagehomes.com";

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") || "";
  const hostname = hostHeader.split(":")[0].toLowerCase();
  const proto = (request.headers.get("x-forwarded-proto") || "https").split(",")[0].trim();
  const apex = hostname === "grandparkvillagehomes.com";
  const insecureWww = hostname === CANONICAL_HOST && proto === "http";

  if (apex || insecureWww) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();
  response.headers.set("x-domain", hostHeader);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
