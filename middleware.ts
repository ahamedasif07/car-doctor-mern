import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_car_doctor_secret_key_2026";

async function verifyAuthToken(token?: string) {
  if (!token) return null;
  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const user = await verifyAuthToken(token);

  // 1. Protect Dashboard Routes
  if (pathname.startsWith("/dashboard")) {
    if (!user || user.role !== "admin") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);

      const response = NextResponse.redirect(loginUrl);
      if (!user && token) {
        response.cookies.delete("token");
      }
      return response;
    }
  }

  // 2. Redirect Authenticated Admin away from Login
  if (pathname === "/admin/login" && user?.role === "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/login"],
};
