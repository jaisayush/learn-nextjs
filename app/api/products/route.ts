import { NextResponse } from 'next/server';
import { products } from '../../_lib/data';

// CONCEPT: Route Handlers
// Files named 'route.ts' inside 'app' create API endpoints.
// GET, POST, PUT, DELETE functions handle requests.

export async function GET() {
  // Simulate a delay
  // await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json({
    success: true,
    data: products,
    timestamp: new Date().toISOString(),
  });
}
