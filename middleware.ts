import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@/types/roles";

const adminBasePaths = ["/forms"];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (token && (path === "/login" || path === "/")) {
      return NextResponse.redirect(new URL("/forms", req.url));
    }

    const isAdminPath = adminBasePaths.some((base) =>
      path.startsWith(base + "/")
    );

    if (isAdminPath && token?.role !== UserRole.Admin) {
      return NextResponse.redirect(new URL("/forms", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/forms/:path*", "/forms"],
};
