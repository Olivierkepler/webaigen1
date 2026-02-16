import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Check for our admin auth cookie
  const isAuthenticated = request.cookies.get("admin_auth")?.value === "true";

  // Protect all /admin routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard pages
export const config = {
  matcher: ["/dashboard/:path*"],
};
