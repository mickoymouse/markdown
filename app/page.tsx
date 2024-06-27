"use client";

import { Roboto_Mono, Roboto_Slab } from "next/font/google";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

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

type CustomComponents = {
	[key: string]: React.ComponentType<{ children: React.ReactNode }>;
};

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
	const [markdown, setMarkdown] = useState(mdData[0].content);

	const customComponents: CustomComponents = {
		h1({ children, ...rest }) {
			return (
				<h1
					{...rest}
					className={`text-preview-h1 font-bold text-cstm-black-700 dark:text-white ${fontRbSlab.className}`}
				>
					{children}
				</h1>
			);
		},
		h2({ children, ...rest }) {
			return (
				<h2
					{...rest}
					className={`text-preview-h2 font-light text-cstm-black-700 dark:text-white ${fontRbSlab.className}`}
				>
					{children}
				</h2>
			);
		},
		h3({ children, ...rest }) {
			return (
				<h3
					{...rest}
					className={`text-preview-h3 font-bold text-cstm-black-700 dark:text-white ${fontRbSlab.className}`}
				>
					{children}
				</h3>
			);
		},
		h4({ children, ...rest }) {
			return (
				<h4
					{...rest}
					className={`text-preview-h4 font-bold text-cstm-black-700 dark:text-white ${fontRbSlab.className}`}
				>
					{children}
				</h4>
			);
		},
		h5({ children, ...rest }) {
			return (
				<h5
					{...rest}
					className={`text-preview-h5 font-bold text-cstm-black-700 dark:text-white ${fontRbSlab.className}`}
				>
					{children}
				</h5>
			);
		},
		h6({ children, ...rest }) {
			return (
				<h6
					{...rest}
					className={`text-preview-h6 font-bold text-cstm-orange-default ${fontRbSlab.className}`}
				>
					{children}
				</h6>
			);
		},
		p({ children, ...rest }) {
			return (
				<p
					{...rest}
					className={`text-preview-p leading-6 text-cstm-black-500 dark:text-cstm-black-400 ${fontRbSlab.className}`}
				>
					{children}
				</p>
			);
		},
		pre({ children, ...rest }) {
			return (
				<pre
					{...rest}
					className={`p-6 rounded-md text-markdown-code leading-6 text-cstm-black-700 dark:text-white bg-cstm-black-200 dark:bg-cstm-black-800 ${fontRbSlab.className}`}
				>
					{children}
				</pre>
			);
		},
		blockquote({ children, ...rest }) {
			return (
				<blockquote
					{...rest}
					className={`border-l-4 border-l-cstm-orange-default p-6 rounded-md text-preview-p leading-6 font-bold text-cstm-black-700 dark:text-white bg-cstm-black-200 dark:bg-cstm-black-800 ${fontRbSlab.className}`}
				>
					{children}
				</blockquote>
			);
		},
		a({ children, ...rest }) {
			return (
				<a {...rest} className={`text-blue-500 underline`}>
					{children}
				</a>
			);
		},
		ol({ children, ...rest }) {
			return (
				<ol
					{...rest}
					className={`list-decimal list-inside text-preview-p leading-6 text-cstm-black-500 dark:text-cstm-black-400 ${fontRbSlab.className}`}
				>
					{children}
				</ol>
			);
		},
		ul({ children, ...rest }) {
			return (
				<ul
					{...rest}
					className={`list-disc list-inside text-preview-p leading-6 text-cstm-black-500 dark:text-cstm-black-400 marker:text-cstm-orange-default ${fontRbSlab.className}`}
				>
					{children}
				</ul>
			);
		},
	};

	return (
		<>
			<Sidebar
				isOpen={sidebarIsOpen}
				documents={mdData}
				isLight={isLight}
				setIsLight={setIsLight}
			/>
			<div
				className={cn("flex w-full min-h-screen bg-white", {
					dark: !isLight,
				})}
			>
				<div
					className={cn("w-full flex flex-col transition-all duration-300", {
						"ml-[250px]": sidebarIsOpen,
						"ml-0": !sidebarIsOpen,
					})}
				>
					<Navbar setSidebarIsOpen={setSidebarIsOpen} />
					<main className="flex w-full h-full">
						<div className="flex flex-col w-[50%] h-full bg-white dark:bg-cstm-black-1000 dark:text-white border-r border-r-cstm-black-300 dark:border-r-cstm-black-600">
							<h2 className="h-[42px] w-full flex-none bg-cstm-black-200 dark:bg-cstm-black-900 flex items-center p-4 uppercase text-cstm-black-500 text-heading-s tracking-[2px] font-medium">
								markdown
							</h2>
							<div className="grow w-full flex">
								<textarea
									autoFocus
									value={markdown}
									onChange={(e) => setMarkdown(e.target.value)}
									name="mdinput"
									id="mdinput"
									className="w-full p-6 grow resize-none border-none overflow-auto outline-none text-cstm-black-700 dark:text-cstm-black-400 bg-white dark:bg-cstm-black-1000"
								></textarea>
							</div>
						</div>
						<div className="flex flex-col w-[50%] bg-white dark:bg-cstm-black-1000 dark:text-white">
							<h2 className="h-[42px] w-full bg-cstm-black-200 dark:bg-cstm-black-900 flex items-center p-4 uppercase text-cstm-black-500 text-heading-s tracking-[2px] font-medium">
								preview
							</h2>
							<div className="grow w-full max-h-[calc(100vh-114px)] flex flex-col p-6 gap-4 overflow-y-auto">
								<Markdown components={customComponents}>{markdown}</Markdown>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
