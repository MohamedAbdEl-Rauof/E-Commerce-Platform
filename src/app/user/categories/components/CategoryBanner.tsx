import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from "next-themes";

interface CategoryBannerProps {
    loading: boolean;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ loading }) => {
    const { theme } = useTheme();

    if (loading) {
        return <Skeleton variant="rectangular" height={400} />;
    }

    const isDarkTheme = theme === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-14 relative h-[400px] rounded-xl overflow-hidden"
            style={{ background: 'var(--background)' }}
        >
            <Image
                src="/images/main image.jpg"
                alt="Shop Banner"
                layout="fill"
                objectFit="cover"
                priority
                className="transform hover:scale-105 transition-transform duration-700"
            />
            <Box
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                    color: 'var(--foreground)'
                }}
            >
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 mb-4"
                >
                    <Link href="/" passHref>
                        <Typography component="a" className="hover:opacity-80 transition"
                                    style={{
                                        color: isDarkTheme
                                            ? 'var(--foreground)'
                                            : 'var(--foreground)',
                                    }}>
                            Home
                        </Typography>
                    </Link>
                    <span style={{ color: 'var(--foreground)' }}>/</span>
                    <Typography style={{ color: 'var(--foreground)' }}>Categories</Typography>
                </motion.nav>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Typography variant="h2" component="h1" align="center" gutterBottom style={{ color: 'var(--foreground)' }}>
                        Categories Page
                    </Typography>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Typography variant="body1" align="center" className="max-w-2xl px-4" style={{ color: 'var(--foreground)' }}>
                        Don&apos;t Waste Time, Shop Now
                    </Typography>
                </motion.div>
            </Box>
        </motion.div>
    );
};

export default CategoryBanner;