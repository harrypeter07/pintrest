"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MessageCard({ message }: { message: any }) {
	const [viewed, setViewed] = useState(message.isViewed);
	const handleView = async () => {
		if (!viewed && message.viewPolicy === "once") {
			await fetch(`/api/messages/${message._id}`, {
				method: "PATCH",
				body: JSON.stringify({ isViewed: true }),
			});
			setViewed(true);
		}
	};
	if (viewed) return null;
	if (Date.now() > new Date(message.expiresAt).getTime()) return null;
	return (
		<motion.div
			onClick={handleView}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 cursor-pointer hover:shadow-pink-200 border-l-4 border-pink-300"
		>
			<div className="text-xs text-neutral-400 mb-1">From: {message.from}</div>
			{message.type === "text" ? (
				<div className="text-lg font-handdrawn text-pink-700 whitespace-pre-line">
					{message.messageText}
				</div>
			) : (
				<img src={message.imageUrl} alt="secret" className="max-h-60 rounded" />
			)}
			<div className="text-xs text-neutral-400 mt-2">
				Expires: {new Date(message.expiresAt).toLocaleString()}
			</div>
			{message.viewPolicy === "once" && (
				<div className="text-xs text-pink-500">View once</div>
			)}
		</motion.div>
	);
}
