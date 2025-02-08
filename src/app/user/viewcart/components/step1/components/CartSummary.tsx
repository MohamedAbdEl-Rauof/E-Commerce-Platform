import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import ShippingOption from './ShippingOption';

interface CartSummaryProps {
    selectedShipping: number;
    handleSelectShipping: (id: number) => void;
    subtotal: number;
    total: number;
    handleCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
                                                     selectedShipping,
                                                     handleSelectShipping,
                                                     subtotal,
                                                     total,
                                                     handleCheckout,
                                                 }) => {
    return (
        <Box
            sx={{
                width: 400,
                padding: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            <Typography
                variant="h6"
                sx={{fontWeight: "bold", mb: 2, textAlign: "center"}}
            >
                Cart Summary
            </Typography>

            <ShippingOption
                id={1}
                label="Free Shipping"
                price="$0.00"
                selectedShipping={selectedShipping}
                handleSelectShipping={handleSelectShipping}
            />
            <ShippingOption
                id={2}
                label="Express Shipping"
                price="+ $15.00"
                selectedShipping={selectedShipping}
                handleSelectShipping={handleSelectShipping}
            />
            <ShippingOption
                id={3}
                label="Pickup"
                price="- %21.00"
                selectedShipping={selectedShipping}
                handleSelectShipping={handleSelectShipping}
            />

            <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                <Typography variant="subtitle1">Subtotal</Typography>
                <Typography variant="subtitle1">${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    mt: 1,
                }}
            >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{mt: 3}}
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </Box>
    );
};

export default CartSummary;