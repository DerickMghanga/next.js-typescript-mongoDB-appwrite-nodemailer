import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    //define the public paths (paths accessed by anyone on the web)
    const isPublicPath = path === '/login'  || path === '/signup' || path === '/verifyemail' || path === '/security' || path === '/changepassword';

    //extract cookies from the request
    const token = request.cookies.get('token')?.value || ''; //it might or not be available 'optional'

    //redirect to homepage since already logged in
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
 
//matcher allows you to filter Middleware to run on specific paths.(track all paths)
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail',
    '/security',
    '/changepassword',
  ],
}