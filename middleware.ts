import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (userAgent(req).isBot) {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  if (!req.url.includes("/api")) {
    if (
      !req.cookies.has("carrotsession") &&
      !req.nextUrl.pathname.includes("/enter")
    ) {
      return NextResponse.redirect(new URL("/enter", req.url));
    }
  }
}

export const config = {
  matcher: "/",
};
