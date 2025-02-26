import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      if (
        pathname.startsWith("/api/auth") ||
        pathname === "/login" ||
        pathname === "/register"
      ) {
        return true;
      }

      if (pathname === "/" || pathname.startsWith("/api/videos")) {
        return true;
      }

      return !!token; // Only allow access if a token exists
    },
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
