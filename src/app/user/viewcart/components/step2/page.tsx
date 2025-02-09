"use client"
import { CartItem } from "@/app/user/viewcart/components/types";
import React from "react";
import Step2 from './components/Step2';

interface StepProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    selectedShipping: number;
    handleCheckout: () => void;
}

const Page: React.FC<StepProps> = ({
                                       cartItems,
                                       setCartItems,
                                       selectedShipping,
                                       handleCheckout
                                   }) => {
    return (
        <Step2
            cartItems={cartItems}
            setCartItems={setCartItems}
            selectedShipping={selectedShipping}
            handleCheckout={handleCheckout}
        />
    );
}

export default Page;