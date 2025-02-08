/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com'],
    },
    // Add this configuration
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;