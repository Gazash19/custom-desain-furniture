import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

// GET all inquiries, ordered by createdAt desc
export async function GET() {
  try {
    const colRef = collection(db, 'design_inquiries');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const list = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        clientName: data.clientName || '',
        clientWhatsapp: data.clientWhatsapp || '',
        furnitureType: data.furnitureType || '',
        deliverablesNeeded: data.deliverablesNeeded || '',
        notesConcept: data.notesConcept || null,
        agreedFee: data.agreedFee || null,
        status: data.status || 'lead_in',
        createdAt: data.createdAt || null,
      };
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error('Error fetching inquiries from Firestore:', error);
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

    const newInquiry = {
      clientName: body.clientName.trim(),
      clientWhatsapp: body.clientWhatsapp.trim(),
      furnitureType: body.furnitureType.trim(),
      deliverablesNeeded: body.deliverablesNeeded.trim(),
      notesConcept: body.notesConcept ? body.notesConcept.trim() : '',
      agreedFee: null,
      status: 'lead_in',
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'design_inquiries'), newInquiry);
    
    return NextResponse.json(
      { success: true, data: { id: docRef.id, ...newInquiry } }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing inquiry in Firestore:', error);
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

    const updatePayload: Record<string, any> = {};
    if (status !== undefined) updatePayload.status = status;
    if (agreedFee !== undefined) updatePayload.agreedFee = agreedFee;

    const docRef = doc(db, 'design_inquiries', id);
    await updateDoc(docRef, updatePayload);

    return NextResponse.json({ success: true, data: { id, ...updatePayload } });
  } catch (error) {
    console.error('Error updating inquiry in Firestore:', error);
    return NextResponse.json({ error: 'Gagal memperbarui inquiry' }, { status: 500 });
  }
}
