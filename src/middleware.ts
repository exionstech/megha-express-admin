// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password', '/', '/about'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // We can't access localStorage in middleware directly since it runs on the server
  // Instead, we need to check for the authentication cookie or token in the request
  const authToken = request.cookies.get('token')?.value;

  // If it's a protected route and there's no token, redirect to login
  if (!isPublicRoute && !authToken) {
    const url = new URL('/', request.url);
    // Add the original URL as a query parameter to redirect after login
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // If it's a login/signup page and user is already logged in, redirect to dashboard
  if ((pathname === '/' || pathname === '/signup') && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Continue with the request for all other cases
  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/dashboard(.*)',
    '/welcome'
  ]
};
