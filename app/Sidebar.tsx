"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Data } from "@/db/data";
import File from "@/app/File";
import Dark from "@/app/Dark";
import Light from "@/app/Light";
import Link from "next/link";

const Sidebar = ({
	isOpen,
	documents,
	isLight,
	setIsLight,
}: {
	isOpen: boolean;
	documents: Data[];
	isLight: boolean;
	setIsLight: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const formatDate = (date: string) => {
		const d = new Date(date);
		return d.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<aside
			className={cn(
				"flex flex-col justify-between p-6 w-[250px] bg-cstm-black-900 text-white fixed top-0 left-0 h-full transition-transform duration-300",
				{
					"translate-x-[-100%]": !isOpen,
					"translate-x-0 ": isOpen,
				}
			)}
		>
			<div className="flex flex-col gap-6">
				<h2 className="uppercase text-heading-s font-medium tracking-[2px] text-cstm-black-500">
					my documents
				</h2>
				<button className="text-white bg-cstm-orange-default w-full py-3 rounded-md">
					+ New Document
				</button>
				<ul className="flex flex-col gap-4">
					{documents.map((doc) => (
						<li
							key={doc.id}
							className="flex items-center gap-4 group cursor-pointer"
						>
							<File />
							<Link href={`/${doc.id}`}>
								<p className="text-body-m font-light text-cstm-black-500">
									{formatDate(doc.created_at)}
								</p>
								<p className="text-heading-m group-hover:text-cstm-orange-default cursor-pointer">
									{doc.name}
								</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="w-full flex items-center gap-4">
				<Dark fill={isLight ? "#5A6069" : "#ffffff"} />
				<label
					htmlFor="lightdarkswitcher"
					className="w-[48px] h-[24px] bg-cstm-black-500 rounded-full relative cursor-pointer"
				>
					<input
						type="checkbox"
						id="lightdarkswitcher"
						className="sr-only peer"
						checked={isLight}
						onChange={() => setIsLight(!isLight)}
					/>
					<span className="w-[12px] h-[12px] rounded-full bg-white absolute top-[6px] left-1 peer-checked:left-8 transition-all duration-300"></span>
				</label>
				<Light fill={isLight ? "#ffffff" : "#5A6069"} />
			</div>
		</aside>
	);
};

export default Sidebar;
