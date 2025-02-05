import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/api/todo", "/api/project", "/api/user"];
export default async function middleware(req: NextRequest) {
  console.log("url", req?.nextUrl?.pathname);

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token === undefined && protectedRoutes.includes(req?.nextUrl?.pathname)) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
