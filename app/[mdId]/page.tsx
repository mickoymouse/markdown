"use client";

import { Roboto_Mono, Roboto_Slab, Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import { Data, data as initialData } from "@/db/data";
import Navbar from "@/app/Navbar";
import Sidebar from "@/app/Sidebar";
import { cn } from "@/lib/utils";
import HideEditor from "@/app/HideEditor";
import ShowEditor from "@/app/ShowEditor";
import { useRouter } from "next/navigation";

const fontRbSlab = Roboto_Slab({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

const fontRbMono = Roboto_Mono({
	weight: ["100", "300", "400", "500", "700"],
	subsets: ["latin"],
});

const fontRoboto = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

type CustomComponents = {
	[key: string]: React.ComponentType<{ children: React.ReactNode }>;
};

export default function MarkdownPage({ params }: { params: { mdId: string } }) {
	const router = useRouter();

	const { mdId } = params;

	const [mdData, setMdData] = useState<Data[] | undefined>(undefined);
	const [markdown, setMarkdown] = useState<string>();

	const saveToLS = (data: Data[] | undefined) => {
		localStorage.setItem("markdown", JSON.stringify(data));
	};

	const getFromLS = () => {
		const item = localStorage.getItem("markdown");
		return item !== null ? item : undefined;
	};

	useEffect(() => {
		const lsData = getFromLS();
		if (lsData === undefined) {
			setMdData(initialData);
			saveToLS(initialData);
			setMarkdown(initialData.find((doc: Data) => doc.id === mdId)?.content);
		} else {
			const parsedData = JSON.parse(lsData);
			setMdData(parsedData);
			setMarkdown(parsedData.find((doc: Data) => doc.id === mdId)?.content);
		}
	}, []);

	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [isLight, setIsLight] = useState(false);

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
					className={`whitespace-pre-wrap p-6 rounded-md text-markdown-code leading-6 text-cstm-black-700 dark:text-white bg-cstm-black-200 dark:bg-cstm-black-800 ${fontRbSlab.className}`}
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

	const getMdData = (id: string): Data | undefined => {
		return mdData?.find((doc) => doc.id === id);
	};

	const saveMdData = (id: string) => {
		const newData: Data = {
			id,
			name: getMdData(id)?.name!,
			created_at: getMdData(id)?.created_at!,
			content: markdown!,
		};

		const mutatedMdData = mutateMdData(id, newData);

		setMdData(mutatedMdData);
		saveToLS(mutatedMdData);
	};

	const mutateMdData = (id: string, newData: Data) => {
		return mdData?.map((md) => (md.id === id ? { ...md, ...newData } : md));
	};

	const deleteMdData = (id: string) => {
		const newData = mdData?.filter((doc) => doc.id !== id);
		setMdData(newData);
		saveToLS(newData);
		setIsDeleteModalOpen(false);
		router.replace("/");
	};

	const newMdData = (data: Data) => {
		const newData = [...mdData!, data];
		setMdData(newData);
		saveToLS(newData);
		router.push(`/${data.id}`);
	};

	const [isEditorHidden, setIsEditorHidden] = useState(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	return (
		<>
			<Sidebar
				isOpen={sidebarIsOpen}
				documents={mdData}
				isLight={isLight}
				setIsLight={setIsLight}
				newMdData={newMdData}
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
					<Navbar
						setSidebarIsOpen={setSidebarIsOpen}
						saveMdData={saveMdData}
						mdData={getMdData(mdId)}
						isOpen={sidebarIsOpen}
						setIsDeleteModalOpen={setIsDeleteModalOpen}
					/>
					<main className="flex w-full h-full">
						<div
							className={cn(
								"flex flex-col w-full md:w-[50%] h-full bg-white dark:bg-cstm-black-1000 dark:text-white border-r border-r-cstm-black-300 dark:border-r-cstm-black-600",
								{
									hidden: isEditorHidden,
								}
							)}
						>
							<div className="h-[42px] w-full flex-none bg-cstm-black-200 dark:bg-cstm-black-900 flex items-center justify-between p-4">
								<h2 className=" uppercase text-cstm-black-500 text-heading-s tracking-[2px] font-medium">
									markdown
								</h2>
								<button
									className="md:hidden"
									onClick={() => setIsEditorHidden(!isEditorHidden)}
								>
									{isEditorHidden ? <HideEditor /> : <ShowEditor />}
								</button>
							</div>
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
						<div
							className={cn(
								"hidden md:flex flex-col w-full bg-white dark:bg-cstm-black-1000 dark:text-white",
								{ "w-full flex": isEditorHidden, "w-[50%]": !isEditorHidden }
							)}
						>
							<div className="h-[42px] w-full bg-cstm-black-200 dark:bg-cstm-black-900 flex items-center justify-between p-4">
								<h2 className="uppercase text-cstm-black-500 text-heading-s tracking-[2px] font-medium">
									preview
								</h2>
								<button onClick={() => setIsEditorHidden(!isEditorHidden)}>
									{isEditorHidden ? <HideEditor /> : <ShowEditor />}
								</button>
							</div>
							<div className="grow w-full max-h-[calc(100vh-98px)] md:max-h-[calc(100vh-114px)] flex flex-col p-6 gap-4 overflow-y-auto">
								<Markdown components={customComponents}>{markdown}</Markdown>
							</div>
						</div>
					</main>
				</div>
			</div>
			<div
				className={cn(
					"fixed inset-0 w-full min-h-screen flex items-center justify-center z-10",
					{
						dark: !isLight,
						hidden: !isDeleteModalOpen,
					}
				)}
			>
				<div
					className="w-full h-full bg-cstm-black-500 opacity-50 z-10 fixed inset-0"
					onClick={() => setIsDeleteModalOpen((prev) => !prev)}
				></div>
				<div
					className={`${fontRbSlab.className} bg-white dark:bg-cstm-black-900 z-20 max-w-[343px] p-4 rounded-md flex flex-col gap-4`}
				>
					<h4 className="font-bold text-[20px] text-cstm-black-700 dark:text-white">
						Delete this document?
					</h4>
					<p className="text-[14px] text-cstm-black-500 dark:text-cstm-black-400">
						Are you sure you want to delete {getMdData(mdId)?.name} document and
						its contents? This action cannot be reversed.
					</p>
					<button
						className={`flex w-full items-center justify-center p-4 rounded-md bg-cstm-orange-default hover:bg-cstm-orange-hover text-white text-[15px] ${fontRoboto.className}`}
						onClick={() => deleteMdData(mdId)}
					>
						Confirm &amp; Delete
					</button>
				</div>
			</div>
		</>
	);
}
