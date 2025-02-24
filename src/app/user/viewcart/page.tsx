"use client";
import React, {useCallback, useMemo, useState} from "react";
import {Box, Button, Step, StepButton, Stepper, Typography} from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {CartItem} from "./types/type";

const STEPS = ["Shopping Cart", "Checkout Details", "Order Complete"] as const;

const staticCartData = {
    cartItems: [
        {
            id: '1',
            productId: 'prod1',
            name: 'Product 1',
            price: 19.99,
            quantity: 2,
            image: '/images/product1.jpg',
            isFavourite: false,
        },
        {
            id: '2',
            productId: 'prod2',
            name: 'Product 2',
            price: 29.99,
            quantity: 1,
            image: '/images/product2.jpg',
            isFavourite: true,
        },
    ],
    setCartItems: (items: CartItem[]) => {
        console.log('Setting cart items:', items);
        // In a real scenario, this would update the state
    },
};

export default function ViewCart() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<Record<number, boolean>>({});
    const {cartItems, setCartItems} = staticCartData;
    const [selectedShipping, setSelectedShipping] = useState<number>(1);

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

    const renderStepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    <Step1
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        handleCheckout={handleCheckout}
                        selectedShipping={selectedShipping}
                        setSelectedShipping={setSelectedShipping}
                    />
                );
            case 1:
                return (
                    <Step2
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        handleCheckout={handleCheckout}
                        selectedShipping={selectedShipping}
                    />
                );
            case 2:
                return <Step3 cartItems={cartItems} setCartItems={setCartItems}/>;
            default:
                return null;
        }
    }, [activeStep, cartItems, handleCheckout, selectedShipping, setCartItems]);

    return (
        <Box sx={{width: '85%', maxWidth: '1500px', mx: 'auto', mt: 12}}>
            <Box sx={{width: '100%'}}>
                <Stepper
                    nonLinear
                    activeStep={activeStep}
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
                <Box sx={{mb: 4}}>{renderStepContent}</Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', pt: 2}}>
                    <Button
                        variant={activeStep === 0 ? "outlined" : "contained"}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                            mr: 1,
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
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    onClick={handleCheckout}*/}
                    {/*    disabled={activeStep === STEPS.length - 1}*/}
                    {/*    sx={{*/}
                    {/*        color: 'var(--background)',*/}
                    {/*        backgroundColor: 'var(--primary)',*/}
                    {/*        '&:hover': {*/}
                    {/*            backgroundColor: 'var(--primary-dark)',*/}
                    {/*        },*/}
                    {/*        '&.Mui-disabled': {*/}
                    {/*            color: 'var(--muted-foreground)',*/}
                    {/*            backgroundColor: 'var(--accent)',*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}*/}
                    {/*</Button>*/}
                </Box>
            </Box>
        </Box>
    );
}