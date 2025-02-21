import React, {useState} from 'react';
import {Grid, Box, Button} from '@mui/material';
import ProductCard from './ProductCard';

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    categoryId: string;
    PriceBeforeDiscount?: string;
    rating?: number;
    isNew?: boolean;
    discount?: number;
}

interface ProductGridProps {
    products: Product[];
    view: string;
    favorites: Set<string>;
    toggleFavorite: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({products, view, favorites, toggleFavorite}) => {
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

    return (
        <Box>
            <Grid container spacing={gridProps.spacing}>
                {products.slice(0, visibleProducts).map((product) => (
                    <Grid item key={product._id} xs={gridProps.xs} md={gridProps.md} lg={gridProps.lg}>
                        <ProductCard
                            product={product}
                            isList={view === "list"}
                            onFavorite={toggleFavorite}
                            isFavorite={favorites.has(product._id)}
                        />
                    </Grid>
                ))}
            </Grid>
            {visibleProducts < products.length && (
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
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