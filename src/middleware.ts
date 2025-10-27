// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log('🩸🩸 ~m token:', token);

  const protectedPaths = ["/manage"];
  const authPaths = ["/login"];

  const isProtected = protectedPaths.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  );

  const isAuthPath = authPaths.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  );

  // Redirect to login if accessing protected route without token
  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Don't redirect from login if user just logged in
  // Allow the client-side navigation to work
  if (isAuthPath && token) {
    // Only redirect if they're directly accessing login, not after a successful login
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    if (callbackUrl) {
      return NextResponse.redirect(new URL(callbackUrl, req.url));
    }
    // If no callback URL, let them stay on login page to allow client-side nav
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};