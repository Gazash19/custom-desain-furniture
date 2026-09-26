import { NextResponse } from 'next/server';
import { validateAdminPassword, createSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Kata sandi wajib diisi' },
        { status: 400 }
      );
    }

    if (!validateAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Kata sandi salah. Silakan periksa kembali.' },
        { status: 401 }
      );
    }

    const token = await createSessionToken();
    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil',
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return response;
  } catch (error) {
    console.error('Error saat proses login admin:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat login' },
      { status: 500 }
    );
  }
}
