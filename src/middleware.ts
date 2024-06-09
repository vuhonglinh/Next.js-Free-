import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const privatePaths = ['/me']
const authPaths = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl
    const clientSessionToken = request.cookies.get('clientSessionToken')?.value
    //Check private paths 
    if (privatePaths.some(path => pathname.startsWith(path)) && !clientSessionToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (authPaths.some(path => pathname.startsWith(path)) && clientSessionToken) {
        return NextResponse.redirect(new URL('/me', request.url));
    }

    // return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/me', '/login', '/register'
    ],
}