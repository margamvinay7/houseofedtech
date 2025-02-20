import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // console.log(req.nextUrl);
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.next();
  }
  if (pathname === "/logout") {
    req.cookies.set("token", "");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!login|signup).*)",
};
