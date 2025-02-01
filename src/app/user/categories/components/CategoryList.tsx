// user/categories/components/CategoryList.tsx

import React from 'react';
import Link from 'next/link';
import {Box, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import {useCategories} from "@/context/CategoriesContext";
import Image from 'next/image';

const CategoryList = () => {
    const {categories, loading} = useCategories();

    return (
        <Box component="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Typography variant="h2" component="h1" className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Explore Our Categories
            </Typography>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-200 rounded-lg h-64"></div>
                        </div>
                    ))}
                </div>
            ) : categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link href={`/user/categories?name=${encodeURIComponent(category.name)}`} key={category._id}>
                            <motion.div
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                            >
                                <Box className="aspect-w-16 aspect-h-9 relative h-64">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <Box
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></Box>
                                    <Box className="absolute inset-0 flex items-end p-6">
                                        <Box className="w-full">
                                            <Typography variant="h6" className="text-white mb-2">
                                                {category.name}
                                            </Typography>
                                            <Typography variant="body2"
                                                        className="text-gray-200 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                Explore our {category.name.toLowerCase()} collection
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></Box>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            ) : (
                <Typography variant="body1" align="center" color="textSecondary">
                    No categories found.
                </Typography>
            )}
        </Box>
    );
};

export default CategoryList;
