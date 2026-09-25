import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('File ID Google Drive wajib diisi', { status: 400 });
  }

  try {
    // Coba endpoint thumbnail resolusi tinggi Google Drive
    const thumbUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
    
    let res = await fetch(thumbUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      redirect: 'follow',
    });

    // Jika thumbnail gagal atau 500, coba endpoint direct download Google Drive
    if (!res.ok || res.status >= 400) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${id}&confirm=t`;
      res = await fetch(downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        redirect: 'follow',
      });
    }

    if (!res.ok) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Gambar Google Drive tidak dapat diakses. Pastikan izin berbagi disetel ke "Siapa saja yang memiliki link" (Anyone with the link).' 
        }), 
        { status: res.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    
    // Jika Google mengembalikan halaman HTML login / error
    if (contentType.includes('text/html')) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'File Google Drive masih bersifat privat. Ubah akses menjadi "Siapa saja yang memiliki link".' 
        }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const imageBuffer = await res.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    });
  } catch (error: any) {
    console.error('Error fetching Google Drive image proxy:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Gagal mengambil gambar dari Google Drive', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
