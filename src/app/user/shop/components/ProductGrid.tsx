import React, {useState} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ProductCard from './ProductCard';
import {Product} from "@/context/ProductContext";

interface ProductGridProps {
    products: Product[];
    view: string;
    favorites: Set<string>;
    toggleFavorite: (productId: string) => void;
    categoryId: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({products, view, toggleFavorite, categoryId, favorites}) => {
    const [visibleProducts, setVisibleProducts] = useState(9);

    const getGridProps = () => {
        switch (view) {
            case "large":
                return {xs: 12, lg: 6, spacing: 4};
            case "split":
                return {xs: 6, md: 4, lg: 3, spacing: 3};
            default:
                return {xs: 6, lg: 4, spacing: 3};
        }
    };

    const gridProps = getGridProps();

    const handleShowMore = () => {
        setVisibleProducts(prevVisible => prevVisible + 9);
    };

    if (products.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    py: 10,
                    color: 'var(--muted)',
                }}
            >
                <SearchOffIcon sx={{fontSize: 64, mb: 2, color: 'var(--muted)'}}/>
                <Typography variant="h6" sx={{color: 'var(--foreground)', fontWeight: 600, mb: 1}}>
                    No products found
                </Typography>
                <Typography variant="body2" sx={{color: 'var(--muted)', maxWidth: 360}}>
                    Try adjusting your search or filters to find what you&apos;re looking for.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Grid container spacing={gridProps.spacing} sx={{mb: 7  }}>
                {products.slice(0, visibleProducts).map((product) => (
                    <Grid item key={product._id} xs={gridProps.xs} md={gridProps.md} lg={gridProps.lg}>
                        <ProductCard
                            product={product}
                            isList={view === "list"}
                            onFavorite={toggleFavorite}
                            categoryId={categoryId}
                            isFavorite={favorites.has(product._id)}
                        />
                    </Grid>
                ))}
            </Grid>
            {visibleProducts < products.length && (
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 4 , mb:5}}>
                    <Button
                        variant="contained"
                        onClick={handleShowMore}
                        sx={{
                            bgcolor: 'var(--foreground)',
                            color: 'var(--background)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                bgcolor: 'var(--muted)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px var(--shadow)',
                            },
                        }}
                    >
                        Show More
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ProductGrid;