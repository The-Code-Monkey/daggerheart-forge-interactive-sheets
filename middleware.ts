import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Get the session token from cookies
  const sessionToken = req.cookies.get("sb-access-token")?.value;

  // Protected routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/character-builder",
    "/character-sheet",
    "/campaigns",
    "/homebrew",
    "/homebrewed",
  ];

  const pathname = req.nextUrl.pathname;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If accessing a protected route without a session, redirect to auth
  if (isProtectedRoute && !sessionToken) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If accessing auth page with a session, redirect to dashboard
  if (pathname === "/auth" && sessionToken) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
