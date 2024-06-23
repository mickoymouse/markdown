"use client";

import { Roboto_Mono, Roboto_Slab } from "next/font/google";
import { useEffect, useState } from "react";

import { Data, data as initialData } from "@/db/data";

const fontRbSlab = Roboto_Slab({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

const fontRbMono = Roboto_Mono({
	weight: ["100", "300", "400", "500", "700"],
	subsets: ["latin"],
});

export default function Home() {
	const [mdData, setMdData] = useState<Data[]>(initialData);

	useEffect(() => {
		const data = getFromLS();
		if (data) {
			setMdData(JSON.parse(data));
		} else {
			saveToLS(initialData);
			setMdData(initialData);
		}
	}, []);

	const saveToLS = (data: Data[]) => {
		localStorage.setItem("markdown", JSON.stringify(data));
	};

	const getFromLS = () => {
		return localStorage.getItem("markdown") ?? null;
	};

	return (
		<main className="flex flex-wrap min-h-screen">
			<div className="w-[50%] bg-black">Markdown Editor</div>
			<div className="w-[50%]">Preview</div>
		</main>
	);
}
