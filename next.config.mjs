/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.pokemontcg.io',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.pokemontcg.io',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
