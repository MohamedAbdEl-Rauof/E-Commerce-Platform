"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Step, StepButton, Stepper, Typography, useMediaQuery } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useCart } from "@/context/AddToCartContext";
import { useProduct } from "@/context/ProductContext";
import { CartItem } from './types/type';

const STEPS = ["Shopping Cart", "Checkout Details", "Order Complete"] as const;

const ViewCart = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<Record<number, boolean>>({});
    const [selectedShipping, setSelectedShipping] = useState<number>(1);

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const {
        cart,
        addToCart,
        decrementFromCart,
        deleteItem,
        toggleFavorite,
        checkUserSignin,
    } = useCart();
    const { products, loading } = useProduct();

    const handleBack = useCallback(() => {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    }, []);

    const handleCheckout = useCallback(() => {
        setCompleted((prevCompleted) => ({
            ...prevCompleted,
            [activeStep]: true,
        }));
        setActiveStep((prevStep) => Math.min(prevStep + 1, STEPS.length - 1));
    }, [activeStep]);

    const cartItems: CartItem[] = useMemo(() => {
        return cart
            .filter((item) => item.quantity >= 0 || item.isFavourite)
            .map((item) => {
                const product = products.find((p) => p._id === item.productId);
                if (!product) return null;
                return {
                    id: product._id,
                    productId: product._id,
                    quantity: item.quantity,
                    isFavourite: item.isFavourite,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    rating: product.rating || 0,
                };
            })
            .filter((item): item is CartItem => item !== null);
    }, [cart, products]);


    const renderStepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    <Step1
                        cartItems={cartItems}
                        handleCheckout={handleCheckout}
                        selectedShipping={selectedShipping}
                        setSelectedShipping={setSelectedShipping}
                        deleteItem={deleteItem}
                        decrementFromCart={decrementFromCart}
                        addToCart={addToCart}
                        loading={loading}
                    />
                );
            case 1:
                return (
                    <Step2
                        cartItems={cartItems}
                        handleCheckout={handleCheckout}
                        selectedShipping={selectedShipping}
                        setSelectedShipping={setSelectedShipping}
                        deleteItem={deleteItem}
                        decrementFromCart={decrementFromCart}
                        addToCart={addToCart}
                    />
                );
            case 2:
                return (
                    <Step3 cartItems={cartItems} />
                );
            default:
                return null;
        }
    }, [activeStep, cartItems, handleCheckout, selectedShipping, deleteItem, toggleFavorite, decrementFromCart, addToCart, checkUserSignin]);

    return (
        <Box sx={{ width: '85%', maxWidth: '1500px', mx: 'auto', mt: 12 }}>
            <Box sx={{ width: '100%' }}>
                <Stepper
                    nonLinear
                    activeStep={activeStep}
                    orientation={isSmallScreen ? "vertical" : "horizontal"}
                    sx={{
                        mb: 5,
                        '& .MuiStepLabel-root .Mui-completed': {
                            color: 'var(--primary)',
                        },
                        '& .MuiStepLabel-root .Mui-active': {
                            color: 'var(--primary)',
                        },
                    }}
                >
                    {STEPS.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton
                                onClick={() => setActiveStep(index)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'var(--hover)',
                                    },
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'var(--foreground)',
                                        fontWeight: activeStep === index ? 'bold' : 'normal',
                                    }}
                                >
                                    {label}
                                </Typography>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {renderStepContent}
            <Box sx={{
                margin: "40px 0px 60px 0px",
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button
                    variant={activeStep === 0 ? "outlined" : "contained"}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{
                        color: activeStep === 0 ? 'var(--muted-foreground)' : 'var(--background)',
                        backgroundColor: activeStep === 0 ? 'transparent' : 'var(--foreground)',
                        borderColor: 'var(--primary)',
                        '&:hover': {
                            backgroundColor: activeStep === 0 ? 'var(--hover)' : 'var(--muted)',
                            borderColor: 'var(--primary-dark)',
                        },
                        '&.Mui-disabled': {
                            color: 'var(--muted-foreground)',
                            borderColor: 'var(--muted-foreground)',
                        },
                    }}
                >
                    Back
                </Button>
            </Box>
        </Box>
    );
}

export default ViewCart;