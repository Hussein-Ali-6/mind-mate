import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAPIRoute = nextUrl.pathname.startsWith("/api");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAPIAuthRoute || isAPIRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn)
      return NextResponse.redirect(
        new URL("/?message=You are already logged in.", nextUrl)
      );
    return;
  }

  if (!isPublicRoute && !isLoggedIn)
    return NextResponse.redirect(
      new URL("/auth/login?message=You must log in first.", nextUrl)
    );
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
