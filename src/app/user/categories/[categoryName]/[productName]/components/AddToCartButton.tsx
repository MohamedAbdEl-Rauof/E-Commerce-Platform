import React from 'react';
import {Button} from '@mui/material';

const AddToCartButton = ({product}) => {
    const handleAddToCart = () => {
        // Implement add to cart functionality
        console.log(`Added ${product.name} to cart`);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
        </Button>
    );
};

export default AddToCartButton;