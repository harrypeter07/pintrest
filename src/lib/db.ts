import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

interface Message {
  _id?: ObjectId;
  from: string;
  to: string;
  type: 'text' | 'image';
  messageText?: string;
  imageUrl?: string;
  viewPolicy: 'once' | '24hr' | 'custom';
  customHours?: number;
  createdAt: Date;
  expiresAt: Date;
  isViewed: boolean;
}

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
  if (client && db) {
    return { db, client };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db('secret-messages');

  return { db, client };
}

export async function getMessagesCollection(): Promise<Collection<Message>> {
  const { db } = await connectToDatabase();
  return db.collection<Message>('messages');
}

export type { Message };
