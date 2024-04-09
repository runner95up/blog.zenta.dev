import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path === "/") {
    return NextResponse.next();
  }
  const rawToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  const isStudio = path.includes("/studio");
  const isSignIn = path.includes("/auth/signin");
  const isSignUp = path.includes("/auth/signup");

  if (!rawToken && isStudio) {
    return NextResponse.rewrite(new URL("/auth/signin", req.url).toString());
  }

  if (rawToken && isSignIn) {
    return NextResponse.rewrite(new URL("/studio", req.url).toString());
  }

  if (rawToken && isSignUp) {
    return NextResponse.rewrite(new URL("/studio", req.url).toString());
  }

  return NextResponse.next({ request: req });
}

export const config = { matcher: ["/studio"] };
