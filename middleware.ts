import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from 'better-auth/cookies'
import { auth } from "./lib/auth"
import { headers } from "next/headers"

const protectedRoutes = [
    '/profile'
]

export async function middleware(req: NextRequest){
    const { nextUrl } = req
    const sessionCookie = getSessionCookie(req)
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // })
    
    // if (session?.user?.role === 'ADMIN') {
    //     return NextResponse.redirect(new URL('/dashboard', req.url))
    // }

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
