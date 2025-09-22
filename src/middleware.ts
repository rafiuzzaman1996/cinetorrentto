import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = ["/manage",];
  const isProtected = protectedPaths.some((p) =>
    req.nextUrl.pathname.startsWith(p)
);

if (isProtected) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"], // protect these routes
};
