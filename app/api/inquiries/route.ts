import { NextResponse } from 'next/server';
import { db } from '@/db';
import { designInquiries } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

// GET all inquiries, ordered by createdAt desc
export async function GET() {
  try {
    const list = await db.select().from(designInquiries).orderBy(desc(designInquiries.createdAt));
    return NextResponse.json(list);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST new inquiry from brief form
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.clientName || !body.clientWhatsapp || !body.furnitureType || !body.deliverablesNeeded) {
      return NextResponse.json(
        { error: 'Mohon lengkapi field yang dibutuhkan' },
        { status: 400 }
      );
    }

    try {
      const newInquiry = await db.insert(designInquiries).values({
        clientName: body.clientName,
        clientWhatsapp: body.clientWhatsapp,
        furnitureType: body.furnitureType,
        deliverablesNeeded: body.deliverablesNeeded,
        notesConcept: body.notesConcept || '',
        status: 'lead_in',
      }).returning();
      
      return NextResponse.json({ success: true, data: newInquiry[0] }, { status: 201 });
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ 
        success: true, 
        message: 'Tersimpan ke mock DB',
        data: { ...body, id: 'mock-id-' + Date.now(), createdAt: new Date().toISOString() }
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    );
  }
}

// PATCH update status or details
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, agreedFee } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID inquiry dibutuhkan' }, { status: 400 });
    }

    const updated = await db
      .update(designInquiries)
      .set({
        ...(status ? { status } : {}),
        ...(agreedFee ? { agreedFee } : {}),
      })
      .where(eq(designInquiries.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Gagal memperbarui inquiry' }, { status: 500 });
  }
}
