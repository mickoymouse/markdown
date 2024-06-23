import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			textSizes: {
				"body-m": {
					fontSize: 0.8125,
					weight: 300,
				},
				"heading-m": {
					fontSize: 0.9375,
					weight: 400,
				},
				"heading-s": {
					fontSize: 0.875,
					weight: 500,
				},
				"markdown-code": {
					fontSize: 0.875,
					weight: 400,
					lineHeight: 1.5,
				},
				"preview-h1": {
					fontSize: 2,
					weight: 700,
				},
				"preview-h2": {
					fontSize: 1.75,
					weight: 300,
				},
				"preview-h3": {
					fontSize: 1.5,
					weight: 700,
				},
				"preview-h4": {
					fontSize: 1.25,
					weight: 700,
				},
				"preview-h5": {
					fontSize: 1,
					weight: 700,
				},
				"preview-h6": {
					fontSize: 0.875,
					weight: 700,
				},
				"preview-p": {
					fontSize: 0.875,
					weight: 400,
					lineHeight: 1.5,
				},
				"preview-p-bold": {
					fontSize: 0.875,
					weight: 700,
					lineHeight: 1.5,
				},
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
