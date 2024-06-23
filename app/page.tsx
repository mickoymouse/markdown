"use client";

import { Roboto_Mono, Roboto_Slab } from "next/font/google";
import { useEffect, useState } from "react";

import { Data, data as initialData } from "@/db/data";
import Navbar from "@/app/Navbar";
import Sidebar from "@/app/Sidebar";
import { cn } from "@/lib/utils";

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

	// #region initialize data

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

	// #endregion

	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	return (
		<main className="flex w-full min-h-screen bg-white">
			<Sidebar isOpen={sidebarIsOpen} documents={mdData} />
			<div
				className={cn("w-full flex flex-col transition-all duration-300", {
					"ml-[250px]": sidebarIsOpen,
					"ml-0": !sidebarIsOpen,
				})}
			>
				<Navbar setSidebarIsOpen={setSidebarIsOpen} />
				<div className="flex w-full h-full">
					<div className="w-[50%] bg-red-500">Markdown Editor</div>
					<div className="w-[50%]">Preview</div>
				</div>
			</div>
		</main>
	);
}
