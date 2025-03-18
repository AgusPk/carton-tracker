/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pokemontcg.io',
            },
        ],
        domains: ['ui-avatars.com'],
    },
};

module.exports = nextConfig;
