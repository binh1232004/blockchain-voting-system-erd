/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'open.umn.edu',
            },
        ],
  },
};

export default nextConfig;
