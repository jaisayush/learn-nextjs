// CONCEPT: Cookies in Route Handlers
// You can read and set cookies using the cookies() helper

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // READING Cookies
  const cookieStore = await cookies();
  const userPreference = cookieStore.get('user-preference');
  const sessionId = cookieStore.get('session-id');

  // SETTING Cookies
  const response = NextResponse.json({
    success: true,
    message: 'Cookies demo',
    receivedCookies: {
      userPreference: userPreference?.value,
      sessionId: sessionId?.value,
    },
  });

  // Set a cookie
  response.cookies.set('user-preference', 'dark-mode', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  // Set session cookie
  response.cookies.set('session-id', `session-${Date.now()}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}

// DELETE cookies
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Cookies cleared',
  });

  // Delete cookies by setting maxAge to 0
  response.cookies.set('user-preference', '', { maxAge: 0 });
  response.cookies.set('session-id', '', { maxAge: 0 });

  return response;
}
