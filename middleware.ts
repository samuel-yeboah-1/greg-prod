import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/actions"];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

  // Check if path is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // Get the session cookie
  const sessionToken = req.cookies.get("session_token")?.value;

  if (!sessionToken) {
    // If no session, redirect to login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, continue to the protected route
  return NextResponse.next();
}


export const config = {
    matcher: ["/actions/:path*"],  };