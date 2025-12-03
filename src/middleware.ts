import { jwtDecode } from "jwt-decode";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { User } from "./types/auth";

interface TokenDecoded extends User {
  iat: number;
  exp?: number;
}

const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/contact", whenAuthenticated: "next" },
  { path: "/privacy", whenAuthenticated: "next" },
  { path: "/terms", whenAuthenticated: "next" },
  { path: "/forgot-password", whenAuthenticated: "next" },
  { path: "/error-page", whenAuthenticated: "next" },
  { path: /^\/product\/[^/]+$/, whenAuthenticated: "next" },
] as const;

const protectedRoutesByRole = {
  admin: /^\/admin(\/.*)?$/,
  supplier: /^\/supplier(\/.*)?$/,
  store: /^\/store(\/.*)?$/,
} as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => (typeof route.path === "string" ? route.path === path : route.path.test(path)));
  const authToken = request.cookies.get("auth_token")?.value || null;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    const tokenString = authToken;

    try {
      const tokenDecoded: TokenDecoded = jwtDecode(tokenString);

      if (tokenDecoded.iat * 1000 < Date.now() - 24 * 60 * 60 * 1000) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete("auth_token");

        return response;
      }

      const userRole = tokenDecoded.funcao;

      const roleToRouteMap: Record<string, RegExp> = {
        admin: protectedRoutesByRole.admin,
        supplier: protectedRoutesByRole.supplier,
        fornecedor: protectedRoutesByRole.supplier,
        store: protectedRoutesByRole.store,
        usuario: protectedRoutesByRole.store,
        loja: protectedRoutesByRole.store,
      };

      const allowedRoutePattern = roleToRouteMap[userRole];

      if (!allowedRoutePattern) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete("auth_token");

        return response;
      }

      if (!allowedRoutePattern.test(path)) {
        const redirectUrl = request.nextUrl.clone();

        if (userRole === "admin") {
          redirectUrl.pathname = "/admin";
        } else if (userRole === "fornecedor") {
          redirectUrl.pathname = "/supplier";
        } else {
          redirectUrl.pathname = "/store";
        }

        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete("auth_token");

      return response;
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
