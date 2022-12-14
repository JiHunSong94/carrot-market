import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (userAgent(req).isBot) {
    return NextResponse.rewrite(new URL("/errors", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/chats")) {
    console.log("chats ONLY middleware");
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.has("carrotsession")) {
      /* const cookie = req.cookies.get("carrotsession")?.value; */
      return NextResponse.rewrite(new URL("/enter", req.url));
    }
  }
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  mathcer: "/",
};
