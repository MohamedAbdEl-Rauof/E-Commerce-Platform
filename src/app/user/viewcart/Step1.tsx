import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box} from '@mui/material';
import CartTable from './components/step1/CartTable';
import CartSummary from './components/step1/CartSummary';
import {CartItem} from './types/type';

interface StepProps {
    cartItems: CartItem[];
    handleCheckout: () => void;
    selectedShipping: number;
    setSelectedShipping: Dispatch<SetStateAction<number>>;
    deleteItem: (productId: string) => Promise<void>;
    decrementFromCart: (userId: string, productId: string) => Promise<void>;
    addToCart: (userId: string, productId: string) => Promise<void>;
    loading: boolean;
}

const Step1: React.FC<StepProps> = ({
                                        cartItems,
                                        handleCheckout,
                                        selectedShipping,
                                        setSelectedShipping,
                                        deleteItem,
                                        decrementFromCart,
                                        addToCart,
                                        loading
                                    }) => {
    const [total, setTotal] = useState<number>(0);

    // Calculate Subtotal
    const calculateSubtotal = (items: CartItem[]) => {
        return items.reduce((acc, item) => acc + item.quantity * (item.price || 0), 0);
    };

    // Update total on cartItems or selectedShipping change
    useEffect(() => {
        const subtotal = calculateSubtotal(cartItems);
        let shippingCost = 0;

        if (selectedShipping === 2) {
            shippingCost = 15.0; // Express Shipping
        } else if (selectedShipping === 3) {
            shippingCost = -(subtotal * 0.21); // Pickup discount
        }

        setTotal(subtotal + shippingCost);
    }, [cartItems, selectedShipping]);

    const handleSelectShipping = (optionId: number) => {
        setSelectedShipping(optionId);
    };

    return (
        <Box className="flex flex-col md:flex-row gap-8">
            <Box sx={{flex: 1}}>
                <CartTable
                    cartItems={cartItems}
                    addToCart={addToCart}
                    decrementFromCart={decrementFromCart}
                    deleteItem={deleteItem}
                    loading={loading}
                />
            </Box>
            <Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: {xs: 'center', sm: 'center'},
                    width: {xs: '100%', md: 'auto'},
                    mt: {xs: 4, md: 0}
                }}>
                    <CartSummary
                        cartItems={cartItems}
                        selectedShipping={selectedShipping}
                        handleSelectShipping={handleSelectShipping}
                        total={total}
                        handleCheckout={handleCheckout}
                        loading={loading}
                    />
                </Box>
            </Box>

        </Box>
    );
};

export default Step1;