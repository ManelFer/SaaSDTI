import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  // Public paths that don't require authentication
  const publicPaths = ['/src/app/auth/login', '/src/app/auth/register']
  
  // Check if the path is public
  if (publicPaths.includes(pathname)) {
    // If user is already authenticated, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/src/app/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (pathname.startsWith('/src/app/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/src/app/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/src/app/dashboard/:path*',
    '/src/app/auth/login',
    '/src/app/auth/register',
  ],
}
