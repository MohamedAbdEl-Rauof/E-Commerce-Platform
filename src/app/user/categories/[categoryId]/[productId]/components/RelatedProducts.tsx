import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {useProduct} from '@/context/ProductContext';
import ProductCard from '../../components/ProductCard'

const RelatedProducts = ({categoryId, currentProductId}: { categoryId: string; currentProductId: string }) => {
    const {products} = useProduct();
    const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

    const relatedProducts = products
        .filter(p => p.categoryId === categoryId && p._id !== currentProductId)
        .slice(0, 4);

    const handleFavoriteToggle = (productId: string) => {
        setFavorites(prevFavorites => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    return (
        <Box mt={6}>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    color: 'var(--foreground)',
                    fontWeight: 'bold',
                    marginBottom: '3rem'
                }}
            >
                Related Products
            </Typography>
            <Grid container spacing={3}>
                {relatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product._id}>
                        <ProductCard
                            product={product}
                            categoryId={categoryId}
                            isList={false}
                            isFavorite={favorites.has(product._id)}
                            onFavorite={handleFavoriteToggle}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default RelatedProducts;