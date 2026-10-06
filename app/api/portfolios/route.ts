import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { dummyPortfolios } from '@/lib/data-dummy';
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
    const colRef = collection(db, 'portfolios');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(dummyPortfolios);
    }

    const items = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || '',
        slug: data.slug || '',
        category: data.category || '',
        style: data.style || '',
        softwareUsed: data.softwareUsed || data.software_used || '',
        images: Array.isArray(data.images) ? data.images : [],
        description: data.description || '',
        isFeatured: Boolean(data.isFeatured ?? data.is_featured),
        createdAt: data.createdAt || null,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching portfolios from Firestore:', error);
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

    const newPortfolio = {
      title: title.trim(),
      slug,
      category,
      style: style?.trim() || 'Modern',
      softwareUsed: softwareUsed?.trim() || '3ds Max, Corona Renderer',
      images,
      description: description?.trim() || '',
      isFeatured: true,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'portfolios'), newPortfolio);

    return NextResponse.json(
      { success: true, data: { id: docRef.id, ...newPortfolio } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error inserting portfolio to Firestore:', error);
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

    // Jika bukan ID dummy lokal (p1, p2, p3), hapus dari Firestore
    if (!id.startsWith('p')) {
      await deleteDoc(doc(db, 'portfolios', id));
    }

    return NextResponse.json({ success: true, message: 'Portofolio berhasil dihapus' });
  } catch (error: any) {
    console.error('Error deleting portfolio from Firestore:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menghapus portofolio' },
      { status: 500 }
    );
  }
}
