// CONCEPT: Headers in Route Handlers
// You can read request headers and set response headers

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // READING Headers
  const userAgent = request.headers.get('user-agent');
  const authorization = request.headers.get('authorization');
  const customHeader = request.headers.get('x-custom-header');

  // SETTING Headers
  const response = NextResponse.json({
    success: true,
    message: 'Headers demo',
    receivedHeaders: {
      userAgent,
      authorization,
      customHeader,
    },
  });

  // Set custom response headers
  response.headers.set('X-API-Version', '1.0');
  response.headers.set('X-Powered-By', 'Next.js');
  
  // CORS headers (if needed)
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  return response;
}
