import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLang, LANGUAGE_COOKIE, localePath } from "./app/lib/i18n";

function preferredLocale(request: NextRequest): "en" | "cs" {
  const cookie = request.cookies.get(LANGUAGE_COOKIE)?.value;
  return isLang(cookie) ? cookie : defaultLocale;
}

export function proxy(request: NextRequest) {
  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = localePath(locale);

  // Only the language chooser depends on a preference; never cache it permanently.
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie");
  return response;
}

export const config = {
  matcher: ["/"],
};
