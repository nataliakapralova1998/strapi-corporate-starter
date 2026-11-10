import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '../i18n-config';

const PUBLIC_FILE = /(\.(.*)$)/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals, API and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const segments = pathname.split('/').filter(Boolean);
  const hasLocale = segments[0] && (i18n.locales as readonly string[]).includes(segments[0]);

  // If no locale in path: redirect to default
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${i18n.defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  return;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
