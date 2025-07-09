import { NextRequest, NextResponse } from 'next/server';
import { getMessagesCollection, Message } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { from, to, type, messageText, imageUrl, viewPolicy, customHours } = await req.json();

    const createdAt = new Date();
    let expiresAt: Date;

    switch (viewPolicy) {
      case 'once':
        expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days default
        break;
      case '24hr':
        expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        break;
      case 'custom':
        expiresAt = new Date(createdAt.getTime() + (customHours || 0) * 60 * 60 * 1000);
        break;
      default:
        return NextResponse.json({ message: 'Invalid view policy' }, { status: 400 });
    }

    const message: Message = {
      from,
      to,
      type,
      messageText,
      imageUrl,
      viewPolicy,
      customHours,
      createdAt,
      expiresAt,
      isViewed: false,
    };

    const collection = await getMessagesCollection();
    const result = await collection.insertOne(message);

    return NextResponse.json({ message: 'Message sent', id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const recipient = url.searchParams.get('to');
    
    if (!recipient) {
      return NextResponse.json({ message: 'Recipient required' }, { status: 400 });
    }

    const collection = await getMessagesCollection();
    const now = new Date();
    
    const messages = await collection.find({
      to: recipient,
      expiresAt: { $gt: now },
      isViewed: false
    }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

