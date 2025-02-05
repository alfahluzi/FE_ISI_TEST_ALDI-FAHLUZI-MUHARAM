import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  console.log("url", req?.nextUrl?.pathname);

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token === undefined) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/todo",
    "/todo/:path*",
    "/project",
    "/project/:path*",
    "/api/todo",
    "/api/todo/:path*",
    "/api/project",
    "/api/project/:path*",
    "/api/user",
    "/api/user/:path*",
  ],
};
