import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontSize: {
				"body-m": "0.8125rem", // Equivalent to 13px (0.8125 * 16px)
				"heading-m": "0.9375rem", // Equivalent to 15px (0.9375 * 16px)
				"heading-s": "0.875rem", // Equivalent to 14px (0.875 * 16px)
				"markdown-code": "0.875rem", // Equivalent to 14px (0.875 * 16px)
				"preview-h1": "2rem", // Equivalent to 32px (2 * 16px)
				"preview-h2": "1.75rem", // Equivalent to 28px (1.75 * 16px)
				"preview-h3": "1.5rem", // Equivalent to 24px (1.5 * 16px)
				"preview-h4": "1.25rem", // Equivalent to 20px (1.25 * 16px)
				"preview-h5": "1rem", // Equivalent to 16px (1 * 16px)
				"preview-h6": "0.875rem", // Equivalent to 14px (0.875 * 16px)
				"preview-p": "0.875rem", // Equivalent to 14px (0.875 * 16px)
				"preview-p-bold": "0.875rem", // Equivalent to 14px (0.875 * 16px)
			},
			lineHeight: {
				"preview-p": "1.5",
				"preview-p-bold": "1.5",
				"markdown-code": "1.5",
			},
			colors: {
				"cstm-orange": {
					default: "#e46643",
					hover: "#f39765",
				},
				"cstm-black": {
					1000: "#151619",
					900: "#1d1f22",
					800: "#2b2d31",
					700: "#35393f",
					600: "#5a6069",
					500: "#7c8187",
					400: "#c1c4cb",
					300: "#e4e4e4",
					200: "#f5f5f5",
					100: "#ffffff",
				},
			},
		},
	},
	plugins: [],
};
export default config;
