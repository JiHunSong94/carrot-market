import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (userAgent(req).isBot) {
    req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/404";
    return NextResponse.redirect(req.nextUrl);
  }
  if (
    !req.cookies.has("carrotsession") &&
    !req.nextUrl.pathname.includes("/enter")
  ) {
    req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/enter";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: "/pages/:path*",
};
