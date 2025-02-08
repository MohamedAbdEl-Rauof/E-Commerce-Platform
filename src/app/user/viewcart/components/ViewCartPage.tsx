"use client";

import React, {useState} from 'react';
import {Box, Button, Step, StepLabel, Stepper, Typography} from '@mui/material';
import Step1 from './step1/page';
import Step2 from './step2/page';
import Step3 from './step3/page';
import {CartItem} from './types';

const steps = ["Shopping Cart", "Checkout Details", "Order Complete"];

// Static cart items that match the expected type
const staticCartItems: CartItem[] = [
    {
        id: "1",
        name: "Product 1",
        price: 19.99,
        quantity: 2,
        image: "/images/product1.jpg",
        isFavourite: false
    },
    {
        id: "2",
        name: "Product 2",
        price: 29.99,
        quantity: 1,
        image: "/images/product2.jpg",
        isFavourite: true
    },
];

const ViewCartPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [cartItems, setCartItems] = useState<CartItem[]>(staticCartItems);
    const [selectedShipping, setSelectedShipping] = useState<number>(1);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCheckout = () => {
        // Implement your checkout logic here
        console.log('Checkout initiated');
        handleNext();
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Step1
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        selectedShipping={selectedShipping}
                        setSelectedShipping={setSelectedShipping}
                        handleCheckout={handleNext}
                    />
                );
            case 1:
                return (
                    <Step2
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        selectedShipping={selectedShipping}
                        handleCheckout={handleNext}
                    />
                );
            case 2:
                return <Step3 cartItems={cartItems}/>;
            default:
                return <Typography>Unknown step</Typography>;
        }
    };

    return (
        <Box sx={{width: '100%', padding: 3}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{mt: 4, mb: 2}}>
                {renderStepContent(activeStep)}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{mr: 1}}
                >
                    Back
                </Button>
                <Box sx={{flex: '1 1 auto'}}/>
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleCheckout}>Place Order</Button>
                ) : (
                    <Button onClick={handleNext}>Next</Button>
                )}
            </Box>
        </Box>
    );
};

export default ViewCartPage;