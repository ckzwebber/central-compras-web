import { jwtDecode } from "jwt-decode";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

interface TokenDecoded {
  exp: number;
  iat: number;
  sub: string;
}

const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/checkout", whenAuthenticated: "next" }, // CARLOS MIGUEL: ONLY FOR TESTING PURPOSES, REMOVE LATER
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/account", whenAuthenticated: "next" }, // CARLOS MIGUEL: ONLY FOR TESTING PURPOSES, REMOVE LATER
  { path: "/checkout/shipping", whenAuthenticated: "next" }, // CARLOS MIGUEL: ONLY FOR TESTING PURPOSES, REMOVE LATER
  { path: "/checkout/payment", whenAuthenticated: "next" }, // CARLOS MIGUEL: ONLY FOR TESTING PURPOSES, REMOVE LATER
  { path: /^\/product\/[^/]+$/, whenAuthenticated: "next" }, // <-- rota dinâmica ajustada
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => (typeof route.path === "string" ? route.path === path : route.path.test(path)));
  const authToken = request.cookies.get("token");

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
    const tokenString = authToken.value;

    if (!tokenString) {
      return NextResponse.next();
    }

    const tokenDecoded: TokenDecoded = jwtDecode(tokenString);

    if (tokenDecoded.exp * 1000 < Date.now()) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete("token");

      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
