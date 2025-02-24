import React from 'react';
import {Box, Button, Checkbox, Divider, ListItemButton, ListItemText, Paper, Typography,} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {Type} from '../../types/type';

interface CartSummaryProps {
    cartItems: Type[];
    selectedShipping: number;
    handleSelectShipping: (optionId: number) => void;
    total: number;
    handleCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
                                                     cartItems,
                                                     selectedShipping,
                                                     handleSelectShipping,
                                                     total,
                                                     handleCheckout,
                                                 }) => {
    const calculateSubtotal = (cartItems: Type[]) => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width: 400,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'var(--background)',
            }}
        >
            <Typography
                variant="h6"
                sx={{fontWeight: "bold", mb: 2, textAlign: "center", color: 'var(--foreground)'}}
            >
                Cart Summary
            </Typography>

            {/* Shipping Options */}
            <Box>
                {[
                    {id: 1, label: "Free Shipping", price: "$0.00"},
                    {id: 2, label: "Express Shipping", price: "+ $15.00"},
                    {id: 3, label: "Pickup", price: "- %21.00"},
                ].map((option, index) => (
                    <React.Fragment key={option.id}>
                        <ListItemButton onClick={() => handleSelectShipping(option.id)}>
                            <Checkbox
                                checked={selectedShipping === option.id}
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                                sx={{color: 'var(--foreground)'}}
                            />
                            <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                <ListItemText primary={option.label} sx={{color: 'var(--foreground)'}}/>
                                <ListItemText primary={option.price}
                                              sx={{textAlign: "right", color: 'var(--foreground)'}}/>
                            </Box>
                        </ListItemButton>
                        {index < 2 && <Divider/>}
                    </React.Fragment>
                ))}
            </Box>

            {/* Summary */}
            <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                <Typography variant="subtitle1" sx={{color: 'var(--foreground)'}}>Subtotal</Typography>
                <Typography variant="subtitle1" sx={{color: 'var(--foreground)'}}>
                    ${calculateSubtotal(cartItems).toFixed(2)}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    mt: 1,
                }}
            >
                <Typography variant="h6" sx={{color: 'var(--foreground)'}}>Total</Typography>
                <Typography variant="h6" sx={{color: 'var(--foreground)'}}>${total.toFixed(2)}</Typography>
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{mt: 3, backgroundColor: 'var(--primary)', '&:hover': {backgroundColor: 'var(--focus)'}}}
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </Paper>
    );
};

export default CartSummary;