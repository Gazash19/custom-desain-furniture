import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { portfolios } from '@/db/schema';
import { dummyPortfolios } from '@/lib/data-dummy';
import { desc, eq } from 'drizzle-orm';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function GET() {
  try {
    const data = await db.select().from(portfolios).orderBy(desc(portfolios.createdAt));
    
    if (data.length === 0) {
      return NextResponse.json(dummyPortfolios);
    }
    
    return NextResponse.json(data);
  } catch (dbError) {
    console.error('Database connection error in portfolios GET:', dbError);
    return NextResponse.json(dummyPortfolios);
  }
}

export async function POST(request: Request) {
  try {
    // Verifikasi keamanan sesi admin
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthorized = await verifySessionToken(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Akses ditolak: Anda harus login sebagai admin untuk menambah karya.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, category, style, softwareUsed, imageUrl, description } = body;

    if (!title || !category) {
      return NextResponse.json({ error: 'Judul dan Kategori wajib diisi' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();
    const images = imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'];

    const newPortfolio = await db.insert(portfolios).values({
      title,
      slug,
      category,
      style: style || 'Modern',
      softwareUsed: softwareUsed || '3ds Max, Corona Renderer',
      images,
      description: description || '',
      isFeatured: true,
    }).returning();

    return NextResponse.json({ success: true, data: newPortfolio[0] }, { status: 201 });
  } catch (error) {
    console.error('Error inserting portfolio:', error);
    return NextResponse.json({ error: 'Gagal menambahkan portofolio' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Verifikasi keamanan sesi admin
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthorized = await verifySessionToken(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Akses ditolak: Anda harus login sebagai admin untuk menghapus karya.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID portofolio dibutuhkan' }, { status: 400 });
    }

    await db.delete(portfolios).where(eq(portfolios.id, id));
    return NextResponse.json({ success: true, message: 'Portofolio berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json({ error: 'Gagal menghapus portofolio' }, { status: 500 });
  }
}
