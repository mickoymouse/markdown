import { Roboto_Mono, Roboto_Slab } from "next/font/google";

const fontRbSlab = Roboto_Slab({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

const fontRbMono = Roboto_Mono({
	weight: ["100", "300", "400", "500", "700"],
	subsets: ["latin"],
});

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Hello there
		</main>
	);
}
