"use client";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

// Define the CartItem type to match what Step1 expects
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    isFavourite: boolean;
};

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

export default function ViewCart() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [index: number]: boolean }>({});
    const [selectedShipping, setSelectedShipping] = useState<number>(1);

    // Use useState with the static cart items as initial state
    const [cartItems, setCartItems] = useState<CartItem[]>(staticCartItems);

    const handleBack = () => {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleCheckout = () => {
        setCompleted((prevCompleted) => ({
            ...prevCompleted,
            [activeStep]: true,
        }));
        setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const renderStepContent = () => {
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
    };

    return (
        <div>
            <div className="w-[85%] mx-auto mt-24">
                <Box sx={{width: "100%"}}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={!!completed[index]}>
                                <StepButton onClick={() => setActiveStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div className="step-content">{renderStepContent()}</div>
                    <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: "1 1 auto"}}/>
                    </Box>
                </Box>
            </div>
        </div>
    );
}