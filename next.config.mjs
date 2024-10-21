/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.pokemontcg.io',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
