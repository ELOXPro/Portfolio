import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Only apply CORS headers for API requests
  if (req.nextUrl.pathname.startsWith("/api")) {
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
