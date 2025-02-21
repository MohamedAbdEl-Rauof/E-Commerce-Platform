import React from 'react';
import {
    Box,
    Typography,
    Button,
    ListItemButton,
    Checkbox,
    ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Type } from '../../types/type';

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
                sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
            >
                Cart Summary
            </Typography>

            {/* Shipping Options */}
            <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
                <ListItemButton onClick={() => handleSelectShipping(1)}>
                    <Checkbox
                        checked={selectedShipping === 1}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <ListItemText primary="Free Shipping" />
                        <ListItemText primary="$0.00" sx={{ textAlign: "right" }} />
                    </Box>
                </ListItemButton>
            </Box>

            <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
                <ListItemButton onClick={() => handleSelectShipping(2)}>
                    <Checkbox
                        checked={selectedShipping === 2}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <ListItemText primary="Express Shipping" />
                        <ListItemText primary="+ $15.00" sx={{ textAlign: "right" }} />
                    </Box>
                </ListItemButton>
            </Box>

            <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
                <ListItemButton onClick={() => handleSelectShipping(3)}>
                    <Checkbox
                        checked={selectedShipping === 3}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <ListItemText primary="Pickup" />
                        <ListItemText primary="- %21.00" sx={{ textAlign: "right" }} />
                    </Box>
                </ListItemButton>
            </Box>

            {/* Summary */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="subtitle1">Subtotal</Typography>
                <Typography variant="subtitle1">
                    {calculateSubtotal(cartItems).toFixed(2)}
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
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </Box>
    );
};

export default CartSummary;