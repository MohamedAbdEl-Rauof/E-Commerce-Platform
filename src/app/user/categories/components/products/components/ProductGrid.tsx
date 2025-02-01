import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, Info } from '@mui/icons-material';
import { Product, ViewOption } from './types';

interface ProductGridProps {
    products: Product[];
    view: ViewOption;
    favorite: Record<string, boolean>;
    onAddToCart: (productId: string, quantity: number, isFavourite: boolean) => void;
    onFavoriteAndCart: (productId: string) => void;
    onShowDetails: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    view,
    favorite,
    onAddToCart,
    onFavoriteAndCart,
    onShowDetails
}) => {
    const getGridClasses = () => {
        switch (view) {
            case 'large':
                return {xs: 12, sm: 6};
            case 'split':
                return {xs: 12, sm: 6};
            case 'list':
                return {xs: 12};
            default:
                return {xs: 12, sm: 6, md: 4};
        }
    };

    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item key={product._id} {...getGridClasses()}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.image}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${product.price.toFixed(2)}
                            </Typography>
                            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
                                <Button
                                    variant="contained"
                                    onClick={() => onAddToCart(product._id, 1, false)}
                                >
                                    Add to Cart
                                </Button>
                                <IconButton onClick={() => onFavoriteAndCart(product._id)}>
                                    {favorite[product._id] ? <Favorite color="error"/> : <FavoriteBorder/>}
                                </IconButton>
                                <IconButton onClick={() => onShowDetails(product._id)}>
                                    <Info/>
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;