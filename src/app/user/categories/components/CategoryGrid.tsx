import React from 'react';
import {Box, Container, Grid, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
    _id: string;
    name: string;
    image: string;
}

interface CategoryGridProps {
    loading: boolean;
    categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({categories, loading}) => {
    if (loading) {
        return (
            <Grid container spacing={4}>
                {[...Array(4)].map((_, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box className="animate-pulse rounded-lg h-64" style={{background: 'var(--background)'}}></Box>
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (categories.length === 0) {
        return <Typography className="text-center" style={{color: 'var(--foreground)'}}>No categories
            found.</Typography>;
    }

    return (
        <Container maxWidth={false} sx={{maxWidth: '1400px'}}>
            <Grid container spacing={4}>
                {categories.map((category) => (
                    <Grid item key={category._id} xs={12} sm={6} md={4} lg={3}>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3}}
                            className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                            style={{background: 'var(--background)'}}
                        >
                            <Link href={`/user/categories/${(category.name)}`} passHref>
                                <Box className="aspect-w-16 aspect-h-9 relative h-64">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <Box className="absolute inset-0 flex items-end p-6">
                                        <Box className="w-full">
                                            <Typography
                                                variant="h5"
                                                className="mb-2 transform transition-all duration-300 group-hover:translate-y-0"
                                                style={{color: 'var(--text-on-image)'}}
                                            >
                                                {category.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                                                style={{color: 'var(--text-on-image)'}}
                                            >
                                                Explore our {category.name.toLowerCase()} collection
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Link>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryGrid;