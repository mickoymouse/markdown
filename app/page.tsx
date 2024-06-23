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
	const [isLight, setIsLight] = useState(false);

	return (
		<main
			className={cn("flex w-full min-h-screen bg-white", {
				dark: !isLight,
			})}
		>
			<Sidebar
				isOpen={sidebarIsOpen}
				documents={mdData}
				isLight={isLight}
				setIsLight={setIsLight}
			/>
			<div
				className={cn("w-full flex flex-col transition-all duration-300", {
					"ml-[250px]": sidebarIsOpen,
					"ml-0": !sidebarIsOpen,
				})}
			>
				<Navbar setSidebarIsOpen={setSidebarIsOpen} />
				<div className="flex w-full h-full">
					<div className="flex flex-col w-[50%] h-full bg-white dark:bg-cstm-black-1000 dark:text-white border-r border-r-cstm-black-300 dark:border-r-cstm-black-600">
						<h2 className="h-[42px] w-full flex-none bg-cstm-black-200 dark:bg-cstm-black-900 flex items-center p-4 uppercase text-cstm-black-500 text-heading-s tracking-[2px] font-medium">
							markdown
						</h2>
						<div className="grow w-full flex">
							<textarea
								name="mdinput"
								id="mdinput"
								className="w-full p-6 grow resize-none border-none overflow-auto outline-none text-cstm-black-700 dark:text-cstm-black-400 bg-white dark:bg-cstm-black-1000"
							></textarea>
						</div>
					</div>
					<div className="w-[50%] bg-white dark:bg-cstm-black-1000 dark:text-white">
						<h2 className="h-[42px] w-full bg-cstm-black-200 dark:bg-cstm-black-900 flex items-center p-4 uppercase text-cstm-black-500 text-heading-s tracking-[2px] font-medium">
							preview
						</h2>
					</div>
				</div>
			</div>
		</main>
	);
}
