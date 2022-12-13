import type { NextRequest, NextFetchEvent } from "next/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("it works! global middleware");
  if (req.nextUrl.pathname.startsWith("/chats")) {
    console.log("chats ONLY middleware");
    console.log(req.cookies);
  }
}
