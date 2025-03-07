import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {CartItem} from '@/context/AddToCartContext';

interface CartSummaryProps {
    cartItems: CartItem[];
    selectedShipping: number;
    handleSelectShipping: (optionId: number) => void;
    total: number;
    handleCheckout: () => void;
    loading: boolean;
}

const shippingOptions = [
    {id: 1, label: "Free Shipping", price: "$0.00"},
    {id: 2, label: "Express Shipping", price: "+ $15.00"},
    {id: 3, label: "Pickup", price: "- $21.00"},
];

const CartSummary: React.FC<CartSummaryProps> = ({
                                                     cartItems,
                                                     selectedShipping,
                                                     handleSelectShipping,
                                                     total,
                                                     handleCheckout,
                                                     loading
                                                 }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const calculateSubtotal = React.useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }, [cartItems]);

    return (
        <Paper
            elevation={3}
            sx={{
                width: isMobile ? '100%' : 400,
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
                {shippingOptions.map((option, index) => (
                    <React.Fragment key={option.id}>
                        <ListItemButton
                            onClick={() => handleSelectShipping(option.id)}
                            disabled={loading}
                        >
                            <Checkbox
                                checked={selectedShipping === option.id}
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                                sx={{color: 'var(--foreground)'}}
                            />
                            <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                <ListItemText primary={option.label} sx={{color: 'var(--foreground)'}}/>
                                <ListItemText
                                    primary={option.price}
                                    sx={{textAlign: "right", color: 'var(--foreground)'}}
                                />
                            </Box>
                        </ListItemButton>
                        {index < shippingOptions.length - 1 && <Divider/>}
                    </React.Fragment>
                ))}
            </Box>

            {/* Summary */}
            <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                <Typography variant="subtitle1" sx={{color: 'var(--foreground)'}}>Subtotal</Typography>
                <Typography variant="subtitle1" sx={{color: 'var(--foreground)'}}>
                    ${calculateSubtotal.toFixed(2)}
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
                sx={{
                    mt: 3,
                    backgroundColor: 'var(--primary)',
                    '&:hover': {backgroundColor: 'var(--focus)'},
                    '&:disabled': {backgroundColor: 'var(--disabled)'},
                }}
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit"/>
                ) : (
                    'Checkout'
                )}
            </Button>
        </Paper>
    );
};

export default React.memo(CartSummary);