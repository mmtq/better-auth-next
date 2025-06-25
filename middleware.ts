import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from 'better-auth/cookies'

const protectedRoutes = [
    '/profile'
]

export async function middleware(req: NextRequest){
    const { nextUrl } = req
    const sessionCookie = getSessionCookie(req)

    const res = NextResponse.next()

    const isLoggedIn = !!sessionCookie
    const isOnProtectedRoutes = protectedRoutes.includes(nextUrl.pathname)
    const isOnAuthRoute = nextUrl.pathname.startsWith('/api/auth')

    if ( isOnProtectedRoutes && !isLoggedIn ) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    if ( isOnAuthRoute && isLoggedIn ) {
        return NextResponse.redirect(new URL('/profile', req.url))
    }

    return res
}

export const config = {
  matcher: ['/profile', '/dashboard/:path*'],
}
