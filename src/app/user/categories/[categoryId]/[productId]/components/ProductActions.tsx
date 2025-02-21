import React from 'react';
import { Button, Box } from '@mui/material';
// import { useCart } from '@/context/CartContext';

const ProductActions = ({ productId }: { productId: string }) => {
    // const { addToCart } = useCart();

    return (
        <Box mt={2}>
            <Button
                variant="contained"
                color="primary"
                // onClick={() => addToCart(productId)}
                fullWidth
            >
                Add to Cart
            </Button>
        </Box>
    );
};

export default ProductActions;