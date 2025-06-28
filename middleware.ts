import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

const protectedRoutes = ['/admin/dashboard', '/profile']

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const isLoggedIn = !!session
  const isProtected = protectedRoutes.includes(pathname)
  const isAuthApiRoute = pathname.startsWith('/api/auth')
  const isAuthPageRoute = pathname.startsWith('/auth')

  // ❌ Redirect USERs from admin area
  if (pathname === '/admin/dashboard' && session?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 🔐 Block protected routes for not logged-in users
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // 🚫 Block access to /auth/* if already logged in
  if (isAuthPageRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/profile', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
}
