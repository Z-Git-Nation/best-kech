import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';
import type { NextFetchEvent } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/admin(.*)']);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

const VALID_KEY = /^pk_(test|live)_[A-Za-z0-9+/=]{20,}$/.test(
  (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '').trim()
);

export default async function middleware(req: NextRequest, evt: NextFetchEvent) {
  if (!VALID_KEY) return NextResponse.next();
  try {
    return await clerkHandler(req, evt);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
