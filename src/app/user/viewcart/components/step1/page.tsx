'use client';

import React from 'react';
import Step1 from './components/Step1';
import { CartItem } from '../types';

interface Step1PageProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    selectedShipping: number;
    setSelectedShipping: React.Dispatch<React.SetStateAction<number>>;
    handleCheckout: () => void;
}

const Step1Page: React.FC<Step1PageProps> = ({
                                                 cartItems,
                                                 setCartItems,
                                                 selectedShipping,
                                                 setSelectedShipping,
                                                 handleCheckout
                                             }) => {
    return (
        <Step1
            cartItems={cartItems}
            setCartItems={setCartItems}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
            handleCheckout={handleCheckout}
        />
    );
};

export default function Page() {
    // You might need to fetch these props or use context here
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [selectedShipping, setSelectedShipping] = React.useState(0);
    const handleCheckout = () => {
        // Implement checkout logic
    };

    return (
        <Step1Page
            cartItems={cartItems}
            setCartItems={setCartItems}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
            handleCheckout={handleCheckout}
        />
    );
}