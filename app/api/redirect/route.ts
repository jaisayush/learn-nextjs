// CONCEPT: Redirects in Route Handlers
// You can redirect to another URL from an API route

import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  // Read query param to determine redirect target
  const searchParams = request.nextUrl.searchParams;
  const target = searchParams.get('target');

  if (target === 'products') {
    // Redirect to products page
    return NextResponse.redirect(new URL('/products', request.url));
  }

  if (target === 'home') {
    // Redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Default: return info about redirect API
  return NextResponse.json({
    success: true,
    message: 'Redirect API',
    usage: 'Add ?target=products or ?target=home to redirect',
    examples: [
      '/api/redirect?target=products',
      '/api/redirect?target=home',
    ],
  });
}
