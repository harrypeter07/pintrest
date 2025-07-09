"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function KeywordInput() {
	const [value, setValue] = useState("");
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (e.target.value.toLowerCase() === "chingi") {
			setTimeout(() => router.push("/x983-fav"), 200);
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
	};

	return (
		<input
			ref={inputRef}
			type="text"
			value={value}
			onChange={handleChange}
			onPaste={handlePaste}
			autoComplete="off"
			inputMode="none"
			className="w-full border border-neutral-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white shadow"
			aria-label="Search"
		/>
	);
}
