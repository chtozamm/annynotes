import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.cookies.has("token")) return NextResponse.next()
  // if (
  //   request.cookies.has("token") &&
  //   (request.url === "/signin" || request.url === "/signup")
  // )
  //   return NextResponse.redirect(new URL("/", request.url))
  return NextResponse.redirect(new URL("/signin", request.url))
}

export const config = {
  matcher: ["/posts/new", "/posts/edit", "/posts/delete", "/posts/revalidate"],
}
