// CONCEPT: Middleware
// Middleware runs BEFORE every request in your app.
// It's like Angular's HTTP Interceptors but for ALL routes (pages + API).
// File MUST be named 'middleware.ts' and placed at the ROOT of your project.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// CONCEPT: Middleware Function
// This function is called for EVERY request
export function middleware(request: NextRequest) {
  // Log every request (useful for debugging)
  console.log(`[Middleware] ${request.method} ${request.nextUrl.pathname}`);

  // Example 1: Add custom header to ALL responses
  const response = NextResponse.next();
  response.headers.set('X-Middleware-Applied', 'true');
  response.headers.set('X-Request-Time', new Date().toISOString());

  // Example 2: Redirect based on conditions
  // Uncomment to redirect /old-products to /products
  // if (request.nextUrl.pathname === '/old-products') {
  //   return NextResponse.redirect(new URL('/products', request.url));
  // }

  // Example 3: Check authentication (demo)
  // if (request.nextUrl.pathname.startsWith('/api/admin')) {
  //   const token = request.headers.get('authorization');
  //   if (!token) {
  //     return NextResponse.json(
  //       { error: 'Unauthorized' },
  //       { status: 401 }
  //     );
  //   }
  // }

  return response;
}

// CONCEPT: Matcher
// Control which routes the middleware runs on
// Without this, it runs on EVERY route (including _next/static files)
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
