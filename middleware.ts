import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logWithTimestamp } from "@/lib/utils";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  logWithTimestamp(`${method} ${pathname}`);

  // Continue to the next middleware or route handler
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons
     * - fonts
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icons|fonts).*)",
  ],
};
