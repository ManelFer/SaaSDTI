import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the user is trying to access the login page
  if (pathname.startsWith('/auth/login')) {
    // You can add additional logic here to check if the user is already authenticated
    // For example, checking cookies or session
    return NextResponse.next()
  }

  // For other routes, you can add authentication checks here
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/auth/login/:path*',
    // Add other paths that need authentication here
  ],
}
