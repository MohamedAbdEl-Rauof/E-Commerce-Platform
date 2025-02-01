import React from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import AddToCartButton from './AddToCartButton';
import BackToCategoryButton from './BackToCategoryButton';

const ProductDetails = ({product}) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {product.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Price: ${product.price}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Original Price: ${product.PriceBeforeDiscount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Added on: {new Date(product.createdAt).toLocaleDateString()}
                </Typography>
                <Box mt={2}>
                    <AddToCartButton product={product}/>
                    <BackToCategoryButton categoryName={product.categoryName}/>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductDetails;