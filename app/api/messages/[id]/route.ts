import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/db";
import { ObjectId } from "mongodb";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db();
  const { isViewed } = await req.json();
  await db.collection("messages").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { isViewed: !!isViewed } }
  );
  return NextResponse.json({ ok: true });
} 