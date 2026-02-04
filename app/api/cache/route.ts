// CONCEPT: Caching in Route Handlers
// Demonstrates different caching strategies

import { NextResponse } from 'next/server';

// CONCEPT: Static Route Handler (Cached by default)
// This route is cached at build time and reused for all requests
// export const dynamic = 'force-static'; // Default behavior

// CONCEPT: Dynamic Route Handler (No caching)
// Force this route to be dynamic (re-run on every request)
export const dynamic = 'force-dynamic';

// CONCEPT: Revalidation
// Cache for X seconds, then regenerate
// export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Caching demo',
    timestamp: new Date().toISOString(),
    cacheInfo: {
      dynamic: 'force-dynamic',
      explanation: 'This route is NOT cached. Every request generates a new timestamp.',
      alternatives: [
        'force-static: Cache forever (default)',
        'revalidate: 60 - Cache for 60 seconds',
      ],
    },
  });
}
