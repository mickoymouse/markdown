import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import Navbar from "@/app/Navbar";

const font = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Markdown",
	description: "Your personal markdown editor",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
