import { NextRequest, NextResponse } from 'next/server';
import { getMessagesCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid message ID' }, { status: 400 });
    }

    const collection = await getMessagesCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isViewed: true } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Message marked as viewed' });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
