import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { portfolios } from '@/db/schema';
import { dummyPortfolios } from '@/lib/data-dummy';
import { desc, eq } from 'drizzle-orm';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

/**
 * Ekstraksi token admin_session baik dari next/headers cookies() maupun raw request headers
 */
async function getAdminToken(request: Request): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (token) return token;
  } catch {
    // Abaikan jika pemanggilan cookies() di context tertentu gagal
  }

  // Fallback: baca langsung dari header cookie
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|; )${ADMIN_COOKIE_NAME}=([^;]*)`));
  if (match) {
    return decodeURIComponent(match[1]);
  }

  return undefined;
}

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
    const sessionToken = await getAdminToken(request);
    const isAuthorized = await verifySessionToken(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Sesi login telah berakhir atau belum terotentikasi. Silakan login kembali.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, category, style, softwareUsed, imageUrl, description } = body;

    if (!title || !category) {
      return NextResponse.json({ error: 'Judul dan Kategori wajib diisi' }, { status: 400 });
    }

    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'desain';
    const slug = `${baseSlug}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const images = imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'];

    const newPortfolio = await db.insert(portfolios).values({
      title: title.trim(),
      slug,
      category,
      style: style?.trim() || 'Modern',
      softwareUsed: softwareUsed?.trim() || '3ds Max, Corona Renderer',
      images,
      description: description?.trim() || '',
      isFeatured: true,
    }).returning();

    return NextResponse.json({ success: true, data: newPortfolio[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error inserting portfolio:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menambahkan portofolio ke database' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const sessionToken = await getAdminToken(request);
    const isAuthorized = await verifySessionToken(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Sesi login telah berakhir atau belum terotentikasi. Silakan login kembali.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID portofolio dibutuhkan' }, { status: 400 });
    }

    // Validasi apakah id berupa UUID valid (karena kolom id di database bertipe UUID)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (isUuid) {
      await db.delete(portfolios).where(eq(portfolios.id, id));
    }

    // Jika bukan UUID (misalnya item dummy bawaan p1/p2), kembalikan success agar UI langsung menghapusnya
    return NextResponse.json({ success: true, message: 'Portofolio berhasil dihapus' });
  } catch (error: any) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menghapus portofolio' },
      { status: 500 }
    );
  }
}
