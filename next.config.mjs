/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/1",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
