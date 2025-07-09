"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SendForm({ onSent }: { onSent: () => void }) {
	const [type, setType] = useState<"text" | "image">("text");
	const [messageText, setMessageText] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [viewPolicy, setViewPolicy] = useState<"once" | "24hr" | "custom">(
		"once"
	);
	const [customHours, setCustomHours] = useState(1);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		let imageUrl = undefined;
		if (type === "image" && image) {
			// TODO: Implement image upload (stub for now)
			imageUrl = "data:image/png;base64," + btoa("fake");
		}
		await fetch("/api/messages", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				from: "you",
				to: "partner",
				type,
				messageText: type === "text" ? messageText : undefined,
				imageUrl,
				viewPolicy,
				customHours: viewPolicy === "custom" ? customHours : undefined,
			}),
		});
		setMessageText("");
		setImage(null);
		setLoading(false);
		onSent();
	};

	return (
		<motion.form
			onSubmit={handleSubmit}
			initial={{ scale: 0.95, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 w-full max-w-xl"
		>
			<div className="flex gap-2 mb-2">
				<button
					type="button"
					className={`px-3 py-1 rounded ${
						type === "text" ? "bg-pink-200" : "bg-neutral-200"
					}`}
					onClick={() => setType("text")}
				>
					Text
				</button>
				<button
					type="button"
					className={`px-3 py-1 rounded ${
						type === "image" ? "bg-pink-200" : "bg-neutral-200"
					}`}
					onClick={() => setType("image")}
				>
					Image
				</button>
			</div>
			{type === "text" ? (
				<textarea
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					className="w-full border rounded p-2 min-h-[60px]"
					required
				/>
			) : (
				<input
					type="file"
					accept="image/*"
					onChange={(e) => setImage(e.target.files?.[0] || null)}
					className="w-full border rounded p-2"
					required
				/>
			)}
			<div className="flex gap-2 items-center">
				<label>View Policy:</label>
				<select
					value={viewPolicy}
					onChange={(e) => setViewPolicy(e.target.value as any)}
					className="border rounded px-2 py-1"
				>
					<option value="once">Once</option>
					<option value="24hr">24hr</option>
					<option value="custom">Custom</option>
				</select>
				{viewPolicy === "custom" && (
					<input
						type="number"
						min={1}
						max={168}
						value={customHours}
						onChange={(e) => setCustomHours(Number(e.target.value))}
						className="border rounded px-2 py-1 w-16"
						placeholder="Hours"
					/>
				)}
			</div>
			<button
				type="submit"
				disabled={loading}
				className="bg-pink-500 text-white rounded px-4 py-2 mt-2 hover:bg-pink-600 transition"
			>
				{loading ? "Sending..." : "Send"}
			</button>
		</motion.form>
	);
}
