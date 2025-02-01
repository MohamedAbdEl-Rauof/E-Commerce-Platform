// user/ categories /
import React from 'react';
import {Box, Breadcrumbs, Typography} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'framer-motion';

const CategoryBanner = () => {
    return (
        <Box className="w-[90%] mx-auto mt-14 relative h-[400px] rounded-xl overflow-hidden">
            <Image
                src="/images/main image.jpg"
                alt="Shop Banner"
                layout="fill"
                objectFit="cover"
                priority
                className="transform hover:scale-105 transition-transform duration-700"
            />
            <Box
                className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col items-center justify-center">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                >
                    <Breadcrumbs aria-label="breadcrumb" className="mb-4">
                        <Link href="/" color="inherit">
                            Home
                        </Link>
                        <Typography color="text.primary">Categories</Typography>
                    </Breadcrumbs>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                >
                    <Typography variant="h2" component="h1" align="center" gutterBottom className="text-white mb-4">
                        Categories Page
                    </Typography>
                </motion.div>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                    <Typography variant="subtitle1" align="center" className="text-gray-200 max-w-2xl px-4">
                        Don&apos;t Waste Time, Shop Now
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
};

export default CategoryBanner;