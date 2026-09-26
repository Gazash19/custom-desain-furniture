import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya proses proteksi pada rute /admin
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifySessionToken(sessionCookie);

    // Halaman login admin
    if (pathname === '/admin/login') {
      if (isValid) {
        return NextResponse.redirect(new URL('/admin/portfolio', request.url));
      }
      return NextResponse.next();
    }

    // Seluruh halaman admin lainnya (dashboard, katalog, dsb) membutuhkan session valid
    if (!isValid) {
      const loginUrl = new URL('/admin/login', request.url);
      // Simpan rute yang ingin dituju agar bisa diarahkan setelah berhasil login
      if (pathname !== '/admin') {
        loginUrl.searchParams.set('from', pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
