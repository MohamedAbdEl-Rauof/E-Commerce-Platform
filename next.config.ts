import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['images.pexels.com'],
    },
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    swcMinify: true,
    // Add custom headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/user/categories/:categoryName/:productName',
                destination: '/user/categories/[categoryName]/[productName]',
            },
        ];
    },
};

export default nextConfig;