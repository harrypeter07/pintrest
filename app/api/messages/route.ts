import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/db";
import { encrypt } from "../../../lib/encrypt";

export async function GET() {
	const client = await clientPromise;
	const db = client.db();
	const now = new Date();
	const messages = await db
		.collection("messages")
		.find({
			isViewed: false,
			expiresAt: { $gt: now },
		})
		.sort({ createdAt: -1 })
		.toArray();
	return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
	const client = await clientPromise;
	const db = client.db();
	const body = await req.json();
	const { from, to, type, messageText, imageUrl, viewPolicy, customHours } =
		body;
	const createdAt = new Date();
	let expiresAt = new Date(createdAt);
	if (viewPolicy === "once") {
		expiresAt.setFullYear(2099); // practically never expires
	} else if (viewPolicy === "24hr") {
		expiresAt.setHours(expiresAt.getHours() + 24);
	} else if (viewPolicy === "custom" && customHours) {
		expiresAt.setHours(expiresAt.getHours() + Number(customHours));
	}
	const doc = {
		from,
		to,
		type,
		messageText: type === "text" ? encrypt(messageText) : undefined,
		imageUrl: type === "image" ? imageUrl : undefined,
		viewPolicy,
		customHours: viewPolicy === "custom" ? customHours : undefined,
		createdAt,
		expiresAt,
		isViewed: false,
	};
	await db.collection("messages").insertOne(doc);
	return NextResponse.json({ ok: true });
}
