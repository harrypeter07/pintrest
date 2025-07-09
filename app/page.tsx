"use client";
import KeywordInput from "../components/KeywordInput";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
	// Neutral, aesthetic images (unsplash or local)
	const images = [
		"/globe.svg",
		"/window.svg",
		"/file.svg",
		"/vercel.svg",
		"/next.svg",
	];
	return (
		<main className="min-h-screen bg-neutral-100 flex flex-col items-center p-4">
			<div className="w-full max-w-xl mb-8">
				<KeywordInput />
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
				{images.map((src, i) => (
					<div
						key={i}
						className="rounded-lg overflow-hidden shadow-md bg-white aspect-square flex items-center justify-center"
					>
						<Image
							src={src}
							alt="inspo"
							width={200}
							height={200}
							className="object-contain"
						/>
					</div>
				))}
			</div>
		</main>
	);
}
