import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, _next
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if URL already has locale
  const hasLocale = pathname.startsWith("/it") || pathname.startsWith("/en");

  if (!hasLocale) {
    // Detect locale from IP or Accept-Language header
    const locale = detectLocale(request);

    // Redirect root to localized version
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

function detectLocale(request: NextRequest): "it" | "en" {
  // 1. Check cookie preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale === "it" || cookieLocale === "en") {
    return cookieLocale;
  }

  // 2. Geolocation via CF-IPCountry header (Cloudflare)
  const country = request.headers.get("CF-IPCountry");
  if (country === "IT") return "it";

  // 3. Accept-Language header fallback
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage?.includes("it")) return "it";

  // 4. Default to English for international visitors
  return "en";
}

export const config = {
  matcher: "/((?!_next|api|favicon.ico|images).*)",
};
