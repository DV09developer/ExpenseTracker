// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/transactions",
  "/analytics",
  "/profile",
];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const authRoutes = ["/login", "/Sign-up"];

  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transactions/:path*",
    "/analytics/:path*",
    "/profile/:path*",
  ],
};
