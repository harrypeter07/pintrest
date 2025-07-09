"use client";
import SendForm from "../../components/SendForm";
import MessageCard from "../../components/MessageCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SecretDashboard() {
	const [messages, setMessages] = useState<any[]>([]);
	useEffect(() => {
		fetch("/api/messages")
			.then((res) => res.json())
			.then((data) => setMessages(data));
	}, []);
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center p-4 font-handdrawn"
		>
			<h1 className="text-3xl md:text-4xl mb-4 mt-2 text-pink-700 drop-shadow font-handdrawn">
				Secret Messages
			</h1>
			<SendForm
				onSent={() => {
					fetch("/api/messages")
						.then((res) => res.json())
						.then((data) => setMessages(data));
				}}
			/>
			<div className="w-full max-w-2xl mt-8 space-y-4">
				{messages.length === 0 ? (
					<div className="text-center text-neutral-500">No new messages</div>
				) : (
					messages.map((msg) => <MessageCard key={msg._id} message={msg} />)
				)}
			</div>
		</motion.main>
	);
}
